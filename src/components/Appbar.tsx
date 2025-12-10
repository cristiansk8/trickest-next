import { Vote } from 'lucide-react';
import Link from 'next/link';
import SigninButton from './SigninButton';

const Appbar = () => {
  return (
    <header className="flex gap-4 p-4 bg-gradient-to-b shadow justify-between items-center w-full">
      <SigninButton />

      {/* Botón de Votación Comunitaria */}
      <Link href="/dashboard/vote">
        <button className="group relative flex items-center gap-2 px-4 md:px-6 py-2 md:py-3 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white font-bold rounded-lg shadow-lg hover:shadow-cyan-500/50 transition-all transform hover:scale-105 border-2 border-cyan-300">
          <Vote className="w-5 h-5 md:w-6 md:h-6 animate-pulse" />
          <span className="hidden md:inline text-sm md:text-base uppercase tracking-wide">
            🗳️ Votar Trucos
          </span>
          <span className="md:hidden text-xs uppercase">Votar</span>

          {/* Badge de "Nuevo" */}
          <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold px-2 py-0.5 rounded-full animate-bounce">
            NUEVO
          </span>
        </button>
      </Link>
    </header>
  );
};

export default Appbar;
