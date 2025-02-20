"use client"; // Asegura que el código solo se ejecute en el cliente

import { useState } from 'react';
import LocationSelector from '../../../../../components/LocationSelector'; // Asegúrate de que la ruta sea correcta
import { useSession } from 'next-auth/react';
import GeneralInfoForm from './general_info_form';

export default function ProfilePage() {
  const [formData, setFormData] = useState({
    facebook: '',
    instagram: '',
    twitter: '',
    tiktok: '',
  });
  const [loading, setLoading] = useState(false);
  const { data: session } = useSession();
  const [isRegistered, setIsRegistered] = useState(false);

  // Maneja el submit del formulario
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    if (!session?.user) {
      console.error('No estás autenticado');
      setLoading(false);
      return;
    }
    const jsonData = {
      userId: session.user.email,
      facebook: formData.facebook,
      instagram: formData.instagram,
      twitter: formData.twitter,
      tiktok: formData.tiktok,
    };
    console.log('Datos JSON a enviar:', jsonData);

    try {
      const response = await fetch('/api/skate_profiles/social_media', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          facebook: formData.facebook,
          instagram: formData.instagram,
          twitter: formData.twitter,
          tiktok: formData.tiktok,
          userId: session.user.email
        }),
      });

      const data = await response.json();

      if (data.error) {
        throw new Error(data.error);
      }

      console.log('Registro exitoso:', data);
      setIsRegistered(true);
    } catch (error) {
      console.error('Error al registrar:', error);  // Aquí se captura y muestra el error
      console.log('Error details:', error);  // Imprime detalles adicionales del error
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="text-black">
      <GeneralInfoForm />
      <div className="text-black">
        <span className="text-xl">Equipamiento soñado</span>
        <div>
          <form className="grid grid-cols-2 bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 ">
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">Madero:</label>
              <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                type="text"
                id="name"
                name="name"

              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="foto">Trucks:</label>
              <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                type="text"
                id="foto"
                name="foto"

              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="foto">Ruedas:</label>
              <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                type="number"
                id="phone"
                name="phone"

              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="foto">Rodamientos:</label>
              <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                type="text"
                id="location"
                name="location"

              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="foto">Tenis:</label>
              <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                type="text"
                id="biografia"
                name="biografia"

              />
            </div>
            <div className="flex items-center justify-between">
              <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="submit">Guardar</button>
            </div>
          </form>
        </div>
      </div>

      <div className="text-black">
        <span className="text-xl">Redes sociales</span>
        <div>
          <form onSubmit={handleSubmit} className='space-y-4 px-4 pb-4 flex grid-cols-2 bg-white shadow-md rounded  mb-4 '>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="facebook">Facebook:</label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                type="text"
                id="facebook"
                name="facebook"
                value={formData.facebook}
                onChange={(e) => setFormData({ ...formData, facebook: e.target.value })}
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="instagram">Instagram:</label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                type="text"
                id="instagram"
                name="instagram"
                value={formData.instagram}
                onChange={(e) => setFormData({ ...formData, instagram: e.target.value })}
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="tiktok">Tiktok:</label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                type="text"
                id="tiktok"
                name="tiktok"
                value={formData.tiktok}
                onChange={(e) => setFormData({ ...formData, tiktok: e.target.value })}
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="twitter">X:</label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                type="text"
                id="twitter"
                name="twitter"
                value={formData.twitter}
                onChange={(e) => setFormData({ ...formData, twitter: e.target.value })}
              />
            </div>
            <div className="flex items-center justify-between">
              <button
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                type="submit"
              >
                Guardar
              </button>
            </div>
          </form>
        </div>
      </div>

    </div>
  );
}
