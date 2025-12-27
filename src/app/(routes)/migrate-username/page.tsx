'use client';

import { useSession, signOut } from 'next-auth/react';
import { useState } from 'react';

export default function MigrateUsernamePage() {
  const { data: session, status } = useSession();
  const [result, setResult] = useState<string>('');
  const [loading, setLoading] = useState(false);

  const handleMigrate = async () => {
    setLoading(true);
    setResult('');

    try {
      const response = await fetch('/api/auth/migrate-username', {
        method: 'POST',
      });

      const data = await response.json();

      if (data.error) {
        setResult(`❌ Error: ${data.error}`);
      } else {
        setResult(`✅ ${data.message}\nUsername: @${data.username}\n\n${data.instructions || ''}`);
      }
    } catch (error) {
      setResult(`❌ Error: ${error instanceof Error ? error.message : 'Error desconocido'}`);
    } finally {
      setLoading(false);
    }
  };

  if (status === 'loading') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center">
        <div className="text-white text-xl">Cargando...</div>
      </div>
    );
  }

  if (!session) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center p-4">
        <div className="bg-slate-800 border-4 border-red-500 rounded-lg p-8 max-w-md">
          <h1 className="text-2xl font-black text-red-400 mb-4 uppercase">⚠️ No Autenticado</h1>
          <p className="text-white mb-4">Debes iniciar sesión para usar esta herramienta.</p>
          <a
            href="/"
            className="bg-gradient-to-r from-cyan-500 to-blue-500 text-white font-bold py-3 px-6 rounded-lg border-4 border-white uppercase inline-block hover:scale-105 transition-transform"
          >
            Ir al Inicio
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center p-4">
      <div className="bg-slate-800 border-4 border-cyan-500 rounded-lg p-8 max-w-2xl w-full shadow-2xl">
        <h1 className="text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-400 mb-6 uppercase text-center">
          🔧 Migración de Username
        </h1>

        <div className="bg-slate-700 border-2 border-slate-600 rounded-lg p-4 mb-6">
          <p className="text-white mb-2">
            <strong>Email:</strong> {session.user.email}
          </p>
          <p className="text-white mb-2">
            <strong>Nombre:</strong> {session.user.name || 'No definido'}
          </p>
          <p className="text-white">
            <strong>Username actual:</strong> {session.user.username || '❌ No asignado'}
          </p>
        </div>

        <div className="bg-yellow-900 border-4 border-yellow-500 rounded-lg p-4 mb-6">
          <h2 className="text-yellow-400 font-bold mb-2 uppercase">⚠️ Importante</h2>
          <p className="text-yellow-100 text-sm">
            Si no tienes un username asignado, no podrás ver challenges ni enviar submissions.
            Esta herramienta asignará un username único automáticamente.
          </p>
        </div>

        <div className="flex flex-col gap-4">
          <button
            onClick={handleMigrate}
            disabled={loading}
            className="bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-400 hover:to-blue-400 text-white font-black py-4 px-8 rounded-lg border-4 border-white uppercase tracking-wider text-lg shadow-2xl transform hover:scale-105 transition-all disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
          >
            {loading ? '⏳ Procesando...' : '🚀 Asignar Username'}
          </button>

          {result && (
            <div className={`border-4 rounded-lg p-4 ${
              result.includes('❌')
                ? 'bg-red-900 border-red-500 text-red-100'
                : 'bg-green-900 border-green-500 text-green-100'
            }`}>
              <pre className="whitespace-pre-wrap font-mono text-sm">{result}</pre>

              {result.includes('✅') && (
                <button
                  onClick={() => signOut({ callbackUrl: '/' })}
                  className="mt-4 bg-white text-slate-900 font-bold py-2 px-6 rounded-lg uppercase hover:bg-slate-200 transition-colors"
                >
                  🚪 Cerrar Sesión
                </button>
              )}
            </div>
          )}
        </div>

        <div className="mt-8 text-center">
          <a
            href="/dashboard/skaters/challenges"
            className="text-cyan-400 hover:text-cyan-300 underline"
          >
            ← Volver al Dashboard
          </a>
        </div>
      </div>
    </div>
  );
}
