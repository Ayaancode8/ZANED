import { useEffect, useRef } from 'react';
import artworkLeft from '../../assets/artwork_left.png';
import artworkMiddle from '../../assets/artwork_in_middle.png';
import artworkRight from '../../assets/artwork_right.png';
import SiteHeader from './SiteHeader.jsx';
import GlassSurface from './GlassSurface.jsx';
import TechText from './TechText.jsx';
import Grainient from './Grainient.jsx';
import GridDistortion from './GridDistortion.jsx';
import './HeroSection.css';

const backgroundColors = ['#f5f6f5', '#e2e6e5', '#bec7c8'];
const artworks = [
  { position: 'left', src: artworkLeft },
  { position: 'middle', src: artworkMiddle },
  { position: 'right', src: artworkRight },
];

export default function HeroSection({ projectHref = null }) {
  const heroRef = useRef(null);

  useEffect(() => {
    const hero = heroRef.current;
    const motion = window.matchMedia('(prefers-reduced-motion: reduce)');
    const pointer = window.matchMedia('(hover: hover) and (pointer: fine)');
    const compact = window.matchMedia('(max-width: 600px)');
    const scene = hero.querySelector('.zaned-hero__scene');
    let targetX = 0;
    let targetY = 0;
    let x = 0;
    let y = 0;
    let time = 0;
    let last = 0;
    let raf = 0;
    let visible = true;
    let reduce = motion.matches;

    const stop = () => {
      cancelAnimationFrame(raf);
      raf = 0;
      last = 0;
      scene.style.removeProperty('will-change');
    };

    const reset = () => {
      stop();
      x = y = targetX = targetY = time = 0;
      scene.style.removeProperty('transform');
      hero.removeAttribute('data-camera');
    };

    const frame = now => {
      raf = 0;
      if (reduce || document.hidden || !visible) return;
      const dt = last ? Math.min((now - last) / 1000, 0.05) : 0;
      last = now;
      time += dt;
      const follow = 1 - Math.exp(-dt * 5);
      x += (targetX - x) * follow;
      y += (targetY - y) * follow;
      const amount = compact.matches ? 0.18 : pointer.matches ? 1 : 0.35;
      const cameraX = (x * 105 + Math.sin(time * 0.22) * 18) * amount;
      const cameraY = (y * 62 + Math.sin(time * 0.27) * 9) * amount;
      const distance = 1200 + Math.sin(time * 0.18) * 16 * amount;
      const yaw = -Math.atan2(cameraX, distance) * 180 / Math.PI;
      const pitch = Math.atan2(cameraY, Math.hypot(cameraX, distance)) * 180 / Math.PI;

      // Inverse camera pose, looking at the scene center. Every object stays fixed
      // in the same 3D world; perspective supplies the parallax and foreshortening.
      scene.style.transform = `translateZ(1200px) rotateX(${pitch}deg) rotateY(${yaw}deg) translate3d(${-cameraX}px, ${-cameraY}px, ${-distance}px)`;
      raf = requestAnimationFrame(frame);
    };

    const wake = () => {
      if (raf || reduce || document.hidden || !visible) return;
      hero.dataset.camera = 'active';
      scene.style.willChange = 'transform';
      raf = requestAnimationFrame(frame);
    };

    const onPointerMove = event => {
      if (!pointer.matches || event.pointerType === 'touch' || reduce || document.hidden || !visible) return;
      const rect = hero.getBoundingClientRect();
      targetX = Math.max(-1, Math.min(1, (event.clientX - rect.left) / Math.max(1, rect.width) * 2 - 1));
      targetY = Math.max(-1, Math.min(1, (event.clientY - rect.top) / Math.max(1, rect.height) * 2 - 1));
    };

    const onPointerLeave = () => { targetX = targetY = 0; };
    const onVisibility = () => {
      stop();
      onPointerLeave();
      wake();
    };
    const onMotionChange = () => {
      reduce = motion.matches;
      reset();
      wake();
    };
    const onPointerChange = () => {
      // A disconnected mouse must not leave a touch device looking off-center.
      x = y = targetX = targetY = 0;
    };
    const intersection = new IntersectionObserver(entries => {
      const onscreen = entries.some(entry => entry.isIntersecting);
      if (onscreen === visible) return;
      visible = onscreen;
      onVisibility();
    });
    intersection.observe(hero);
    hero.addEventListener('pointermove', onPointerMove, { passive: true });
    hero.addEventListener('pointerleave', onPointerLeave);
    hero.addEventListener('pointercancel', onPointerLeave);
    document.addEventListener('visibilitychange', onVisibility);
    motion.addEventListener('change', onMotionChange);
    pointer.addEventListener('change', onPointerChange);
    wake();

    return () => {
      reset();
      intersection.disconnect();
      hero.removeEventListener('pointermove', onPointerMove);
      hero.removeEventListener('pointerleave', onPointerLeave);
      hero.removeEventListener('pointercancel', onPointerLeave);
      document.removeEventListener('visibilitychange', onVisibility);
      motion.removeEventListener('change', onMotionChange);
      pointer.removeEventListener('change', onPointerChange);
    };
  }, []);

  const projectContent = (
    <>
      <span>Start a project</span>
      <span className="zaned-hero__arrow-disc" aria-hidden="true">
        <svg className="zaned-hero__arrow" viewBox="0 0 24 24" focusable="false">
          <path d="M5 19 19 5M5 5h14v14" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="square" />
        </svg>
      </span>
    </>
  );

  return (
    <section ref={heroRef} className="zaned-hero" aria-labelledby="hero-heading">
      <SiteHeader />
      <div className="zaned-hero__viewport">
        <div className="zaned-hero__scene">
          <div className="zaned-hero__backdrop" aria-hidden="true">
            <Grainient
              className="zaned-hero__background"
              colors={backgroundColors}
              angle={115}
              bands={3}
              speed={6}
              flow={2.4}
              scale={1.3}
              silk={0.45}
              grainAmount={0.045}
              grainAnimated={false}
              interactive={false}
              clickSwirl={false}
              intro={false}
              dpr={1}
              aria-hidden="true"
            />
          </div>

          <div className="zaned-hero__content">
            <h1 className="zaned-hero__heading" id="hero-heading" aria-label="Your vision. Made real.">
              {['YOUR VISION.', 'MADE REAL.'].map(line => (
                <span className="zaned-hero__line" aria-hidden="true" key={line}>
                  <TechText text={line} fontSize="inherit" fontWeight={400} letterSpacing={-0.015} align="center" speed={0.5} />
                </span>
              ))}
            </h1>

            <p className="zaned-hero__description">
              <span>We bring strategy, design and technology together</span>{' '}
              <span>to turn ideas into digital experiences that feel like you.</span>
            </p>

            <GlassSurface
              as={projectHref ? 'a' : 'button'}
              className="zaned-hero__cta"
              href={projectHref || undefined}
              type={projectHref ? undefined : 'button'}
            >
              {projectContent}
            </GlassSurface>
          </div>

          <div className="zaned-hero__artworks" aria-hidden="true">
            {artworks.map(({ position, src }) => (
              <div className={`zaned-hero__depth zaned-hero__depth--${position}`} key={position}>
                <div className={`zaned-hero__artwork zaned-hero__artwork--${position}`}>
                  <GridDistortion
                    imageSrc={src}
                    grid={50}
                    radius={0.12}
                    strength={0.3}
                    relaxation={0.9}
                    mode="drag"
                    softness={0}
                    chroma={0.6}
                    idle={0.3}
                    clickRipple
                    intro
                    fetchPriority={position === 'middle' ? 'high' : 'auto'}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
