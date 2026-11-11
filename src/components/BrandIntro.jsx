import { useEffect, useRef } from 'react';
import crown from '../../assets/logo/symbol-shaded.svg';
import unbserved from '../../assets/intro/unbserved.mp4';
import hedrabionics from '../../assets/intro/hedrabionics.mp4';
import yzavoku from '../../assets/intro/yzavoku.mp4';
import circusofartifice from '../../assets/intro/circusofartifice.mp4';
import unbservedPoster from '../../assets/intro/unbserved.png';
import hedrabionicsPoster from '../../assets/intro/hedrabionics.png';
import yzavokuPoster from '../../assets/intro/yzavoku.png';
import circusofartificePoster from '../../assets/intro/circusofartifice.png';
import image1 from '../../assets/intro/image_1.png';
import image2 from '../../assets/intro/image_2.png';
import image3 from '../../assets/intro/image_3.png';
import image4 from '../../assets/intro/image_4.png';
import image5 from '../../assets/intro/image_5.png';
import image6 from '../../assets/intro/image_6.png';
import image7 from '../../assets/intro/image_7.png';
import createMorphHandoff from './morphHandoff.js';
import { MORPH_SETTINGS } from './MorphSlider.js';
import './BrandIntro.css';

export const INTRO_DURATION = 7038;
export const INTRO_TRANSITION_DURATION = MORPH_SETTINGS.duration;
const TOTAL = INTRO_DURATION + INTRO_TRANSITION_DURATION;
const SETTLE = 'cubic-bezier(0.22, 1, 0.36, 1)';
const TAGLINE = 'Websites that refuse to blend in.';
const TAGLINE_START = 4800;
const TAGLINE_FLIP = 1100;
const TAGLINE_SETTLE = 200;

// Slot dimensions and replacement order follow the reference's 720 × 900 frame.
// A letter disappears where its tile arrives; the three extra tiles open the row.
const tiles = [
  { src: unbserved, poster: unbservedPoster, shape: 'portrait', height: 100, at: 2460, letter: 0, end: 4230 },
  { src: hedrabionics, poster: hedrabionicsPoster, shape: 'circle', height: 52, at: 2260, letter: 1, end: 4560 },
  { src: image1, shape: 'square', height: 52, at: 1900, letter: 2, end: 4620 },
  { src: image2, shape: 'portrait', height: 100, at: 2540, letter: 3, end: 4260 },
  { src: yzavoku, poster: yzavokuPoster, shape: 'circle', height: 52, at: 2150, letter: 4, end: 4510 },
  { src: image6, shape: 'landscape', height: 42, at: 2620, end: 4220 },
  { src: image5, shape: 'portrait', height: 100, at: 2640, end: 4220 },
  { src: image7, shape: 'circle', height: 52, at: 2660, end: 4520 },
  { src: circusofartifice, poster: circusofartificePoster, shape: 'square', height: 52, at: 300, letter: 5, end: 4230 },
  { src: image3, shape: 'cutout', height: 88, at: 880, letter: 6, end: 4680 },
  { src: image4, shape: 'circle', height: 52, at: 1500, letter: 7, end: 4230 },
];
const letters = [...'ZANEDinc'];
const progress = (time, start) => {
  const t = Math.max(0, Math.min(1, (time - start) / 160));
  return 1 - (1 - t) ** 3;
};

export default function BrandIntro({ onPrepare, onComplete }) {
  const rootRef = useRef(null);

  useEffect(() => {
    const root = rootRef.current;
    const stage = root.querySelector('.brand-intro__stage');
    const glyphs = [...root.querySelectorAll('.brand-intro__letter')];
    const cards = [...root.querySelectorAll('.brand-intro__tile')];
    const videos = [...root.querySelectorAll('video')];
    const morph = createMorphHandoff(root);
    const motion = window.matchMedia('(prefers-reduced-motion: reduce)');
    const previousOverflow = document.body.style.overflow;
    const animations = [];
    let disposed = false;
    let completed = false;
    let prepared = false;
    let started = false;
    let clock;
    let transitionFrame = 0;
    let waiting = false;
    let waitingTracks = [];
    let loadingDeadline;

    const drawTransition = () => {
      transitionFrame = 0;
      if (disposed || completed || document.hidden) return;
      const progress = Math.max(0, Math.min(1, (clock.currentTime - INTRO_DURATION) / INTRO_TRANSITION_DURATION));
      if (progress > 0) {
        if (morph.failed) { finish(); return; }
        if (morph.ready) {
          root.dataset.transition = 'morph';
          morph.render(progress);
        } else if (!waiting) {
          // A slow first capture may extend the crown hold, never expose an
          // unloaded texture. This deadline is loading protection, not timing.
          waiting = true;
          waitingTracks = animations.filter(animation => animation.playState === 'running');
          waitingTracks.forEach(animation => animation.pause());
          loadingDeadline = window.setTimeout(finish, 1800);
        }
      }
      transitionFrame = requestAnimationFrame(drawTransition);
    };

    const prepare = () => {
      if (disposed || prepared) return;
      prepared = true;
      onPrepare();
      if (!completed) morph.prepare().then(() => {
        if (disposed || completed) return;
        window.clearTimeout(loadingDeadline);
        if (morph.failed && waiting) { finish(); return; }
        waiting = false;
        if (!document.hidden) waitingTracks.forEach(animation => animation.play());
        waitingTracks = [];
      });
    };
    const finish = () => {
      if (disposed || completed) return;
      completed = true;
      cancelAnimationFrame(transitionFrame);
      window.clearTimeout(loadingDeadline);
      morph.dispose();
      videos.forEach(video => video.pause());
      prepare();
      onComplete();
    };
    const resize = () => {
      root.style.setProperty('--intro-scale', Math.min(root.clientWidth / 720, root.clientHeight / 900));
      morph.resize();
    };
    const observer = new ResizeObserver(resize);
    observer.observe(root);
    resize();
    document.body.style.overflow = 'hidden';

    const animate = (node, keyframes, duration = TOTAL, delay = 0) => {
      const animation = node.animate(keyframes, { duration, delay, fill: 'both' });
      animation.pause();
      animation.currentTime = 0;
      animations.push(animation);
      return animation;
    };
    const syncVisibility = () => {
      if (!started || completed || disposed) return;
      window.clearTimeout(loadingDeadline);
      if (!document.hidden && waiting) loadingDeadline = window.setTimeout(finish, 1800);
      cancelAnimationFrame(transitionFrame);
      transitionFrame = document.hidden ? 0 : requestAnimationFrame(drawTransition);
      animations.forEach(animation => {
        if (animation.playState === 'finished') return;
        if (document.hidden) {
          const time = animation.currentTime;
          animation.pause();
          animation.currentTime = time;
        } else if (!waiting) animation.play();
      });
      videos.forEach(video => {
        if (document.hidden || clock.currentTime >= 4800) video.pause();
        else video.play()?.catch(() => {}); // The poster stays visible if autoplay is blocked.
      });
    };
    const onKey = event => {
      if (event.key === 'Escape') finish();
    };
    const onMotion = () => { if (motion.matches) finish(); };

    const start = () => {
      if (disposed || completed || started) return;
      if (motion.matches || !root.animate) { finish(); return; }
      started = true;

      const widths = glyphs.map(glyph => glyph.getBoundingClientRect().width /
        Math.min(root.clientWidth / 720, root.clientHeight / 900));
      // The small suffix follows D's upper-right corner, outside the baseline row.
      const suffixX = (positions, letter) => positions[4].x + widths[4] + 12 +
        widths.slice(5, letter).reduce((sum, width) => sum + width, 0);
      const layout = time => {
        const weights = tiles.map(tile => progress(time, tile.at));
        const pitches = tiles.map((tile, index) => {
          const original = tile.letter === undefined || tile.letter >= 5 ? 0 : widths[tile.letter];
          return original + (64 - original) * weights[index];
        });
        let x = 360 - pitches.reduce((sum, pitch) => sum + pitch, 0) / 2;
        return pitches.map((pitch, index) => {
          const position = { x, center: x + pitch / 2, weight: weights[index] };
          x += pitch;
          return position;
        });
      };
      const times = [...new Set([0, ...tiles.flatMap(tile => [tile.at, tile.at + 80, tile.at + 160]), 2800])].sort((a, b) => a - b);
      const frames = times.map(time => ({ time, positions: layout(time) }));

      tiles.forEach((tile, index) => {
        const final = layout(2800)[index];
        const side = index < 5 ? -1 : 1;
        const targetX = 360 + side * 32 - 26;
        const targetY = 470 - tile.height / 2;
        animate(cards[index], [
          ...frames.map(({ time, positions }) => {
            const { center, weight } = positions[index];
            const fromX = tile.letter >= 5 ? suffixX(positions, tile.letter) + widths[tile.letter] / 2 - 26 : center - 26;
            const x = fromX + (center - 26 - fromX) * weight;
            const y = tile.letter >= 5 ? 404 + (432 - 404) * weight : 432;
            return { offset: time / TOTAL, opacity: weight,
              transform: `translate3d(${x}px, ${y}px, 0) scale(${0.55 + weight * 0.45})` };
          }),
          { offset: 4100 / TOTAL, opacity: 1, transform: `translate3d(${final.center - 26}px, 432px, 0) scale(1)`, easing: SETTLE },
          { offset: tile.end / TOTAL, opacity: 0, transform: `translate3d(${targetX}px, ${targetY}px, 0) rotate(${side * -16}deg) scale(0.35)` },
          { offset: 1, opacity: 0, transform: `translate3d(${targetX}px, ${targetY}px, 0) scale(0.35)` },
        ]);
        if (tile.letter !== undefined) {
          const y = tile.letter < 5 ? 402 : 404;
          const glyphX = positions => tile.letter < 5 ? positions[index].x : suffixX(positions, tile.letter);
          animate(glyphs[tile.letter], [
            ...frames.map(({ time, positions }) => ({
              offset: time / TOTAL,
              opacity: 1 - positions[index].weight,
              transform: `translate3d(${glyphX(positions)}px, ${y}px, 0)`,
            })),
            { offset: 1, opacity: 0, transform: `translate3d(${glyphX(layout(2800))}px, ${y}px, 0)` },
          ]);
        }
      });

      root.querySelectorAll('.brand-intro__crown-half').forEach((half, index) => {
        const side = index === 0 ? -1 : 1;
        const arrival = index === 0 ? 4290 : 4490;
        animate(half, [
          { offset: 0, opacity: 0, transform: `translate3d(${side * 54}px, ${index * 22}px, 0) rotate(${side * 12}deg) scale(0.8, 0.9)` },
          { offset: arrival / TOTAL, opacity: 0, transform: `translate3d(${side * 54}px, ${index * 22}px, 0) rotate(${side * 12}deg) scale(0.8, 0.9)`, easing: SETTLE },
          { offset: (arrival + 180) / TOTAL, opacity: 1, transform: `translate3d(${side * 30}px, ${index * 12}px, 0) rotate(${side * 9}deg) scale(0.9, 1)`, easing: SETTLE },
          { offset: 5400 / TOTAL, opacity: 1, transform: 'translate3d(0, 0, 0) rotate(0deg) scale(1)' },
          { offset: 1, opacity: 1, transform: 'translate3d(0, 0, 0) rotate(0deg) scale(1)' },
        ]);
      });
      // React Bits SplitText's flip: bottom-origin -90° rotation, six-em
      // perspective and power3.out arrival, in the site's existing ink color.
      // Fit the whole stagger into the shared clock, leaving 200ms before melt.
      const characters = [...root.querySelectorAll('.brand-intro__tagline-char')];
      const stagger = (INTRO_DURATION - TAGLINE_SETTLE - TAGLINE_START - TAGLINE_FLIP) / (characters.length - 1);
      characters.forEach((character, index) => {
        const at = TAGLINE_START + index * stagger;
        animate(character, [
          { opacity: 0, transform: 'perspective(192px) rotateX(-90deg)', easing: 'cubic-bezier(0.165, 0.84, 0.44, 1)' },
          { opacity: 1, transform: 'perspective(192px) rotateX(0deg)' },
        ], TAGLINE_FLIP, at);
      });
      const preparation = animate(stage, [{ opacity: 1 }, { opacity: 1 }], 5400);
      preparation.onfinish = prepare;
      const mediaEnd = animate(stage, [{ visibility: 'visible' }, { visibility: 'visible' }], 4800);
      mediaEnd.onfinish = () => videos.forEach(video => video.pause());
      clock = animate(root, [{ opacity: 1 }, { opacity: 1 }]);
      clock.onfinish = finish;
      // All tracks share one document-timeline origin; no independent timers can drift.
      const origin = document.timeline.currentTime;
      animations.forEach(animation => { animation.play(); animation.startTime = origin; });
      root.dataset.ready = 'true';
      syncVisibility();
    };

    document.addEventListener('keydown', onKey);
    document.addEventListener('visibilitychange', syncVisibility);
    motion.addEventListener('change', onMotion);
    // Measure the static and animated lockups in the site's own fonts.
    // The deadline keeps loading bounded; a failed font skips to the site.
    const fontDeadline = window.setTimeout(start, 1000);
    const fonts = ['400 96px "Anton"', '400 26px "Space Grotesk"', '400 32px "Belleza"'];
    Promise.all(fonts.map(font => document.fonts?.load(font))).then(start, finish);

    return () => {
      disposed = true;
      cancelAnimationFrame(transitionFrame);
      window.clearTimeout(loadingDeadline);
      morph.dispose();
      window.clearTimeout(fontDeadline);
      animations.forEach(animation => { animation.onfinish = null; animation.cancel(); });
      videos.forEach(video => video.pause());
      observer.disconnect();
      document.body.style.overflow = previousOverflow;
      document.removeEventListener('keydown', onKey);
      document.removeEventListener('visibilitychange', syncVisibility);
      motion.removeEventListener('change', onMotion);
      delete root.dataset.ready;
      delete root.dataset.transition;
    };
  }, [onPrepare, onComplete]);

  return (
    <div ref={rootRef} className="brand-intro" role="img" aria-label={`ZANED inc. ${TAGLINE} Press Escape to skip.`}>
      <div className="brand-intro__surface">
        <div className="brand-intro__stage" aria-hidden="true">
          <span className="brand-intro__wordmark">
            {[...'ZANED'].map(letter => <span className="brand-intro__wordmark-glyph" key={letter}>{letter}</span>)}
            <span className="brand-intro__suffix">inc</span>
          </span>
          {letters.map((letter, index) => (
            <span className={`brand-intro__letter ${index < 5 ? 'brand-intro__letter--wordmark' : 'brand-intro__suffix'}`} key={letter}>{letter}</span>
          ))}
          {tiles.map((tile, index) => (
            <div className={`brand-intro__tile brand-intro__tile--${tile.shape}`} style={{ height: tile.height }} key={index}>
              <img src={tile.poster || tile.src} alt="" decoding="async" draggable="false" />
              {tile.poster && <video src={tile.src} poster={tile.poster} muted playsInline loop preload="auto" tabIndex={-1}
                onError={event => { event.currentTarget.style.visibility = 'hidden'; }} />}
            </div>
          ))}
          <div className="brand-intro__crown">
            <img className="brand-intro__crown-half brand-intro__crown-half--left" src={crown} alt="" draggable="false" />
            <img className="brand-intro__crown-half brand-intro__crown-half--right" src={crown} alt="" draggable="false" />
          </div>
          <p className="brand-intro__tagline">
            {TAGLINE.split(' ').map((word, index) => (
              <span className="brand-intro__tagline-word" key={index}>
                {index > 0 && ' '}
                {[...word].map((character, i) => <span className="brand-intro__tagline-char" key={i}>{character}</span>)}
              </span>
            ))}
          </p>
        </div>
      </div>
      <div className="brand-intro__morph" aria-hidden="true" />
    </div>
  );
}
