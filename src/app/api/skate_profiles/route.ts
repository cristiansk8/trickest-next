import prisma from '@/app/lib/prisma';
import { NextResponse } from 'next/server';

// Servicio para verificar si el usuario está registrado
export async function GET(req: Request) {
    try {
        const { searchParams } = new URL(req.url);
        const email = searchParams.get('email');

        if (!email) {
            return NextResponse.json({ error: 'Email requerido' }, { status: 400 });
        }

        const user = await prisma.user.findUnique({
            where: { email },
        });

        return NextResponse.json({ registered: !!user }, { status: 200 });
    } catch (error) {
        console.error('Error verificando usuario:', error);
        return NextResponse.json({ error: 'Error en el servidor' }, { status: 500 });
    }
}

export async function POST(req: Request) {
    try {
        const { userId, facebook, instagram, twitter, tiktok } = await req.json();

        if (!userId) {
            return NextResponse.json({ error: 'Email (userId) es requerido' }, { status: 400 });
        }

        // Verificar si el usuario existe por su email
        const user = await prisma.user.findUnique({
            where: { email: userId },
        });

        if (!user) {
            return NextResponse.json({ error: 'Usuario no encontrado' }, { status: 404 });
        }

        // Registrar las redes sociales usando el email como userId
        const socialMedia = await prisma.socialMedia.create({
            data: {
                userId, // Ahora es el email
                facebook: facebook ?? null,
                instagram: instagram ?? null,
                twitter: twitter ?? null,
                tiktok: tiktok ?? null,
            },
        });

        return NextResponse.json({ message: 'Redes sociales registradas con éxito', socialMedia }, { status: 201 });
    } catch (error) {
        console.error('Error al registrar redes sociales:', error);
        return NextResponse.json({ error: 'Error al registrar redes sociales' }, { status: 500 });
    }
}
