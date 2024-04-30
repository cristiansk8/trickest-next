'use client'
import { useRef, useState } from 'react';
import React from "react";
import { signIn, signOut, useSession } from "next-auth/react";
import { useEffect } from 'react';
import Link from 'next/link';
import { getSkate, preRegister } from '@/utils/helpers/skate';
import { getJudge } from '@/utils/helpers/juez';


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
          profileComplete && typeUser === 'skate' ?
            <Link href="/dashboard/skaters/profile">
              <button
                type='button'
                className='h-10 px-4 font-medium text-sm rounded-md text-white bg-gray-900'
                onClick={() => console.log("ver perfil")}
              >ver perfil</button>
            </Link> :
            <button
              type='button'
              className='h-10 px-4 font-medium text-sm rounded-md text-white bg-gray-900'
              onClick={handleModal}
            >completar registro</button>
        }
        {
          typeUser === 'judge' ?
            <h1 className='bg-red-500 p-4 text-white'>{typeUser}</h1> : null
        }

        {
          openModal &&
          <div className='fixed top-0 left-0 w-full h-full bg-gray-300 flex justify-center items-center'>
            <div className='max-w-[460px] bg-white shadow-lg py-2 rounded-md'>
              <h2 className='text-sm font-medium text-gray-900 border-b border-gray-300 py-3 px-4 mb-4'>Completa tu registro</h2>
              <div className='px-4 pb-4'>
                <div className="p-4 md:p-5 space-y-4">
                  <form className="grid grid-cols-2 bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 " onSubmit={handleSubmit}>
                    <div className="mb-4">
                      <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">Name:</label>
                      <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                      />
                    </div>
                    <div className="mb-4">
                      <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="foto">Foto:</label>
                      <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        type="text"
                        id="foto"
                        name="foto"
                        value={formData.foto}
                        onChange={handleChange}
                      />
                    </div>
                    <div className="mb-4">
                      <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="foto">phone:</label>
                      <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        type="number"
                        id="phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                      />
                    </div>
                    <div className="mb-4">
                      <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="foto">location:</label>
                      <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        type="text"
                        id="location"
                        name="location"
                        value={formData.location}
                        onChange={handleChange}
                      />
                    </div>
                    <div className="mb-4">
                      <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="foto">biografia:</label>
                      <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        type="text"
                        id="biografia"
                        name="biografia"
                        value={formData.biografia}
                        onChange={handleChange}
                      />
                    </div>
                    <div>
                      <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="redes">Redes:</label>
                      <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        type="text"
                        id="redes"
                        name="redes"
                        value={formData.redes}
                        onChange={handleChange}
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="submit">Enviar</button>
                      ¡                    </div>
                  </form>
                </div>
              </div>
              <div className='border-t border-gray-300 flex justify-between items-center px-4 pt-2'>
                <div className='text-sm font-medium text-gray-700'>Patina, graba y postea!</div>
                <button
                  type='button'
                  className='h-8 px-2 text-sm rounded-md bg-gray-700 text-white'
                  onClick={handleModal}
                >
                  Cerrar
                </button>
              </div>
            </div>
          </div>
        }
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
