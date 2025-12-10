import { NextResponse } from 'next/server';
import prisma from '@/app/lib/prisma';

export async function GET(
  request: Request,
  { params }: { params: Promise<{ email: string }> }
) {
  try {
    const { email } = await params;
    const decodedEmail = decodeURIComponent(email);

    const user = await prisma.user.findUnique({
      where: { email: decodedEmail },
      select: {
        email: true,
        name: true,
        photo: true,
        ciudad: true,
        departamento: true,
        estado: true,
        role: true,
        createdAt: true,
        team: {
          select: {
            id: true,
            name: true,
            logo: true,
          },
        },
        socials: {
          select: {
            instagram: true,
            tiktok: true,
            twitter: true,
            facebook: true,
          },
        },
        WishSkate: {
          select: {
            madero: true,
            trucks: true,
            ruedas: true,
            rodamientos: true,
            tenis: true,
          },
        },
        submissions: {
          where: {
            status: 'approved',
          },
          select: {
            id: true,
            score: true,
            challenge: {
              select: {
                name: true,
                difficulty: true,
                points: true,
              },
            },
          },
        },
      },
    });

    if (!user) {
      return NextResponse.json(
        { error: 'Usuario no encontrado' },
        { status: 404 }
      );
    }

    // Calculate stats
    const totalScore = user.submissions.reduce((acc, sub) => acc + (sub.score || 0), 0);
    const challengesCompleted = user.submissions.length;
    const highestDifficulty = user.submissions.reduce((max, sub) => {
      return sub.challenge.difficulty > max ? sub.challenge.difficulty : max;
    }, 0);

    // Build location string from ciudad, departamento, estado
    const locationParts = [user.ciudad, user.departamento, user.estado].filter(Boolean);
    const location = locationParts.length > 0 ? locationParts.join(', ') : null;

    // Get the first social media record (if any)
    const socialMedia = user.socials.length > 0 ? user.socials[0] : null;

    // Format response - exclude sensitive data
    const publicProfile = {
      email: user.email,
      name: user.name,
      photo: user.photo,
      location,
      role: user.role,
      memberSince: user.createdAt,
      team: user.team,
      socialMedia,
      skateSetup: user.WishSkate,
      stats: {
        totalScore,
        challengesCompleted,
        highestDifficulty,
        submissionsApproved: user.submissions.length,
      },
      recentAchievements: user.submissions.slice(0, 5).map(sub => ({
        challengeName: sub.challenge.name,
        difficulty: sub.challenge.difficulty,
        score: sub.score,
      })),
    };

    return NextResponse.json(publicProfile);
  } catch (error) {
    console.error('Error fetching public profile:', error);
    return NextResponse.json(
      { error: 'Error al obtener el perfil' },
      { status: 500 }
    );
  }
}
