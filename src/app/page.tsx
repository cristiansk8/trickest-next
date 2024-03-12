import type { Metadata } from 'next'
import TransitionPage from '@/components/transition-page';
import CoverParticles from '../components/cover-particles';
import Introduction from '@/components/introduction';



export default function Home() {
  return (
    <main>
      <div className="flex min-he-[100vh] h-full bg-no-gradient-cover">
        <TransitionPage/>
        <CoverParticles/>
        <Introduction/>
      </div>
    </main>
  );
}
