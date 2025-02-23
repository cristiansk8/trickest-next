import Link from "next/link";

export default function NotFound() {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-slate-900 to-slate-800 text-white">
            <div className="text-center space-y-6">
                <h1 className="text-6xl font-bold text-primary">404</h1>
                <h2 className="text-3xl font-semibold">¡Ups! Skate no encontrado 🛹</h2>
                <p className="text-lg text-slate-300">
                    Parece que el skate que buscas se fue de paseo.
                </p>
                <Link
                    href="/dashboard/skaters"
                    className="inline-block mt-6 px-6 py-3 bg-primary hover:bg-primary/80 text-white font-medium rounded-lg transition-colors"
                >
                    Volver al Dashboard
                </Link>
            </div>
        </div>
    );
}