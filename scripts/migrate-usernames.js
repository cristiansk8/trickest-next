const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

/**
 * Script de migración para asignar usernames a usuarios existentes
 * que no tengan username asignado
 */
async function main() {
  console.log('🔄 Iniciando migración de usernames...\n');

  // Buscar usuarios sin username
  const usersWithoutUsername = await prisma.user.findMany({
    where: {
      OR: [
        { username: null },
        { username: '' }
      ]
    },
    select: {
      id: true,
      email: true,
      name: true,
      username: true
    }
  });

  if (usersWithoutUsername.length === 0) {
    console.log('✅ Todos los usuarios ya tienen username asignado!');
    return;
  }

  console.log(`📊 Encontrados ${usersWithoutUsername.length} usuarios sin username:\n`);

  // Función para generar username único (copiada de src/lib/generate-username.ts)
  async function generateUniqueUsername(name, email) {
    let baseUsername = name
      ? name
          .toLowerCase()
          .replace(/\s+/g, '_')
          .replace(/[^a-z0-9_]/g, '')
          .substring(0, 20)
      : email.split('@')[0].toLowerCase().replace(/[^a-z0-9_]/g, '');

    if (!baseUsername) {
      baseUsername = 'user';
    }

    let username = baseUsername;
    let counter = 1;

    while (true) {
      const existing = await prisma.user.findUnique({
        where: { username },
      });

      if (!existing) {
        return username;
      }

      username = `${baseUsername}${counter}`;
      counter++;

      if (counter > 1000) {
        return `${baseUsername}_${Date.now()}`;
      }
    }
  }

  let updated = 0;
  let failed = 0;

  for (const user of usersWithoutUsername) {
    try {
      // Generar username único
      const username = await generateUniqueUsername(user.name, user.email);

      // Actualizar usuario
      await prisma.user.update({
        where: { id: user.id },
        data: { username }
      });

      console.log(`✅ ${user.email} → @${username}`);
      updated++;
    } catch (error) {
      console.error(`❌ Error con ${user.email}:`, error.message);
      failed++;
    }
  }

  console.log(`\n📈 Resumen de migración:`);
  console.log(`   ✅ Actualizados: ${updated}`);
  console.log(`   ❌ Fallidos: ${failed}`);
  console.log(`   📊 Total procesados: ${usersWithoutUsername.length}`);

  if (updated > 0) {
    console.log('\n💡 Los usuarios actualizados ahora pueden:');
    console.log('   - Ver challenges en el dashboard');
    console.log('   - Enviar submissions');
    console.log('   - Ver su historial de submissions');
  }
}

main()
  .catch((e) => {
    console.error('❌ Error en migración:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
