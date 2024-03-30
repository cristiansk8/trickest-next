'use client'
import { useState } from 'react';
import React from "react";
import { signIn, signOut, useSession } from "next-auth/react";

const SigninButton = () => {
  const { data: session } = useSession();
  const [openModal, setModal] = useState(false);
  const handleModal = () => {
    setModal(!openModal)
  }
  const [formData, setFormData] = useState({
    name: '',
    foto: '',
    redes: '',
    score: 0,
    email: '',
    team_id: 0
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prevFormData => ({
      ...prevFormData,
      [name]: value
    }));
    console.log(value);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:8000/api/skates', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
          // Si necesitas enviar algún token de autenticación, aquí es donde lo incluirías
          // 'Authorization': 'Bearer ' + token,
        },
        body: JSON.stringify(formData),
      });

      const responseData = await response.json();
      console.log("registro completado");
      // Aquí puedes manejar la respuesta del servidor según lo necesites
    } catch (error) {
      console.error('Error:', error);
      // Aquí puedes manejar los errores que puedan ocurrir durante el request
    }
  };

  if (session && session.user) {
    return (
      <div className="flex gap-4 ml-auto">
      <button
        type='button'
        className='h-10 px-4 font-medium text-sm rounded-md text-white bg-gray-900'
        onClick={handleModal}
      >completar registro</button>
      {
      openModal &&
      <div className='fixed top-0 left-0 w-full h-full bg-gray-300 flex justify-center items-center'>
        <div className='max-w-[460px] bg-white shadow-lg py-2 rounded-md'>
          <h2 className='text-sm font-medium text-gray-900 border-b border-gray-300 py-3 px-4 mb-4'>Completa tu registro</h2>
          <div className='px-4 pb-4'>
            <div className="p-4 md:p-5 space-y-4">
              <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4" onSubmit={handleSubmit}>
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
                <div>
                  <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="redes">Mail:</label>
                  <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    type="text"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="submit">Enviar</button>
                </div>
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
              Close
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
