import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import prisma from '@/app/lib/prisma';
import { authOptions } from '@/lib/auth';
import { generateUniqueUsername } from '@/lib/generate-username';

/**
 * API endpoint para migrar username del usuario actual
 * Solo funciona para el usuario autenticado
 */
export async function POST() {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user?.email) {
      return NextResponse.json({ error: 'No autenticado' }, { status: 401 });
    }

    // Verificar si el usuario ya tiene username
    const user = await prisma.user.findUnique({
      where: { email: session.user.email },
      select: {
        id: true,
        email: true,
        name: true,
        username: true,
      },
    });

    if (!user) {
      return NextResponse.json({ error: 'Usuario no encontrado' }, { status: 404 });
    }

    if (user.username) {
      return NextResponse.json({
        message: 'Usuario ya tiene username asignado',
        username: user.username,
      });
    }

    // Generar y asignar username único
    const username = await generateUniqueUsername(user.name, user.email);

    await prisma.user.update({
      where: { email: user.email },
      data: { username },
    });

    return NextResponse.json({
      message: 'Username asignado exitosamente',
      username,
      instructions: 'Por favor cierra sesión y vuelve a iniciar sesión para ver los cambios',
    }, { status: 200 });

  } catch (error) {
    console.error('Error en migración de username:', error);
    return NextResponse.json(
      { error: 'Error interno del servidor' },
      { status: 500 }
    );
  }
}
