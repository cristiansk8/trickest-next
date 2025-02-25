import GameIntro from '@/components/GameIntro';
import Header from '@/components/layout/Header';
import Providers from '@/providers/Providers';



export default function Home() {
  return (
    <Providers>
      <Header />
      <main>
        <div className="flex">
          <GameIntro />
        </div>
        {<div className='pt-28 text-center'>
          <div className='flex flex-col h-full py-5 md:pt-28 text-center bg-[#2e2257]'>
            <h1 className='text-slate-200 my-16 text-2xl md:text-4xl font-bold'>Sigue los pasos</h1>
          </div>
        </div>}
      </main>
    </Providers >

  );
}
