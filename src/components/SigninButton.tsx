import { signIn, signOut, useSession } from "next-auth/react";
import { useState, useEffect } from 'react';
import SkateProfileCompletionModal from './SkateProfileCompletionModal';
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
          console.error('Error verificando registro:', error);
        }
      }
    };

    checkUserRegistration();
  }, [session]);

  if (session?.user) {
    return (
      <div className="flex gap-4 ml-auto">
        {isRegistered ? (
          <Link href="/dashboard/skaters/profile">
            <button className="h-10 px-4 font-medium text-sm rounded-md text-white bg-gray-900">
              Ver Perfil
            </button>
          </Link>
        ) : (
          <button
            type='button'
            className='h-10 px-4 font-medium text-sm rounded-md text-white bg-gray-900'
            onClick={handleModal}
          >
            Completar registro
          </button>
        )}

        <SkateProfileCompletionModal openModal={openModal} handleModal={handleModal} />

        <p className="text-sky-600">{session.user.name}</p>
        <button onClick={() => signOut()} className="text-red-600">
          Salir
        </button>
      </div>
    );
  }

  return (
    <button onClick={() => signIn('google')} className="text-green-600 ml-auto">
      Ingresar con Google
    </button>
  );
};

export default SigninButton;

