import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import prisma from '@/app/lib/prisma';

export async function GET(req: Request) {
  try {
    const session = await getServerSession();

    if (!session?.user?.email) {
      return NextResponse.json({ error: 'No autenticado' }, { status: 401 });
    }

    // Verificar que el usuario sea juez o admin
    const user = await prisma.user.findUnique({
      where: { email: session.user.email },
      select: { role: true },
    });

    if (!user || (user.role !== 'judge' && user.role !== 'admin')) {
      return NextResponse.json({ error: 'No autorizado' }, { status: 403 });
    }

    // Obtener submissions pendientes con información del usuario y challenge
    const submissions = await prisma.submission.findMany({
      where: {
        status: 'pending',
      },
      include: {
        user: {
          select: {
            name: true,
            email: true,
          },
        },
        challenge: {
          select: {
            name: true,
            level: true,
            difficulty: true,
            points: true,
          },
        },
      },
      orderBy: {
        submittedAt: 'asc', // Más antiguas primero
      },
    });

    return NextResponse.json({
      submissions,
      count: submissions.length,
    });

  } catch (error) {
    console.error('Error obteniendo submissions pendientes:', error);
    return NextResponse.json({ error: 'Error del servidor' }, { status: 500 });
  }
}
