import prisma from '@/lib/prisma';
import { NextResponse } from 'next/server';

export async function GET(req: Request) {
  try {
    const url = new URL(req.url);
    const email = url.searchParams.get("email");

    console.log("🔍 Email recibido en la API:", email);

    if (!email) {
      return NextResponse.json({ error: "Email es requerido" }, { status: 400 });
    }

    const user = await prisma.user.findUnique({
      where: { email },
    });

    console.log("👤 Datos del usuario encontrado:", user);

    if (!user) {
      return NextResponse.json({ registered: false, message: "Usuario no encontrado" }, { status: 404 });
    }

    // ✅ Devuelve los datos completos
    return NextResponse.json({ registered: true, user }, { status: 200 });

  } catch (error) {
    console.error("❌ Error en la API:", error);
    return NextResponse.json({ error: "Error en el servidor" }, { status: 500 });
  }
}

// Actualización de Usuario (sin modificar email ni foto)
export async function PUT(req: Request) {
  console.log("🔧 Actualizando usuario...");

  try {
    const data = await req.json();
    console.log("📦 Datos recibidos:", data);
    const { email, name, phone, estado, departamento, ciudad, birthdate, birthskate } = data;

    if (!email) {
      return NextResponse.json({ error: 'Email requerido' }, { status: 400 });
    }

    // Verificar si el usuario existe
    const existingUser = await prisma.user.findUnique({ where: { email } });
    if (!existingUser) {
      return NextResponse.json({ error: 'Usuario no encontrado' }, { status: 404 });
    }

    // Actualizar los datos del usuario (sin modificar email ni photo)
    const updatedUser = await prisma.user.update({
      where: { email },
      data: {
        name,
        phone,
        departamento,
        ciudad,
        estado,
        birthdate: birthdate ? new Date(birthdate) : undefined,
        birthskate: birthskate ? new Date(birthskate) : undefined,
      },
    });

    return NextResponse.json({ message: 'Usuario actualizado con éxito', updatedUser }, { status: 200 });
  } catch (error) {
    console.error('Error al actualizar el usuario:', error);
    return NextResponse.json({ error: 'Hubo un error en la actualización' }, { status: 500 });
  }
}
