import prisma from '@/app/lib/prisma';
import { authOptions } from '@/lib/auth';
import { getServerSession } from 'next-auth';
import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

export async function GET(req: Request) {
  try {
    const session = await getServerSession(authOptions);

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
    // FILTRO IMPORTANTE: Priorizar submissions que realmente necesitan revisión de jueces
    // Excluimos las que la comunidad puede manejar (con suficientes votos y clara tendencia)
    const allPendingSubmissions = await prisma.submission.findMany({
      where: {
        status: 'pending',
        communityApproved: false,
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
      orderBy: [
        { voteCount: 'desc' }, // Priorizar las que tienen más votos (más urgentes)
        { submittedAt: 'asc' }, // Más antiguas primero
      ],
    });

    // Filtrar en memoria para mostrar solo las que realmente necesitan jueces:
    // 1. Submissions con menos de 10 votos (aún no evaluadas por comunidad)
    // 2. Submissions en zona dudosa (60-80% de aprobación) que necesitan decisión de juez
    const submissions = allPendingSubmissions.filter((sub) => {
      const totalVotes = sub.upvotes + sub.downvotes;

      // Si tiene menos de 10 votos, dejarla para que la comunidad vote más
      if (totalVotes < 10) {
        return false; // No mostrar a jueces todavía
      }

      // Si tiene 10+ votos, calcular porcentaje
      const positivePercentage = (sub.upvotes / totalVotes) * 100;

      // Mostrar a jueces solo si está en zona dudosa o cerca del threshold
      // (entre 70% y 85% de aprobación - necesita decisión experta)
      return positivePercentage >= 70 && positivePercentage < 85;
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
