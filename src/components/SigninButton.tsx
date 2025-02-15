'use client'

import { signIn, signOut, useSession } from "next-auth/react";
import { useState, useEffect } from "react";
import SkateProfileCompletionModal from "./SkateProfileCompletionModal";
import Link from "next/link";

const SigninButton = () => {
  const { data: session } = useSession();
  const [openModal, setModal] = useState(false);
  const [isRegistered, setIsRegistered] = useState(false);
  const [openVideoModal, setOpenVideoModal] = useState(false);

  const handleModal = () => setModal(!openModal);
  const handleVideoModal = () => setOpenVideoModal(!openVideoModal);

  useEffect(() => {
    const checkUserRegistration = async () => {
      if (session?.user?.email) {
        try {
          const response = await fetch(`/api/skate_profiles?email=${session.user.email}`);
          const data = await response.json();
          if (data.registered) setIsRegistered(true);
        } catch (error) {
          console.error("Error verificando registro:", error);
        }
      }
    };

    checkUserRegistration();
  }, [session]);

  return (
    <>
      {/* Botón "Cómo jugar" en la fila superior */}
      <div className="fixed bottom-1/2 left-1/2 transform -translate-x-1/2 -translate-y-16 flex items-center">
        <button
          onClick={handleVideoModal}
          className="px-6 py-3 text-lg font-bold text-white bg-blue-600 border-4 border-white rounded-lg shadow-lg hover:scale-110 transition-transform duration-300"
        >
          Cómo jugar
        </button>
      </div>

      {/* Botones principales en la parte inferior */}
      {session?.user ? (
        <div className="fixed bottom-16 left-1/2 transform -translate-x-1/2 flex flex-col md:flex-row items-center gap-4">
          {isRegistered ? (
            <Link href="/dashboard/skaters/profile">
              <button className="px-6 py-3 text-lg font-bold text-white bg-green-600 border-4 border-white rounded-lg shadow-lg hover:scale-110 transition-transform duration-300">
                Ver Perfil
              </button>
            </Link>
          ) : (
            <button
              type="button"
              className="px-6 py-3 text-lg font-bold text-white bg-green-600 border-4 border-white rounded-lg shadow-lg hover:scale-110 transition-transform duration-300"
              onClick={handleModal}
            >
              Completar registro
            </button>
          )}

          <SkateProfileCompletionModal openModal={openModal} handleModal={handleModal} />

          <p className="text-lg font-semibold text-white bg-black px-4 py-2 rounded-lg">
            {session.user.name}
          </p>
          <button
            onClick={() => signOut()}
            className="px-6 py-3 text-lg font-bold text-white bg-red-600 border-4 border-white rounded-lg shadow-lg hover:scale-110 transition-transform duration-300"
          >
            Salir
          </button>
        </div>
      ) : (
        <button
          onClick={() => signIn("google")}
          className="fixed left-1/2 bottom-1/4 transform -translate-x-1/2 bg-green-600 text-white font-bold px-6 py-3 text-lg rounded-lg shadow-lg border-4 border-white hover:scale-110 transition-transform duration-300"
        >
          Jugar
        </button>
      )}

      {/* Modal para el video */}
      {openVideoModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-75 z-50">
          <div className="bg-white p-4 rounded-lg shadow-lg max-w-2xl w-full relative">
            <button
              onClick={handleVideoModal}
              className="absolute top-2 right-2 text-red-600 font-bold text-lg"
            >
              ✖
            </button>
            <h2 className="text-xl font-bold text-center mb-4">Cómo jugar</h2>
            <div className="relative w-full h-0" style={{ paddingBottom: "56.25%" }}>
              <iframe
                className="absolute top-0 left-0 w-full h-full"
                src="https://www.youtube.com/embed/ZzRXUcs6GG0?autoplay=1"
                title="Cómo jugar"
                allow="autoplay; encrypted-media"
                allowFullScreen
              ></iframe>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default SigninButton;
