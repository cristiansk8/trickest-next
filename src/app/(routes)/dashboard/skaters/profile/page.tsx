"use client"; // Asegura que el código solo se ejecute en el cliente

import { useEffect, useState } from 'react';
import LocationSelector from '../../../../../components/LocationSelector'; // Asegúrate de que la ruta sea correcta
import { useSession } from "next-auth/react";
import GeneralInfoForm from './general_info_form';
import SkateSetupPage from './dream_setup';

export default function ProfilePage() {
  const [loading, setLoading] = useState(false);
  const { data: session, status } = useSession();
  const [isClient, setIsClient] = useState(false);
  const [isRegistered, setIsRegistered] = useState(false);
  const [notification, setNotification] = useState(""); // Estado para la notificación
  const [formData, setFormData] = useState({
    facebook: '',
    instagram: '',
    twitter: '',
    tiktok: '',
  });

  // Verifica si estamos en el cliente
  useEffect(() => {
    setIsClient(true);
  }, []);

  // Carga los datos del perfil cuando el usuario está autenticado
  useEffect(() => {
    if (status !== "authenticated" || !session?.user?.email) return;

    const fetchProfile = async () => {
      try {
        setLoading(true);
        const response = await fetch(`/api/skate_profiles/social_media?email=${session.user?.email}`);
        if (!response.ok) throw new Error("No se pudo obtener la información del perfil.");

        const data = await response.json();
        console.log("Datos recibidos:", data);

        // Ajusta la asignación para usar data.socialMedia
        setFormData({
          facebook: data.socialMedia?.facebook || "",
          instagram: data.socialMedia?.instagram || "",
          tiktok: data.socialMedia?.tiktok || "",
          twitter: data.socialMedia?.twitter || "",
        });
      } catch (error) {
        console.error("Error al obtener perfil:", error);
        setNotification("❌ Error al cargar los datos del perfil.");
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [status, session?.user?.email]);

  // Maneja los cambios en los inputs
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Maneja el submit del formulario
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setNotification(""); // Reinicia la notificación antes de enviar

    if (!session?.user) {
      console.error('No estás autenticado');
      setNotification("❌ No estás autenticado.");
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
      setNotification("✅ Configuración actualizada con éxito."); // Notificación de éxito

      // Limpia la notificación después de 5 segundos
      setTimeout(() => {
        setNotification("");
      }, 5000);
    } catch (error) {
      console.error('Error al registrar:', error);
      setNotification("❌ Error al actualizar la configuración."); // Notificación de error
    } finally {
      setLoading(false);
    }
  };

  // Si no estamos en el cliente, muestra un mensaje de carga
  if (!isClient) return <p>Cargando...</p>;

  return (
    <div className="text-black">
      {/* Componente de información general */}
      <GeneralInfoForm />

      {/* Componente de configuración de skate */}
      <SkateSetupPage />

      {/* Notificación */}
      {notification && (
        <div className={`my-4 p-3 rounded-md text-white ${
          notification.includes("✅") ? "bg-green-500" : "bg-red-500"
        }`}>
          {notification}
        </div>
      )}

      {/* Formulario de redes sociales */}
      <div className="text-black">
        <span className="text-xl">Redes sociales</span>
        <form onSubmit={handleSubmit} className="space-y-4 bg-white shadow-md rounded p-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Input de Facebook */}
            <div>
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="facebook">Facebook:</label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                type="text"
                id="facebook"
                name="facebook"
                value={formData.facebook}
                onChange={handleChange}
              />
            </div>

            {/* Input de Instagram */}
            <div>
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="instagram">Instagram:</label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                type="text"
                id="instagram"
                name="instagram"
                value={formData.instagram}
                onChange={handleChange}
              />
            </div>

            {/* Input de TikTok */}
            <div>
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="tiktok">Tiktok:</label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                type="text"
                id="tiktok"
                name="tiktok"
                value={formData.tiktok}
                onChange={handleChange}
              />
            </div>

            {/* Input de Twitter */}
            <div>
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="twitter">X:</label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                type="text"
                id="twitter"
                name="twitter"
                value={formData.twitter}
                onChange={handleChange}
              />
            </div>
          </div>

          {/* Botón de guardar */}
          <div className="flex justify-center">
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="submit"
              disabled={loading}
            >
              {loading ? "Guardando..." : "Guardar"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}