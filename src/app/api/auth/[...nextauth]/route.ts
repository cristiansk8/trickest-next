
import NextAuth from "next-auth/next";
import GoogleProvider from "next-auth/providers/google";

const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID ?? "",  // Se asegura de que no sea vacío
      clientSecret: process.env.GOOGLE_CLIENT_SECRET ?? "",  // Se asegura de que no sea vacío
    }),
  ],
  session: {
    strategy: 'jwt',  // Usamos JWT para almacenar la sesión, lo cual es común
  },
});

export { handler as GET, handler as POST };
