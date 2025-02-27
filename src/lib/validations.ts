// lib/validations.ts

import prisma from "./prisma";


// Validar si un nickname existe (en User.nickname o User.oldNicknames)
export async function isNicknameTaken(nickname: string): Promise<boolean> {
  const userWithNickname = await prisma.user.findFirst({
    where: {
      OR: [
        { nickname },
        { oldNicknames: { has: nickname } },
      ],
    },
  });

  return !!userWithNickname;
}

// Generar nickname único desde el email
export async function generateUniqueNickname(email: string): Promise<string> {
  const emailLocalPart = email.split('@')[0].replace(/[^a-z0-9]/gi, '_'); // Limpiar caracteres
  let attempts = 0;
  let isUnique = false;
  let generatedNickname = '';

  while (!isUnique && attempts < 5) { // Intentar máximo 5 veces
    const randomSuffix = Math.floor(1000 + Math.random() * 9000);
    generatedNickname = `${emailLocalPart}_${randomSuffix}`.toLowerCase();
    isUnique = !(await isNicknameTaken(generatedNickname));
    attempts++;
  }

  if (!isUnique) {
    throw new Error("No se pudo generar un nickname único después de 5 intentos.");
  }

  return generatedNickname;
}