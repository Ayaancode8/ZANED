# ZANED

A React hero with the supplied ZANED identity and a custom composition of three artworks. Built with Vite and plain CSS.

## Brand intro

Every fresh page load begins with the supplied reference's 7.038-second sequence,
followed by a two-second React Bits Morph Slider melt into the hero. The opening name is **ZANED inc**; all seven
images and four videos from `assets/motion_assets/` become the media row, which
collapses into `assets/logo/symbol-shaded.svg`. Playback is silent and pauses in
hidden tabs. Escape skips the sequence. Reduced motion bypasses it, including
when the preference changes during playback. Failed or blocked videos retain
their poster images and never block the website.

The opening ZANED logo uses `artifacts/word_mark/logo.svg` unchanged. A small,
regular-weight “inc” sits beside D’s upper-right corner. The original SVG letter
groups preserve the progressive letter-to-media animation.

The intro uses the browser's Web Animations API. The closing handoff uses the
user-selected [React Bits Morph Slider](https://reactbits.dev/components/morph-slider)
shader, with `melt`, 2000ms, `power2.inOut`, intensity `0.7`, and noise scale `10`.
Aberration, drift, and vignette opacity are `0` so the monochrome composition
lands cleanly. `src/components/MorphSlider.js` retains the official shaders and
uses OGL; the existing timeline drives progress instead of adding GSAP or carousel
controls. Modern Screenshot captures the actual hero during the crown hold,
including its fonts, glass, perspective, and canvas pixels. A slow capture extends
the crown hold for at most 1800ms; capture failure, lost or unavailable WebGL skips
to the live hero. Rendering pauses in hidden tabs and releases GPU resources on
completion or skip.
The hero mounts during the closing crown hold and remains inaccessible until the
intro disappears. Source media remains unchanged. The 15 derived media files in
`assets/intro/` total about 1.25 MB; each video is a silent 4.2-second H.264 clip at
30fps. To regenerate them with the installed Pillow and GStreamer Python bindings:

```sh
python3 scripts/prepare-intro-assets.py
```

With the dev server running, open `/checks/brand-intro.html` and select **Run
checks** for lifecycle, timing, visibility, fallback, keyboard, and Strict Mode
checks. Its frame controls show reproducible intro and morph checkpoints; **Play
handoff** previews just the closing morph and **Export handoff** records its actual
shader pixels as WebM. Press **C** to restore controls after a frame is displayed.

## Run locally

```sh
npm install
npm run dev
```

```sh
npm run build
npm run preview
```

## Extend the website

- Add the next sections below `HeroSection` in `src/App.jsx`.
- Set the navigation URLs in `src/components/SiteHeader.jsx` to turn the enabled preview buttons into links.
- Pass a real destination to `<HeroSection projectHref="/contact" />` to turn the enabled project button into a link.
- The hero and header have scoped class names. Shared colors and fonts live in `src/styles/base.css`.

The hero centers the headline, supporting copy, and project button above a large front-facing portrait and two outward-facing profiles staggered at different heights. Profile spacing is constrained by the artwork height as well as its width, keeping the three portraits connected on wide desktop screens. It uses `artwork_left.png`, `artwork_in_middle.png`, and `artwork_right.png` together. The previous artwork is no longer rendered. All three cutouts now use the supplied React Bits GridDistortion effect: a crisp 50-cell grid with radius 0.12, drag strength 0.3, relaxation 0.9, RGB splitting (chroma 0.6), click ripples, a settling intro, and idle movement (0.3). The shader preserves PNG transparency. Artwork renders at 2× resolution on standard screens and at the native density of retina screens, capped at 3×. Fractional layout sizes are preserved, and resizing updates the drawing buffer without stretching a low-resolution canvas. Original images remain available when WebGL is unavailable or lost, and reduced motion shows the static originals. Rendering pauses while hidden or offscreen. Fonts are self-hosted under `assets/fonts/`, with redistribution licenses in `public/licenses/`. Anton supplies the heavy, compressed uppercase headline; Belleza supplies thin, subtly flared description lettering and regular-weight control labels (16px navigation and 17px project button). These open fonts approximate the requested Arizona Flare styles; licensed Arizona files were unavailable. Space Grotesk remains for the intro suffix. Both headline lines use the supplied React Bits TechText effect with matching Anton glyphs and tracking in canvas and static fallback. Pointer outlines, particles, letter dragging, click springs, and idle sweeps render on canvas; accessible heading text and a static DOM fallback remain available. Reduced-motion preferences disable the effect, and animation pauses when the page is hidden or the text leaves the viewport. Inline headline canvases span the viewport with 64px bleed, so dragged letters and their selection frames remain visible beyond the original line bounds. Canvas origins are measured from the headline to preserve alignment under camera movement; springs and pointer capture remain unchanged.

The header keeps the navigation horizontally centered and the standalone ZANED crown aligned beside it on every screen size. The emblem is 48px wide on desktop, 40px on tablets, and 32px on phones; compact navigation spacing keeps all three labels visible without a second logo row. The hero fits one viewport (`100svh`); all screen sizes stack the centered text above the artwork. Short landscape screens place the headline phrases on one line, and the artwork scales to the remaining height. Font licenses in `public/licenses/` are also included in production builds.

The current phase intentionally has no backend, extra routes, or deployment configuration.

The navbar and project CTA use a local JavaScript/plain-CSS adaptation of [React Bits Glass Surface](https://reactbits.dev/components/glass-surface). It keeps the SVG refraction path, creates unique filter IDs, and updates the capsule map when its size changes. Safari and Firefox use a frosted blur fallback; browsers without backdrop filters use a solid surface. No runtime dependencies or WebGL canvases were added. All preview controls respond to hover, keyboard focus, and presses while keeping the visitor on the hero. Reduced motion removes their transforms and transitions. Start the dev server and open `/checks/glass-surface.html`, then select “Run checks” to verify enabled preview controls, `projectHref`, unique filters, frosted fallback, resizing, and motion/fallback rules.

To run the GridDistortion browser checks, start the dev server and open `/checks/grid-distortion.html`, then select “Run checks”. They exercise real WebGL pixels, transparency, pointer movement, RGB splitting, click ripples, live reduced motion, page visibility, context loss, and the unavailable-WebGL fallback inside React Strict Mode.

Open `/checks/tech-text.html` and select “Run checks” to verify that animation measurement labels and guides retain normal character spacing at desktop and phone headline sizes, independently of the headline's tight tracking.

The palette follows the monochrome artwork: cool paper white, silver, and graphite with charcoal type. The hero background is the official [React Bits Grainient](https://reactbits.dev/backgrounds/grainient) component, included locally without extra runtime dependencies. Three flowing bands (speed 6, flow 2.4) make the background movement visible within a few seconds, with fine static grain, pointer stirring and click swirls disabled. Background rendering pauses in hidden tabs and offscreen, and freezes for reduced-motion preferences (including live changes). A matching CSS gradient is the fallback when WebGL is unavailable or lost. React Bits' license is included in `public/licenses/react-bits.txt`.


The hero now uses a shared CSS 3D scene and one moving camera. The headline and
portraits stay at fixed depths; camera orbit and a gentle dolly create the
perspective change. The navigation remains anchored. Camera movement reduces on
phones, pauses offscreen or in hidden tabs, and stops for reduced motion.
Headline dragging maps pointer positions back into the scene. No dependencies
were added.

Open `/checks/hero-camera.html` and select **Run checks** for camera depth,
interruptions, visibility, reduced motion, touch, and cleanup checks.
`/checks/tech-text.html` also checks dragging and resizing under camera
perspective. `/checks/camera-preview.html` previews desktop, phone, and landscape
layouts with controls for camera direction.
