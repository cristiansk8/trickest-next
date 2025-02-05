import { Session } from "next-auth";

// Extender el tipo de sesión para incluir el accessToken
declare module "next-auth" {
  interface Session {
    accessToken?: string;
  }
}
