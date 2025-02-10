// SkateProfileCompletionModal.tsx
import { useState } from 'react';
import { useSession } from 'next-auth/react';
import LocationSelector from './LocationSelector';

interface ModalProps {
    openModal: boolean;
    handleModal: () => void;
}

const SkateProfileCompletionModal: React.FC<ModalProps> = ({ openModal, handleModal }) => {
    const [formData, setFormData] = useState({ phone: '', ciudad: '', departamento: '' });
    const [loading, setLoading] = useState(false);
    const [isRegistered, setIsRegistered] = useState(false);
    const { data: session } = useSession();

    const [selectedCity, setSelectedCity] = useState<string>(''); // Ciudad seleccionada
    const [selectedDepartment, setSelectedDepartment] = useState<string>(''); // Departamento seleccionado

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

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
                    email: session.user.email,
                    name: session.user.name,
                    phone: formData.phone,
                    ciudad: formData.ciudad,
                    departamento: formData.departamento,
                    photo: session.user.image,
                }),
            });

            const data = await response.json();
            if (data.error) throw new Error(data.error);

            console.log('Registro exitoso:', data);
            setIsRegistered(true);
            handleModal();
        } catch (error) {
            console.error('Error al registrar:', error);
        } finally {
            setLoading(false);
        }
    };

    if (!openModal) return null;

    return (
        <div className='fixed top-0 left-0 w-full h-full bg-gray-300 flex justify-center items-center z-50'>
            <div className='max-w-[460px] bg-white shadow-lg py-2 rounded-md'>
                <h2 className='text-sm font-medium text-gray-900 border-b border-gray-300 py-3 px-4 mb-4'>
                    Completa tu registro
                </h2>
                <form onSubmit={handleSubmit} className='space-y-4 px-4 pb-4'>
                    <div>
                        <label className='block text-gray-700 text-sm font-bold mb-2'>Teléfono:</label>
                        <input
                            type='tel'
                            name='phone'
                            value={formData.phone}
                            onChange={handleChange}
                            className='w-full px-3 py-2 border rounded shadow-sm focus:outline-none'
                            required
                        />
                    </div>
                    <div>
                        <label className='block text-gray-700 text-sm font-bold mb-2'>Ubicación:</label>
                        <LocationSelector
                            selectedCity={selectedCity}
                            setSelectedCity={(city) => {
                                setSelectedCity(city); // Actualizamos ciudad seleccionada
                                setFormData({ ...formData, ciudad: city });
                            }}
                            selectedDepartment={selectedDepartment}
                            setSelectedDepartment={(department) => {
                                setSelectedDepartment(department); // Actualizamos departamento seleccionado
                                setFormData({ ...formData, departamento: department });
                            }}
                        />
                    </div>
                    <button
                        type='submit'
                        className='w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'
                        disabled={loading}
                    >
                        {loading ? 'Cargando...' : 'Enviar'}
                    </button>
                </form>
                <div className='border-t border-gray-300 flex justify-between items-center px-4 pt-2'>
                    <button type='button' className='h-8 px-2 text-sm rounded-md bg-gray-700 text-white' onClick={handleModal}>
                        Cerrar
                    </button>
                </div>
            </div>
        </div>
    );
};

export default SkateProfileCompletionModal;


