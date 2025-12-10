import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import prisma from '@/app/lib/prisma';

export const dynamic = 'force-dynamic';

export async function GET(req: Request) {
  try {
    const session = await getServerSession();

    // Verificar autenticación
    if (!session?.user?.email) {
      return NextResponse.json({ error: 'No autenticado' }, { status: 401 });
    }

    // Obtener todas las submissions del usuario
    const submissions = await prisma.submission.findMany({
      where: {
        userId: session.user.email,
      },
      include: {
        challenge: {
          select: {
            id: true,
            level: true,
            name: true,
            difficulty: true,
            points: true,
            isBonus: true,
          },
        },
        user: {
          select: {
            name: true,
            email: true,
          },
        },
      },
      orderBy: {
        submittedAt: 'desc', // Más recientes primero
      },
    });

    // Calcular estadísticas
    const stats = {
      total: submissions.length,
      pending: submissions.filter(s => s.status === 'pending').length,
      approved: submissions.filter(s => s.status === 'approved').length,
      rejected: submissions.filter(s => s.status === 'rejected').length,
      totalScore: submissions
        .filter(s => s.status === 'approved' && s.score)
        .reduce((acc, s) => acc + (s.score || 0), 0),
    };

    // Obtener información del juez evaluador si existe
    const submissionsWithJudge = await Promise.all(
      submissions.map(async (submission) => {
        let judge = null;

        if (submission.evaluatedBy) {
          const judgeUser = await prisma.user.findUnique({
            where: { email: submission.evaluatedBy },
            select: {
              name: true,
              email: true,
            },
          });
          judge = judgeUser;
        }

        return {
          ...submission,
          judge,
        };
      })
    );

    return NextResponse.json({
      submissions: submissionsWithJudge,
      stats,
    });

  } catch (error) {
    console.error('Error obteniendo submissions del usuario:', error);
    return NextResponse.json({ error: 'Error del servidor' }, { status: 500 });
  }
}
