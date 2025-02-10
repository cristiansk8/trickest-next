import { useState, useEffect } from 'react';

interface Departamento {
    id: number;
    departamento: string;
    ciudades: string[];
}

interface LocationSelectorProps {
    selectedCity?: string; // Ciudad seleccionada, opcional
    setSelectedCity: (city: string) => void; // Función para actualizar la ciudad seleccionada
    selectedDepartment: string; // Departamento seleccionado
    setSelectedDepartment: (department: string) => void; // Función para actualizar el departamento seleccionado
}

const LocationSelector: React.FC<LocationSelectorProps> = ({
    selectedCity,
    setSelectedCity,
    selectedDepartment,
    setSelectedDepartment
}) => {
    const [departamentos, setDepartamentos] = useState<Departamento[]>([]); // Departamentos con sus ciudades
    const [cities, setCities] = useState<string[]>([]); // Ciudades disponibles según el departamento seleccionado

    // Cargar departamentos al montar el componente
    useEffect(() => {
        const fetchDepartments = async () => {
            try {
                const response = await fetch('/data/colombia.json'); // Cargar el archivo JSON con los departamentos y ciudades
                const data: Departamento[] = await response.json();
                setDepartamentos(data); // Guardamos los departamentos
            } catch (error) {
                console.error('Error cargando los departamentos:', error);
            }
        };

        fetchDepartments();
    }, []);

    // Actualizar las ciudades solo cuando el departamento seleccionado cambie
    useEffect(() => {
        const department = departamentos.find((dep) => dep.departamento === selectedDepartment);
        if (department) {
            setCities(department.ciudades); // Establecemos las ciudades del departamento seleccionado
        }
    }, [selectedDepartment, departamentos]); // Solo se ejecuta cuando cambia el departamento seleccionado

    return (
        <div>
            {/* Selector de Departamento */}
            <div>
                <label>Departamento</label>
                <select
                    className='block text-gray-700 text-sm font-bold mb-2'
                    value={selectedDepartment}
                    onChange={(e) => setSelectedDepartment(e.target.value)}
                >
                    <option value="">Selecciona un departamento</option>
                    {departamentos.map((departamento) => (
                        <option key={departamento.id} value={departamento.departamento}>
                            {departamento.departamento}
                        </option>
                    ))}
                </select>
            </div>

            {/* Selector de Ciudad */}
            {selectedDepartment && (
                <div>
                    <label>Ciudad</label>
                    <select
                        className='block text-gray-700 text-sm font-bold mb-2'
                        value={selectedCity || ''}
                        onChange={(e) => setSelectedCity(e.target.value)}
                        disabled={cities.length === 0}
                    >
                        <option value="">Selecciona una ciudad</option>
                        {cities.map((city, index) => (
                            <option key={index} value={city}>
                                {city}
                            </option>
                        ))}
                    </select>
                </div>
            )}
        </div>
    );
};

export default LocationSelector;
