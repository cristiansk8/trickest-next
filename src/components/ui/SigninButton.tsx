"use client";

import { signIn } from "next-auth/react";

export default function SigninButton() {
  return (
    <button
      onClick={() => signIn("google")} // Inicia sesión con Google
      className="bg-green-600 text-white font-bold p-2 text-lg rounded-xl border-2hover:scale-110 transition-transform duration-300"
    >
      <div className="bg-green-600 rounded-xl  p-3 md:p-5 md:py-6 border-green-700 border shadow-lg shadow-green-800">
        START
      </div>
    </button>
  );
}