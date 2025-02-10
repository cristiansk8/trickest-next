"use client"; // Agrega esto en la parte superior del archivo

import { useState } from 'react';
import LocationSelector from '../../../../../components/LocationSelector'; // Asegúrate de que la ruta sea correcta según tu estructura de carpetas.
import { useSession } from 'next-auth/react';


export default function PorfilePage() {
  // Agrega el estado para selectedCity y selectedDepartment
  const [selectedCity, setSelectedCity] = useState<string>('');
  const [selectedDepartment, setSelectedDepartment] = useState<string>('');
  const [formData, setFormData] = useState({ userId: '', facebook: '', instagram: '', twitter: '', tiktok: ''});
  const [loading, setLoading] = useState(false);
  const { data: session } = useSession();
  const [isRegistered, setIsRegistered] = useState(false);


  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    if (!session?.user) {
      console.error('No estás autenticado');
      setLoading(false);
      return;
    }

    try {
      const response = await fetch('/api/skate_profiles', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userId: session.user.email,
          facebook: formData.facebook,
          instagram: formData.instagram,
          twitter: formData.twitter,
          tiktok: formData.tiktok,
        }),
      });

      const data = await response.json();
      if (data.error) throw new Error(data.error);

      console.log('Registro exitoso:', data);
      setIsRegistered(true);
    } catch (error) {
      console.error('Error al registrar:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="text-black">
      <h1 className="mt-2 text-3xl">Mi perfil</h1>
      <span className="text-xl">Información general</span>
      <div>
        <form className="flex grid grid-cols-2 bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 ">
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">
              Name:
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              type="text"
              id="name"
              name="name"
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="phone">
              Phone:
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              type="number"
              id="phone"
              name="phone"
            />
          </div>

          {/* Aquí se inserta el LocationSelector, pasándole las propiedades */}
          <div className="mb-4">
            <LocationSelector
              selectedCity={selectedCity}
              setSelectedCity={setSelectedCity} // Pasa setSelectedCity aquí
              selectedDepartment={selectedDepartment} // Pasa selectedDepartment
              setSelectedDepartment={setSelectedDepartment} // Pasa setSelectedDepartment
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="biografia">
              Estado:
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              type="text"
              id="biografia"
              name="biografia"
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


      <div className="text-black">
        <span className="text-xl">Equipamiento soñado</span>
        <div>
          <form className="flex grid grid-cols-2 bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 ">
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
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">Facebook:</label>
              <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                type="text"
                id="name"
                name="facebook"
                value={formData.facebook}
                onChange={(e) => setFormData({ ...formData, facebook: e.target.value })}

              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="foto">Instagram:</label>
              <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                type="text"
                id="foto"
                name="instagram"
                value={formData.instagram}
                onChange={(e) => setFormData({ ...formData, instagram: e.target.value })}

              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="foto">Tiktok:</label>
              <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                type="text"
                id="phone"
                name="tiktok"
                value={formData.tiktok}
                onChange={(e) => setFormData({ ...formData, tiktok: e.target.value })}

              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="foto">X:</label>
              <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                type="text"
                id="location"
                name="twiter"
                value={formData.twitter}
                onChange={(e) => setFormData({ ...formData, twitter: e.target.value })}

              />
            </div>
            <div className="flex items-center justify-between">
              <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="submit" >Guardar</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
