import React from 'react'

interface ModalProps {
    openModal: boolean;
    handleModal: () => void;
    handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
    formData: {
        name: string;
        foto: string;
        phone: string;
        location: string;
        biografia: string;
        redes: string;
    };
    handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export const SkateProfileCompletionModal = ({ openModal, handleModal, handleSubmit, formData, handleChange }: ModalProps) => {
    return (
        openModal && (
            <div className='fixed top-0 left-0 w-full h-full bg-gray-300 flex justify-center items-center'>
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
            </div>
        )
    );
}
