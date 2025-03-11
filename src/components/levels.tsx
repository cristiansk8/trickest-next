"use client"; // Marca este componente como un Client Component

import localFont from "next/font/local";
import { useState } from "react";

const myFont = localFont({
  src: "./fonts/blox.woff",
  display: "auto",
});

const GameLevels = () => {
  // Estado para manejar el nivel actual seleccionado
  const [selectedLevel, setSelectedLevel] = useState(1);

  // Datos de ejemplo para los niveles
  const levels = [
    { id: 1, name: "Ollie", unlocked: true },
    { id: 2, name: "Flip", unlocked: true },
    { id: 3, name: "Bonus", unlocked: true },
    { id: 4, name: "", unlocked: false },
    { id: 5, name: "", unlocked: false },
  ];

  return (
    <div className="p-4 bg-[url('/png-big-city.png')] bg-cover bg-repeat bg-bottom min-h-2 flex items-center justify-center">
      <div className="flex flex-col md:flex-row gap-8 justify-center items-center ">
        {levels.map((level) => (
          <div
            key={level.id}
            className={`hover:scale-110 flex flex-col items-center cursor-pointer transition-all ${
              selectedLevel === level.id ? "scale-110" : "scale-100"
            }`}
            onClick={() => {
              if (level.unlocked) {
                setSelectedLevel(level.id);
              }
            }}
          >
            {/* Número del Nivel con Fondo de Estrella */}
            <div className="relative">
              {/* Fondo de Estrella */}
              <svg
                className="w-24 h-24"
                viewBox="0 0 100 100"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M50 0 L61 35 L98 35 L68 57 L79 92 L50 70 L21 92 L32 57 L2 35 L39 35 Z"
                  fill={level.unlocked ? "#FFD700" : "#555"}
                />
              </svg>
              {/* Número */}
              <span
                className={`absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-4xl md:text-5xl text-white ${myFont.className}`}
              >
                {level.id}
              </span>
            </div>

            {/* Caption con Estilo de Banderita */}
            <div className="mt-4 relative">
              {/* Fondo de Banderita */}
              <svg
                className="w-24 h-12"
                viewBox="0 0 100 50"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M0 0 L100 0 L80 25 L100 50 L0 50 Z"
                  fill={level.unlocked ? "#FF6347" : "#777"}
                />
              </svg>
              {/* Texto del Caption */}
              <span
                className={`hover:text-red-600 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-lg md:text-xl text-white ${myFont.className}`}
              >
                {level.name}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default GameLevels;