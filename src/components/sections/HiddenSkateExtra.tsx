import React from 'react';
import Link from 'next/link';

interface HiddenSkateExtraProps {
    // Puedes agregar props según sea necesario
}

export const HiddenSkateExtra = ({ }: HiddenSkateExtraProps) => {
    return (
        <div className="relative">
            {/* Contenido oculto: SkateExtra real */}
            <div className="opacity-50">
                {/* Aquí podrías incluir el contenido real que quieres ocultar, por ejemplo: */}
                <div className="flex flex-col gap-5">
                    <h4 className="text-lg text-lime-500">Equipamiento</h4>
                    <div className="grid grid-cols-2 gap-2 md:grid-cols-4">
                        <div className="flex flex-col text-left">
                            <p className="text-xl">Madero</p>
                            <span>--</span>
                        </div>
                        <div className="flex flex-col text-left">
                            <p className="text-xl">Trucks</p>
                            <span>--</span>
                        </div>
                        <div className="flex flex-col text-left">
                            <p className="text-xl">Ruedas</p>
                            <span>--</span>
                        </div>
                        <div className="flex flex-col text-left">
                            <p className="text-xl">Rodamientos</p>
                            <span>--</span>
                        </div>
                    </div>
                </div>
                {/* Resto del contenido que desees mostrar opaco */}
            </div>

            {/* Overlay absoluto con botón centrado */}
            <div className="absolute max-w-sm mx-auto inset-0 flex items-center justify-center py-36 bg-gray-600 bg-opacity-80">
                <Link href="/api/auth/signin" className="px-6 py-3 bg-purple-700 text-white rounded-md shadow-md hover:bg-primary-dark transition-colors duration-200">
                    Inicia sesión
                </Link>
            </div>
        </div>
    );
}
