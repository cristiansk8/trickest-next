import type { Metadata } from 'next'
import TransitionPage from '@/components/transition-page';
import CoverParticles from '../components/cover-particles';
import Introduction from '@/components/introduction';


export default function Home() {
  return (
    <main>
      <div className="flex min-he-[100vh] h-full">
        <TransitionPage/>
        <Introduction/>
        
      </div>
      <div className='flex flex-col min-he-[100vh] h-full py-5 md:pt-28 text-center'>
        <h1 className='text-xl text-red-700'>Mira la competencia</h1>
        <div className='w-full h-full bg-black'>

        </div>
      </div>
      <div className='pt-28 text-center'>
        como participar
      </div>
      <div className='pt-28 text-center'>
        high scores
      </div>
    </main>
  );
}
