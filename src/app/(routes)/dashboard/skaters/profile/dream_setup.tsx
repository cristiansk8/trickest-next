"use client";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from 'next/navigation';

export default function SkateSetupPage() {
    const { data: session, status } = useSession();
    const [isClient, setIsClient] = useState(false);
    const [loading, setLoading] = useState(true);
    const router = useRouter();
    const [notification, setNotification] = useState("");

    const [formData, setFormData] = useState({
        madero: "",
        trucks: "",
        ruedas: "",
        rodamientos: "",
        tenis: "",
    });

    useEffect(() => {
        setIsClient(true);
    }, []);

    useEffect(() => {
        if (status !== "authenticated" || !session?.user?.email) return;

        const fetchSkateSetup = async () => {
            try {
                const response = await fetch(`/api/skate_profiles/dream_setup?email=${session.user?.email}`);
                if (!response.ok) throw new Error("No se pudo obtener la configuración de skate.");

                const data = await response.json();
                console.log("Datos recibidos:", data);

                setFormData({
                    madero: data.wishSkate?.madero || "",
                    trucks: data.wishSkate?.trucks || "",
                    ruedas: data.wishSkate?.ruedas || "",
                    rodamientos: data.wishSkate?.rodamientos || "",
                    tenis: data.wishSkate?.tenis || "",
                });
            } catch (error) {
                console.error("Error al obtener la configuración:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchSkateSetup();
    }, [status, session?.user?.email]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    if (!isClient) return <p>Cargando...</p>;

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoading(true);
        setNotification("");

        if (!session?.user) {
            setNotification("⚠️ No estás autenticado.");
            setLoading(false);
            return;
        }

        try {
            const response = await fetch('/api/skate_profiles/dream_setup', {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    email: session.user.email,
                    madero: formData.madero,
                    trucks: formData.trucks,
                    ruedas: formData.ruedas,
                    rodamientos: formData.rodamientos,
                    tenis: formData.tenis,
                }),
            });

            const data = await response.json();
            if (data.error) throw new Error(data.error);

            setNotification("✅ Configuración actualizada con éxito.");
            setTimeout(() => {
                setNotification("");
              }, 5000);

        } catch (error) {
            setNotification("❌ Error al actualizar la configuración. Inténtalo de nuevo.");
            console.error('Error:', error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="text-black">
            <span className="text-xl">Setup soñado</span>

            {notification && (
                <div className={`mt-4 p-2 text-white rounded ${notification.includes("Error") ? "bg-red-500" : "bg-green-500"}`}>
                    {notification}
                </div>
            )}

            {loading && <p>Cargando...</p>}

            <form onSubmit={handleSubmit} className="grid grid-cols-2 bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="madero">Madero:</label>
                    <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        type="text" id="madero" name="madero" value={formData.madero} onChange={handleChange} />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="trucks">Trucks:</label>
                    <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        type="text" id="trucks" name="trucks" value={formData.trucks} onChange={handleChange} />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="ruedas">Ruedas:</label>
                    <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        type="text" id="ruedas" name="ruedas" value={formData.ruedas} onChange={handleChange} />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="rodamientos">Rodamientos:</label>
                    <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        type="text" id="rodamientos" name="rodamientos" value={formData.rodamientos} onChange={handleChange} />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="tenis">Tenis:</label>
                    <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        type="text" id="tenis" name="tenis" value={formData.tenis} onChange={handleChange} />
                </div>
                <div className="flex items-center justify-between">
                    <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="submit">Guardar</button>
                </div>
            </form>
        </div>
    );
}
