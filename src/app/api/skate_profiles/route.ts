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

// Servicio para obtener la foto del usuario
export async function GET_PHOTO(req: Request) {
    try {
        const { searchParams } = new URL(req.url);
        const email = searchParams.get('email');

        if (!email) {
            return NextResponse.json({ error: 'Email requerido' }, { status: 400 });
        }

        const user = await prisma.user.findUnique({
            where: { email },
            select: { photo: true } // Solo traer el campo photo
        });

        if (!user) {
            return NextResponse.json({ error: 'Usuario no encontrado' }, { status: 404 });
        }

        return NextResponse.json({ photo: user.photo }, { status: 200 });
    } catch (error) {
        console.error('Error obteniendo la foto del usuario:', error);
        return NextResponse.json({ error: 'Error en el servidor' }, { status: 500 });
    }
}

// Servicio para registrar un nuevo usuario
export async function POST(req: Request) {
    try {
        // Extraemos los datos del cuerpo de la solicitud
        const { email, name, phone, photo } = await req.json();

        // Validamos que los datos obligatorios estén presentes
        if (!email || !name || !phone || !photo) {
            return NextResponse.json({ error: 'Email, nombre, teléfono y photo son requeridos' }, { status: 400 });
        }

        // Crear el usuario en la base de datos con Prisma
        const user = await prisma.user.create({
            data: {
                email,
                name,
                photo,
                phone: phone ?? undefined,
                createdAt: new Date(),
            },
        });

        return NextResponse.json({ message: 'Usuario creado con éxito', user }, { status: 201 });
    } catch (error) {
        console.error('Error al insertar usuario:', error);
        return NextResponse.json({ error: 'Error al insertar usuario' }, { status: 500 });
    }
}
