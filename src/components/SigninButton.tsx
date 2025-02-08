import { signIn, signOut, useSession } from "next-auth/react";
import { useState, useEffect } from "react";
import SkateProfileCompletionModal from "./SkateProfileCompletionModal";
import Link from "next/link";

const SigninButton = () => {
  const { data: session } = useSession();
  const [openModal, setModal] = useState(false);
  const [isRegistered, setIsRegistered] = useState(false);

  const handleModal = () => setModal(!openModal);

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

  if (session?.user) {
    return (
      <div className="fixed bottom-5 left-1/2 transform -translate-x-1/2 flex flex-col items-center gap-4">
        {isRegistered ? (
          <Link href="/dashboard/skaters/profile">
            <button className="relative px-6 py-3 text-lg font-bold text-white bg-green-600 border-4 border-white rounded-lg shadow-lg hover:scale-110 transition-transform duration-300 animate-pulse">
              Ver Perfil
            </button>
          </Link>
        ) : (
          <button
            type="button"
            className="relative px-6 py-3 text-lg font-bold text-white bg-green-600 border-4 border-white rounded-lg shadow-lg hover:scale-110 transition-transform duration-300 animate-pulse"
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
          className="relative px-6 py-3 text-lg font-bold text-white bg-red-600 border-4 border-white rounded-lg shadow-lg hover:scale-110 transition-transform duration-300 animate-pulse"
        >
          Salir
        </button>
      </div>
    );
  }

  return (
    <button
      onClick={() => signIn("google")}
      className="fixed left-1/2 bottom-1/2 transform -translate-x-1/2 translate-y-1/2 bg-green-600 text-white font-bold px-6 py-3 text-lg rounded-lg shadow-lg animate-pulse border-4 border-white hover:scale-110 transition-transform duration-300"
    >
      Jugar
    </button>
  );
};

export default SigninButton;
