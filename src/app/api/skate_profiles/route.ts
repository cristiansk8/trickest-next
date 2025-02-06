import prisma from '@/app/lib/prisma';
import { NextResponse } from 'next/server';

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
        // Extraemos los datos del cuerpo de la solicitud
        const { email, name, phone } = await req.json();

        // Validamos que los datos obligatorios estén presentes
        if (!email || !name || !phone) {
            return NextResponse.json({ error: 'Email, nombre y teléfono son requeridos' }, { status: 400 });
        }

        // Crear el usuario en la base de datos con Prisma
        const user = await prisma.user.create({
            data: {
                email,
                name,
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
