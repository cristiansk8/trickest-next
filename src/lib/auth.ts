// lib/auth.ts
import { AuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";

import { generateUniqueNickname } from "@/lib/validations";
import prisma from "./prisma";

export const authOptions: AuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET!,
  session: {
    strategy: "jwt",
  },
  callbacks: {
    async signIn({ user }) {
      try {
        // Verificar si el usuario ya existe
        let existingUser = await prisma.user.findUnique({
          where: { email: user.email! },
        });

        // Si el usuario no existe, crearlo
        if (!existingUser) {
          const generatedNickname = await generateUniqueNickname(user.email!);
          existingUser = await prisma.user.create({
            data: {
              email: user.email!,
              nickname: generatedNickname,
              name: user.name,
              photo: user.image,
            },
          });
        }

        return true;
      } catch (error) {
        console.error("Error en signIn callback:", error);
        return false;
      }
    },

    async jwt({ token, user }) {
      // Si hay un usuario (signIn), buscarlo en la DB
      if (user) {
        const dbUser = await prisma.user.findUnique({
          where: { email: user.email! },
        });

        if (dbUser) {
          token.user = {
            id: dbUser.id,
            nickname: dbUser.nickname,
            email: dbUser.email,
            name: dbUser.name,
            photo: dbUser.photo,
          };
        }
      }
      return token;
    },

    async session({ session, token }) {
      // Pasar los datos del token a la sesión
      if (token.user) {
        session.user = token.user as any;
      }
      return session;
    },
  },
};
