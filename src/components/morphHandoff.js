import { domToCanvas } from 'modern-screenshot';
import createMorphSlider, { MORPH_SETTINGS } from './MorphSlider.js';

const nextFrame = () => new Promise(resolve => requestAnimationFrame(resolve));

export default function createMorphHandoff(root) {
  const container = root.querySelector('.brand-intro__morph');
  let slider;
  let disposed = false;
  let failed = false;

  return {
    get ready() { return !!slider; },
    get failed() { return failed; },
    async prepare() {
      root.dataset.morphState = 'loading';
      try {
        // React mounts the real hero under the closing crown hold.
        root.dataset.morphStep = 'mount';
        let hero;
        const mountDeadline = performance.now() + 1800;
        while (!disposed && !(hero = root.parentElement.querySelector('.zaned-hero'))) {
          if (performance.now() > mountDeadline) throw new Error('Hero did not mount for the transition');
          await nextFrame();
        }
        if (disposed) return;
        root.dataset.morphStep = 'assets';
        await Promise.all([
          document.fonts.ready,
          ...[...hero.querySelectorAll('img')].map(image => image.decode()),
        ]);
        // Let the existing artwork's intro scramble settle before capturing it.
        await new Promise(resolve => setTimeout(resolve, 650));
        await nextFrame();
        if (disposed) return;
        root.dataset.morphStep = 'capture';
        // Capture WebGL in the same frame as its draw. Reuse those pixels when
        // asynchronous DOM/font embedding would otherwise find cleared buffers.
        const pixels = [...hero.querySelectorAll('canvas')].map(canvas => canvas.toDataURL());
        const incoming = await domToCanvas(hero, {
          scale: Math.min(window.devicePixelRatio || 1, 2),
          backgroundColor: '#f5f6f5',
          timeout: 1800,
          features: { copyScrollbar: false },
          onCloneNode(clone) {
            [...clone.querySelectorAll('img')].filter(image => image.src.startsWith('data:image/png'))
              .forEach((image, index) => { if (pixels[index]) image.src = pixels[index]; });
          },
        });
        if (disposed) return;
        root.dataset.morphStep = 'shader';
        const outgoing = document.createElement('canvas');
        outgoing.width = incoming.width;
        outgoing.height = incoming.height;
        const context = outgoing.getContext('2d');
        const ratio = outgoing.width / root.clientWidth;
        const bounds = root.getBoundingClientRect();
        const crown = root.querySelector('.brand-intro__crown');
        const rect = crown.getBoundingClientRect();
        const image = crown.querySelector('img');
        await image.decode();
        if (disposed) return;
        context.fillStyle = '#fdfdfd';
        context.fillRect(0, 0, outgoing.width, outgoing.height);
        context.drawImage(image, (rect.left - bounds.left) * ratio, (rect.top - bounds.top) * ratio,
          rect.width * ratio, rect.height * ratio);
        // The texture must retain the settled tagline when the live stage hides.
        // Draw its final state even if capture finishes during the letter stagger.
        const tagline = root.querySelector('.brand-intro__tagline');
        const textBounds = tagline.getBoundingClientRect();
        const style = getComputedStyle(tagline);
        const scale = textBounds.width / tagline.offsetWidth;
        context.save();
        context.scale(ratio * scale, ratio * scale);
        context.font = `${style.fontWeight} ${style.fontSize} ${style.fontFamily}`;
        context.letterSpacing = style.letterSpacing;
        context.fillStyle = style.color;
        context.textAlign = 'center';
        const metrics = context.measureText(tagline.textContent);
        const baseline = (parseFloat(style.lineHeight) - metrics.fontBoundingBoxAscent - metrics.fontBoundingBoxDescent) / 2 + metrics.fontBoundingBoxAscent;
        context.fillText(tagline.textContent, (textBounds.left - bounds.left + textBounds.width / 2) / scale,
          (textBounds.top - bounds.top) / scale + baseline);
        context.restore();
        slider = createMorphSlider(container, [outgoing, incoming], () => {
          failed = true;
          root.dataset.morphState = 'fallback';
        });
        root.dataset.morphState = 'ready';
        delete root.dataset.morphStep;
        Object.assign(container.dataset, MORPH_SETTINGS);
      } catch (error) {
        if (!disposed) {
          failed = true;
          root.dataset.morphState = 'fallback';
          console.warn('Morph Slider intro capture failed:', error);
        }
      }
    },
    render(progress) { slider?.render(progress); },
    resize() { slider?.resize(); },
    dispose() {
      disposed = true;
      slider?.dispose();
      slider = null;
      delete root.dataset.morphState;
    },
  };
}
