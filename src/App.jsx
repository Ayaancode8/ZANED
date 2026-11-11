import { useCallback, useState } from 'react';
import HeroSection from './components/HeroSection.jsx';
import BrandIntro from './components/BrandIntro.jsx';

export default function App() {
  const [intro, setIntro] = useState(() => !window.matchMedia('(prefers-reduced-motion: reduce)').matches);
  const [heroReady, setHeroReady] = useState(!intro);
  const prepare = useCallback(() => setHeroReady(true), []);
  const complete = useCallback(() => {
    setHeroReady(true);
    setIntro(false);
  }, []);

  return (
    <>
      <main inert={intro || undefined} aria-hidden={intro || undefined}>
        {heroReady && <HeroSection />}
      </main>
      {intro && <BrandIntro onPrepare={prepare} onComplete={complete} />}
    </>
  );
}
