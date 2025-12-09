'use client'

import { useState } from 'react';
import { useSession } from 'next-auth/react';

interface SetPasswordModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

export default function SetPasswordModal({ isOpen, onClose, onSuccess }: SetPasswordModalProps) {
  const { data: session } = useSession();
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    // Validaciones
    if (password.length < 6) {
      setError('La contraseña debe tener al menos 6 caracteres');
      return;
    }

    if (password !== confirmPassword) {
      setError('Las contraseñas no coinciden');
      return;
    }

    setLoading(true);

    try {
      const response = await fetch('/api/auth/set-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: session?.user?.email,
          password,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Error al establecer contraseña');
      }

      onSuccess();
      onClose();
    } catch (err: any) {
      setError(err.message || 'Error al establecer contraseña');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/90 backdrop-blur-sm z-[9999] p-4">
      <div className="w-full max-w-md bg-gradient-to-b from-slate-900 to-black border-4 border-yellow-500 rounded-lg shadow-2xl shadow-yellow-500/50 relative">
        {/* Header */}
        <div className="bg-gradient-to-r from-yellow-600 to-orange-600 p-4 md:p-6 rounded-t-lg border-b-4 border-yellow-300">
          <h2 className="text-xl md:text-2xl font-black text-white uppercase tracking-wider text-center">
            🔒 SEGURIDAD ADICIONAL
          </h2>
          <p className="text-yellow-100 text-xs md:text-sm mt-2 text-center">
            Por seguridad, crea una contraseña para tu cuenta
          </p>
        </div>

        {/* Contenido */}
        <form onSubmit={handleSubmit} className="p-6">
          {error && (
            <div className="mb-4 p-3 bg-red-500 border-4 border-white rounded-lg text-white font-bold text-center text-sm animate-pulse">
              {error}
            </div>
          )}

          <div className="space-y-4">
            {/* Contraseña */}
            <div>
              <label className="block text-yellow-400 font-bold mb-2 uppercase tracking-wide text-sm">
                🔑 Contraseña
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-slate-800 border-4 border-slate-600 rounded-lg py-3 px-4 text-white placeholder-slate-500 focus:border-yellow-500 focus:outline-none transition-all"
                placeholder="Mínimo 6 caracteres"
                required
                disabled={loading}
              />
            </div>

            {/* Confirmar Contraseña */}
            <div>
              <label className="block text-yellow-400 font-bold mb-2 uppercase tracking-wide text-sm">
                🔑 Confirmar Contraseña
              </label>
              <input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="w-full bg-slate-800 border-4 border-slate-600 rounded-lg py-3 px-4 text-white placeholder-slate-500 focus:border-yellow-500 focus:outline-none transition-all"
                placeholder="Repite tu contraseña"
                required
                disabled={loading}
              />
            </div>
          </div>

          {/* Info de seguridad */}
          <div className="mt-4 p-3 bg-blue-900/50 border-2 border-blue-500 rounded-lg">
            <p className="text-blue-200 text-xs text-center">
              ⚠️ Esta contraseña se usará además de tu cuenta de Google para mayor seguridad
            </p>
          </div>

          {/* Botón */}
          <div className="flex justify-center mt-6">
            <button
              type="submit"
              disabled={loading}
              className="bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-400 hover:to-orange-400 text-white font-black py-4 px-12 rounded-lg border-4 border-white uppercase tracking-wider text-lg shadow-2xl transform hover:scale-105 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? '⏳ GUARDANDO...' : '💾 ESTABLECER CONTRASEÑA'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
