import prisma from '@/app/lib/prisma';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {

    try {
        console.log(req.json)
        const { userId, facebook, instagram, twitter, tiktok } = await req.json();
        
        // Verificación de campos requeridos (ya que es solo para usuarios logueados)
        if (!userId || (!facebook && !instagram && !twitter && !tiktok)) {
            return NextResponse.json({ error: 'El correo y al menos una red social son requeridos jajaj.' }, { status: 400 });
        }

        // Verificar si el usuario ya tiene redes sociales registradas
        const existingSocialMedia = await prisma.socialMedia.findUnique({
            where: { userId: userId },
        });

        if (existingSocialMedia) {
            // Si ya existe, actualizamos los datos
            const updatedSocialMedia = await prisma.socialMedia.update({
                where: { userId: userId },
                data: {
                    facebook: facebook ?? existingSocialMedia.facebook,
                    instagram: instagram ?? existingSocialMedia.instagram,
                    twitter: twitter ?? existingSocialMedia.twitter,
                    tiktok: tiktok ?? existingSocialMedia.tiktok,
                },
            });

            return NextResponse.json({ message: 'Redes sociales actualizadas correctamente', socialMedia: updatedSocialMedia }, { status: 200 });
        }

        // Si no existe, creamos un nuevo registro
        const socialMedia = await prisma.socialMedia.create({
            data: {
                userId: userId, // Usamos el correo como userId
                facebook: facebook ?? undefined,
                instagram: instagram ?? undefined,
                twitter: twitter ?? undefined,
                tiktok: tiktok ?? undefined,
            },
        });

        return NextResponse.json({ message: 'Redes sociales registradas correctamente', socialMedia }, { status: 201 });
    } catch (error) {
        console.error('Error al registrar redes sociales:', error);
        return NextResponse.json({ error: 'Error al registrar redes sociales' }, { status: 500 });
    }
}
