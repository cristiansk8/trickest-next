import type { Metadata } from 'next'
import TransitionPage from '@/components/transition-page';
import Introduction from '@/components/introduction';
import GalerryLevels from '@/components/GalerryLevels';
import { FaMagnifyingGlass } from "react-icons/fa6";
import HowWin from '@/components/howToWin';
import HighScore from '@/components/highScore';
import Footer from '@/components/footer';
import Partners from '@/components/partners/partners';


export default function Home() {
  return (
    <main>
      <div className="flex">
        <TransitionPage />
        <Introduction />
      </div>
      <div className='pt-28 text-center'>
        <h1 className='text-slate-200 my-16 text-2xl md:text-4xl font-bold'>High Scores</h1>
        <HighScore />
      </div>
      <div className='pt-28 text-center'>
        <div className='flex flex-col h-full py-5 md:pt-28 text-center bg-[#2e2257]'>
          <h1 className='text-slate-200 my-16 text-2xl md:text-4xl font-bold'>Sigue los pasos</h1>
          <HowWin />
        </div>
      </div>
      <div className='pt-28 text-center'>
        <div className='flex flex-col h-full py-5 md:pt-28 text-center bg-black'>
          <h1 className='text-slate-200 my-6 text-2xl md:text-4xl font-bold'>Chequea la competencia</h1>
          <div className='px-7 mb-2 md:mb-12 md:w-full md:max-w-3xl md:mx-auto'>
            <ul className='flex flex-row bg-white text-black px-4 justify-between md:justify-start md:gap-5 '>
              <li className='my-2 text-sm md:text-2xl font-bold'>Todos</li>
              <li className='my-2 text-sm md:text-2xl font-bold'>Mas Likes</li>
              <li className='my-2 text-sm md:text-2xl font-bold'>Mas Recientes</li>
              <li className='my-2 text-sm md:text-2xl font-bold flex flex-row'>
                <FaMagnifyingGlass />
                <div className='hiden md:block border-2 border-black w-64 h-10 mx-auto'></div>
              </li>
            </ul>
          </div>
          <GalerryLevels />
          <div className='hidden md:flex'>
            <GalerryLevels />
          </div>
        </div>
      </div>
      <div>
      <Partners />
      </div>
      <div>
        <Footer />
      </div>
    </main>
  );
}
