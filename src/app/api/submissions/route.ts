import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import prisma from '@/app/lib/prisma';
import { validateYouTubeUrl, normalizeYouTubeUrl } from '@/lib/youtube';
import { authOptions } from '@/lib/auth';

export const dynamic = 'force-dynamic';

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);

    // Verificar autenticación
    if (!session?.user?.email) {
      return NextResponse.json({ error: 'No autenticado' }, { status: 401 });
    }

    const { challengeId, videoUrl } = await req.json();

    // Validaciones
    if (!challengeId || !videoUrl) {
      return NextResponse.json({ error: 'Datos incompletos' }, { status: 400 });
    }

    // Validar URL de YouTube
    if (!validateYouTubeUrl(videoUrl)) {
      return NextResponse.json(
        {
          error: 'URL de YouTube inválida',
          message: 'Por favor ingresa una URL válida de YouTube. Ejemplo: https://www.youtube.com/watch?v=VIDEO_ID'
        },
        { status: 400 }
      );
    }

    // Verificar que el challenge existe
    const challenge = await prisma.challenge.findUnique({
      where: { id: challengeId },
    });

    if (!challenge) {
      return NextResponse.json({ error: 'Challenge no encontrado' }, { status: 404 });
    }

    // Verificar si ya existe una submission para este challenge
    const existingSubmission = await prisma.submission.findFirst({
      where: {
        userId: session.user.email,
        challengeId: challengeId,
      },
    });

    if (existingSubmission) {
      return NextResponse.json(
        {
          error: 'Submission duplicada',
          message: `Ya enviaste una submission para el challenge "${challenge.name}". Estado: ${existingSubmission.status}`,
          existingSubmission
        },
        { status: 409 }
      );
    }

    // Normalizar la URL de YouTube
    const normalizedUrl = normalizeYouTubeUrl(videoUrl);

    // Crear la submission
    const submission = await prisma.submission.create({
      data: {
        userId: session.user.email,
        challengeId: challengeId,
        videoUrl: normalizedUrl,
        status: 'pending',
        submittedAt: new Date(),
      },
      include: {
        challenge: {
          select: {
            name: true,
            level: true,
            difficulty: true,
            points: true,
          },
        },
      },
    });

    return NextResponse.json({
      message: 'Submission creada exitosamente',
      submission,
    }, { status: 201 });

  } catch (error) {
    console.error('Error creando submission:', error);
    return NextResponse.json({ error: 'Error del servidor' }, { status: 500 });
  }
}
