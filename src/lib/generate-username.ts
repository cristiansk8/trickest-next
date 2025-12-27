import prisma from '@/app/lib/prisma';

/**
 * Genera un username único basado en el nombre o email del usuario
 */
export async function generateUniqueUsername(name: string | null, email: string): Promise<string> {
  // Intentar usar el nombre primero
  let baseUsername = name
    ? name
        .toLowerCase()
        .replace(/\s+/g, '_') // Reemplazar espacios con guiones bajos
        .replace(/[^a-z0-9_]/g, '') // Remover caracteres especiales
        .substring(0, 20) // Limitar longitud
    : email.split('@')[0].toLowerCase().replace(/[^a-z0-9_]/g, '');

  // Si el baseUsername está vacío, usar 'user'
  if (!baseUsername) {
    baseUsername = 'user';
  }

  // Verificar si el username ya existe
  let username = baseUsername;
  let counter = 1;

  while (true) {
    const existing = await prisma.user.findUnique({
      where: { username },
    });

    if (!existing) {
      // Username disponible
      return username;
    }

    // Agregar número y reintentar
    username = `${baseUsername}${counter}`;
    counter++;

    // Prevenir loops infinitos
    if (counter > 1000) {
      // Usar timestamp como fallback
      return `${baseUsername}_${Date.now()}`;
    }
  }
}
