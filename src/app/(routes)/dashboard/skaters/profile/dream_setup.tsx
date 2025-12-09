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
        <div className="bg-gradient-to-r from-purple-500 to-pink-500 p-1 rounded-lg shadow-2xl">
            <div className="bg-slate-900 rounded-lg p-6 md:p-8">
                <h2 className="text-2xl md:text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400 uppercase mb-6 text-center md:text-left">
                    🛹 Tu Setup Soñado
                </h2>

                {notification && (
                    <div className={`mb-6 p-4 rounded-lg border-4 border-white text-white font-bold text-center animate-pulse ${notification.includes("Error") ? "bg-red-500" : "bg-green-500"}`}>
                        {notification}
                    </div>
                )}

                {loading && (
                    <div className="text-center py-4">
                        <div className="inline-block animate-spin rounded-full h-8 w-8 border-t-4 border-b-4 border-purple-400"></div>
                        <p className="text-purple-400 mt-2 font-bold">Cargando...</p>
                    </div>
                )}

                <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                    {/* Madero/Deck */}
                    <div className="group">
                        <label className="block text-purple-400 font-bold mb-2 uppercase tracking-wide text-sm md:text-base flex items-center gap-2" htmlFor="madero">
                            <span className="text-xl">🪵</span> Madero / Deck
                        </label>
                        <input
                            className="w-full bg-slate-800 border-4 border-slate-600 rounded-lg py-3 px-4 text-white placeholder-slate-500 focus:border-purple-500 focus:outline-none transition-all group-hover:border-purple-400"
                            type="text"
                            id="madero"
                            name="madero"
                            placeholder="Ej: Element, Baker, Santa Cruz..."
                            value={formData.madero}
                            onChange={handleChange}
                        />
                    </div>

                    {/* Trucks */}
                    <div className="group">
                        <label className="block text-purple-400 font-bold mb-2 uppercase tracking-wide text-sm md:text-base flex items-center gap-2" htmlFor="trucks">
                            <span className="text-xl">🔩</span> Trucks
                        </label>
                        <input
                            className="w-full bg-slate-800 border-4 border-slate-600 rounded-lg py-3 px-4 text-white placeholder-slate-500 focus:border-purple-500 focus:outline-none transition-all group-hover:border-purple-400"
                            type="text"
                            id="trucks"
                            name="trucks"
                            placeholder="Ej: Independent, Thunder, Venture..."
                            value={formData.trucks}
                            onChange={handleChange}
                        />
                    </div>

                    {/* Ruedas */}
                    <div className="group">
                        <label className="block text-purple-400 font-bold mb-2 uppercase tracking-wide text-sm md:text-base flex items-center gap-2" htmlFor="ruedas">
                            <span className="text-xl">⚪</span> Ruedas
                        </label>
                        <input
                            className="w-full bg-slate-800 border-4 border-slate-600 rounded-lg py-3 px-4 text-white placeholder-slate-500 focus:border-purple-500 focus:outline-none transition-all group-hover:border-purple-400"
                            type="text"
                            id="ruedas"
                            name="ruedas"
                            placeholder="Ej: Spitfire, Bones, Ricta..."
                            value={formData.ruedas}
                            onChange={handleChange}
                        />
                    </div>

                    {/* Rodamientos */}
                    <div className="group">
                        <label className="block text-purple-400 font-bold mb-2 uppercase tracking-wide text-sm md:text-base flex items-center gap-2" htmlFor="rodamientos">
                            <span className="text-xl">⚙️</span> Rodamientos
                        </label>
                        <input
                            className="w-full bg-slate-800 border-4 border-slate-600 rounded-lg py-3 px-4 text-white placeholder-slate-500 focus:border-purple-500 focus:outline-none transition-all group-hover:border-purple-400"
                            type="text"
                            id="rodamientos"
                            name="rodamientos"
                            placeholder="Ej: Bones Reds, Bronson..."
                            value={formData.rodamientos}
                            onChange={handleChange}
                        />
                    </div>

                    {/* Tenis */}
                    <div className="group col-span-1 md:col-span-2">
                        <label className="block text-purple-400 font-bold mb-2 uppercase tracking-wide text-sm md:text-base flex items-center gap-2" htmlFor="tenis">
                            <span className="text-xl">👟</span> Zapatos / Tenis
                        </label>
                        <input
                            className="w-full bg-slate-800 border-4 border-slate-600 rounded-lg py-3 px-4 text-white placeholder-slate-500 focus:border-purple-500 focus:outline-none transition-all group-hover:border-purple-400"
                            type="text"
                            id="tenis"
                            name="tenis"
                            placeholder="Ej: Vans, Nike SB, DC Shoes..."
                            value={formData.tenis}
                            onChange={handleChange}
                        />
                    </div>

                    {/* Botón guardar */}
                    <div className="col-span-1 md:col-span-2 flex justify-center mt-6">
                        <button
                            className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-400 hover:to-pink-400 text-white font-black py-4 px-12 rounded-lg border-4 border-white uppercase tracking-wider text-lg shadow-2xl transform hover:scale-105 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                            type="submit"
                            disabled={loading}
                        >
                            {loading ? "⏳ GUARDANDO..." : "💾 GUARDAR"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
