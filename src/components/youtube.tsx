"use client"; // Marca este componente como un Client Component

import { useState } from "react";

const YouTubePlayer = () => {
  // Estado para almacenar el enlace de YouTube
  const [youtubeLink, setYoutubeLink] = useState("");
  // Estado para manejar si el video se ha cargado correctamente
  const [isVideoLoaded, setIsVideoLoaded] = useState(false);

  // Función para extraer el ID del video de YouTube
  const getYouTubeVideoId = (url: string) => {
    const regExp =
      /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
    const match = url.match(regExp);
    return match && match[2].length === 11 ? match[2] : null;
  };

  // ID del video de YouTube
  const videoId = getYouTubeVideoId(youtubeLink);

  // Función para manejar la carga del nivel
  const handleLoadLevel = () => {
    if (videoId) {
      setIsVideoLoaded(true);
    } else {
      alert("Por favor, ingresa un enlace de YouTube válido.");
    }
  };

  return (
    <div className="p-4 bg-black min-h-screen flex flex-col items-center justify-center">
      <h1 className="text-3xl font-bold text-white mb-4">
        Cargar Video de YouTube
      </h1>
      {/* Input para el enlace de YouTube */}
      <input
        type="text"
        placeholder="Pega el enlace de YouTube aquí"
        value={youtubeLink}
        onChange={(e) => setYoutubeLink(e.target.value)}
        className="w-full max-w-md p-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 mb-4"
      />
      {/* Botón para cargar el nivel */}
      <button
        onClick={handleLoadLevel}
        className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 transition-colors"
      >
        Cargar Nivel
      </button>
            {/* Mensaje de éxito */}
            {isVideoLoaded && (
        <div className="mt-6 text-center">
          <p className="text-green-500 text-lg font-semibold">
            ¡Video subido con éxito!
          </p>
          <p className="text-gray-400 mt-2">
            Los jueces se encargarán del resto. ¡Buena suerte!
          </p>
        </div>
      )}
      {/* Reproductor de YouTube */}
      {videoId && (
        <div className="mt-8 w-full max-w-2xl">
          <iframe
            width="100%"
            height="400"
            src={`https://www.youtube.com/embed/${videoId}`}
            title="YouTube video player"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            className="rounded-lg shadow-lg"
          ></iframe>
        </div>
      )}

    </div>
  );
};

export default YouTubePlayer;