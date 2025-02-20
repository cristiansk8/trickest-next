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

export async function GET(req: Request) {
    try {
      const url = new URL(req.url);
      const email = url.searchParams.get("email");
  
      console.log("🔍 Email recibido en la API:", email);
  
      if (!email) {
        return NextResponse.json({ error: "Email es requerido" }, { status: 400 });
      }
  
      // Buscar redes sociales del usuario
      const socialMedia = await prisma.socialMedia.findUnique({
        where: { userId: email },
      });
  
      console.log("🌐 Redes sociales encontradas:", socialMedia);
  
      if (!socialMedia) {
        return NextResponse.json(
          { exists: false, message: "Redes sociales no encontradas" },
          { status: 404 }
        );
      }
  
      return NextResponse.json({ exists: true, socialMedia }, { status: 200 });
    } catch (error) {
      console.error("❌ Error en la API de redes sociales:", error);
      return NextResponse.json(
        { error: "Error en el servidor" },
        { status: 500 }
      );
    }
  }