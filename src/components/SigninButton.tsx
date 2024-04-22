'use client'
import { useState } from 'react';
import React from "react";
import { signIn, signOut, useSession } from "next-auth/react";
import { useEffect } from 'react';

const SigninButton = () => {
  const [porfileComplete, setProfileComplete] = useState(false);
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

  const preRegister = () => {
    console.log("pre Registro");
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prevFormData => ({
      ...prevFormData,
      email: session?.user?.email, // Establecer email antes del spread
      [name]: value
    }));
    console.log(value);
  };

  //completar registro
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      console.log(formData);
      const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/skates`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          /*           'X-Requested-With':
                      'XMLHttpRequest' */
          // Si necesitas enviar algún token de autenticación, aquí es donde lo incluirías
          // 'Authorization': 'Bearer ' + token,
        },
        body: JSON.stringify(formData),
      });

      const responseData = await response.json();
      console.log("registro completado", responseData);
      setProfileComplete(true);
      handleModal();
      // Aquí puedes manejar la respuesta del servidor según lo necesites
    } catch (error) {
      console.error('Error:', error);
      // Aquí puedes manejar los errores que puedan ocurrir durante el request
    }
  };

  //confirmar correo

  useEffect(() => {
    const checkProfile = async () => {
      if (session && session.user && session.user.email) {
        try {
          if (!porfileComplete) {
            // Llamar a la función para verificar el perfil
            const isComplete = await getSkate(session.user.email);
            if (isComplete.phone) {
              setProfileComplete(true);
            } else {
              preRegister();
            }
          }
        } catch (error) {
          // En caso de error, establecer profileComplete en false
          // Llamar a preRegister() si no se encuentra el skate
          preRegister();
          console.error('Error al verificar el perfil:', error);
        }
      }
    };

    checkProfile();
  }, [session]);


  const getSkate = async (email: String) => {
    /* console.log(email) */
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/search-by-email?email=${email}`, {
        method: 'get',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      const responseData = await response.json();
      // Verificar si el perfil está completo
      return responseData; // Si responseData no está vacío, el perfil está completo
    } catch (error) {
      console.error('Error:', error);
      throw error; // Lanzar error para manejarlo en el useEffect
    }
  };




  if (session && session.user) {
    return (
      <div className="flex gap-4 ml-auto">
        {
          porfileComplete ?
            <button
              type='button'
              className='h-10 px-4 font-medium text-sm rounded-md text-white bg-gray-900'
              onClick={() => console.log("ver perfil")}
            >ver perfil</button> :
            <button
              type='button'
              className='h-10 px-4 font-medium text-sm rounded-md text-white bg-gray-900'
              onClick={handleModal}
            >completar registro</button>
        }

        {
          openModal &&
          <div className='fixed top-0 left-0 w-full h-full bg-gray-300 flex justify-center items-center'>
            <div className='max-w-[460px] bg-white shadow-lg py-2 rounded-md'>
              <h2 className='text-sm font-medium text-gray-900 border-b border-gray-300 py-3 px-4 mb-4'>Completa tu registro</h2>
              <div className='px-4 pb-4'>
                <div className="p-4 md:p-5 space-y-4">
                  <form className="flex grid grid-cols-2 bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 " onSubmit={handleSubmit}>
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
