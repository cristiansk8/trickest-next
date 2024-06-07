'use client'
import { useRef, useState } from 'react';
import React from "react";
import { signIn, signOut, useSession } from "next-auth/react";
import { useEffect } from 'react';
import Link from 'next/link';
import { getSkate, preRegister } from '@/utils/helpers/skate';
import { getJudge } from '@/utils/helpers/judge';
import { SkateProfileCompletionModal } from './SkateProfileCompletionModal';


const SigninButton = () => {
  const firstRender = useRef(true);
  const [profileComplete, setProfileComplete] = useState(false);
  const [typeUser, setTypeUser] = useState("")

  const { data: session } = useSession();
  const [openModal, setModal] = useState(false);
  const handleModal = () => {
    setModal(!openModal)
  }

  const [formData, setFormData] = useState({
    name: '',
    foto: '',
    phone: '',
    location: '',
    biografia: '',
    redes: '',
    score: 0,
    email: session?.user?.email,
    team_id: 1
  });

  useEffect(() => {
    // Verificar si es la primera renderización
    if (firstRender.current) {
      // Marcar que ya no es la primera renderización
      firstRender.current = false;
      return; // Salir del useEffect sin hacer nada en la primera renderización
    }
    const checkProfile = async () => {
      try {
        if (session && session.user && session.user.email) {
          const judge = await getJudge(session.user.email)
          if (judge) {
            setTypeUser("judge")
          } else {
            const result = await getSkate(session.user.email);
            if (result) {
              if (result.phone) {
                setProfileComplete(true);
                setTypeUser('skate')
              } else {
                setProfileComplete(false);
                setTypeUser('skate')
              }
            } else {
              setProfileComplete(false);
              setTypeUser('skate')
              preRegister(session.user.email, session.user.email);
            }
          }
        } else {
          setProfileComplete(false);
          setTypeUser("")
        }
      } catch (error) {
        console.error('Hubo un fallo al verificar el perfil:', error);
        setProfileComplete(false);
        setTypeUser("")
      }
    };
    checkProfile();
  }, [session]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prevFormData => ({
      ...prevFormData,
      email: session?.user?.email, // Establecer email antes del spread
      [name]: value
    }));
    console.log(value);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      console.log(formData);
      const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/skates/update-by-email/${session?.user?.email}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      const responseData = await response.json();
      setProfileComplete(true);
      handleModal();
      // Aquí puedes manejar la respuesta del servidor según lo necesites
    } catch (error) {
      console.error('Error:', error);
      // Aquí puedes manejar los errores que puedan ocurrir durante el request
    }
  };

  if (session && session.user) {
    return (
      <div className="flex gap-4 ml-auto">

        {
          typeUser === 'skate' ?
            <button
              type='button'
              className='h-10 px-4 font-medium text-sm rounded-md text-white bg-gray-900'
              onClick={handleModal}
            >completar registro</button>
            : 
            profileComplete ?
              <Link href="/dashboard/skaters/profile">
                <button
                  type='button'
                  className='h-10 px-4 font-medium text-sm rounded-md text-white bg-gray-900'
                  onClick={() => console.log("ver perfil")}
                >ver perfil</button>
              </Link> : null
        }

        {
          typeUser === 'judge' ?
            <div>
              <Link href="/dashboard/judge/profile">
                <button
                  type='button'
                  className='h-10 px-4 font-medium text-sm rounded-md text-white bg-blue-600'
                  onClick={() => console.log("ver perfil")}
                >Ver perfil Juez</button>
              </Link>
            </div>
            : null
        }
        <SkateProfileCompletionModal
          openModal={openModal}
          handleModal={handleModal}
          handleSubmit={handleSubmit}
          formData={formData}
          handleChange={handleChange}
        />

        {}
        <p className="text-sky-600">{session.user.name}</p>
        <button onClick={() => signOut()} className="text-red-600">
          Salir
        </button>
      </div>
    );
  }

  return (
    <button onClick={() => signIn()} className="text-green-600 ml-auto">
      Ingresar
    </button>
  );
};

export default SigninButton;
