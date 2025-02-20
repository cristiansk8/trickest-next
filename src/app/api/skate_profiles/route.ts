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

// Registro de Usuario y Redes Sociales
export async function POST(req: Request) {
    try {
        // Extraemos los datos del cuerpo de la solicitud
        const { email, name, phone, photo, departamento, ciudad, facebook, instagram, twitter, tiktok } = await req.json();

        // Validamos los campos obligatorios
        if (!email || !name || !phone || !photo || !departamento || !ciudad) {
            return NextResponse.json({ error: 'Todos los campos del usuario son requeridos' }, { status: 400 });
        }

        // Crear el usuario
        const user = await prisma.user.create({
            data: {
                email,
                name,
                phone: phone ?? undefined,
                photo,
                departamento,
                ciudad,
                createdAt: new Date(),
            },
        });

        // Registrar o actualizar las redes sociales con el mismo email (usando email como ID)
        const socialMedia = await prisma.socialMedia.upsert({
            where: { userId: email }, // Usamos el correo electrónico como identificador
            update: {
                facebook: facebook ?? undefined,
                instagram: instagram ?? undefined,
                twitter: twitter ?? undefined,
                tiktok: tiktok ?? undefined,
            },
            create: {
                userId: email,
                facebook: facebook ?? undefined,
                instagram: instagram ?? undefined,
                twitter: twitter ?? undefined,
                tiktok: tiktok ?? undefined,
            },
        });

        // Responder con éxito
        return NextResponse.json({ message: 'Usuario y redes sociales creados con éxito', user, socialMedia }, { status: 201 });
    } catch (error) {
        console.error('Error:', error);
        return NextResponse.json({ error: 'Hubo un error al crear el usuario y redes sociales' }, { status: 500 });
    }
}

