const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  console.log('📊 Creando 5 submissions de prueba...\n');

  // Primero, obtener usuarios y challenges existentes
  const users = await prisma.user.findMany({
    where: { role: 'skater' },
    take: 5,
    select: { username: true, name: true }
  });

  const challenges = await prisma.challenge.findMany({
    take: 5,
    orderBy: { level: 'asc' },
    select: { id: true, name: true, level: true }
  });

  if (users.length === 0) {
    console.error('❌ No se encontraron usuarios tipo "skater"');
    return;
  }

  if (challenges.length === 0) {
    console.error('❌ No se encontraron challenges. Ejecuta el seed primero.');
    return;
  }

  console.log(`✅ Encontrados ${users.length} usuarios y ${challenges.length} challenges\n`);

  // URLs de videos de ejemplo de YouTube (skateboarding tricks)
  const videoUrls = [
    'https://www.youtube.com/watch?v=339ZL9Z7uGk', // Ollie tutorial
    'https://www.youtube.com/watch?v=GkXXQT1Z5U8', // Kickflip
    'https://www.youtube.com/watch?v=G-R50KqYy1I', // Pop Shove-it
    'https://www.youtube.com/watch?v=DJGbSwWTp1Y', // Heelflip
    'https://www.youtube.com/watch?v=8B8K_VGCrzk'  // Varial Kickflip
  ];

  const submissions = [];

  for (let i = 0; i < Math.min(5, users.length, challenges.length); i++) {
    const user = users[i];
    const challenge = challenges[i];
    const videoUrl = videoUrls[i];

    try {
      const submission = await prisma.submission.create({
        data: {
          userId: user.username,
          challengeId: challenge.id,
          videoUrl: videoUrl,
          status: 'pending',
          submittedAt: new Date(Date.now() - Math.random() * 7 * 24 * 60 * 60 * 1000) // Últimos 7 días
        },
        include: {
          user: { select: { name: true, username: true } },
          challenge: { select: { name: true, level: true } }
        }
      });

      submissions.push(submission);
      console.log(`✅ Submission #${i + 1} creada:`);
      console.log(`   👤 Usuario: ${submission.user.name} (@${submission.user.username})`);
      console.log(`   🎯 Challenge: ${submission.challenge.name} (Nivel ${submission.challenge.level})`);
      console.log(`   📹 Video: ${submission.videoUrl}`);
      console.log(`   📅 Enviado: ${submission.submittedAt.toLocaleDateString()}\n`);
    } catch (error) {
      console.error(`❌ Error creando submission para ${user.username}:`, error.message);
    }
  }

  console.log(`\n🎉 Total de submissions creadas: ${submissions.length}`);
  console.log('\n💡 Tip: Accede al dashboard de jueces para evaluar estas submissions');
}

main()
  .catch((e) => {
    console.error('❌ Error:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
