# Website verification — 11 November 2026

Follow-up: both findings below have been fixed and verified. See [fix verification](FIXES.md). The initial findings and results below are retained as historical evidence.

Two minor defects were reproduced. No critical failures or uncaught application JavaScript errors were found within the tested scope. Application source files were left unchanged.

## Findings

### 1. Live reduced motion retains the camera's previous pose (P3)

Location: `src/components/HeroSection.jsx:57–59`, `:97–100`.

Reproduction:

1. Open the website with reduced motion disabled and reveal the hero.
2. While the camera animation is running, set the browser's reduced-motion preference to `reduce`. This was exercised with Playwright's `page.emulateMedia({ reducedMotion: 'reduce' })` against real Chrome media queries.
3. Inspect `.zaned-hero__artworks` and the animated layers.

Expected: the camera stops and removes its inline transforms and `will-change`, restoring the original static composition, as specified in `PRODUCT.md` and the existing camera checks.

Observed: movement stops, but the camera retains its previous transforms and `will-change`. The desktop artwork stage retains `translateY(26px)`, `scale(1.07)`, and its current rotation. The transforms remained after a 30-second wait. Loading with reduced motion already enabled renders the correct static composition. Disabling reduced motion again resumes movement.

Reproduced in both the development and production builds, with both software WebGL enabled and GPU rendering disabled. Other reduced-motion listeners fired, but the camera's change handler did not run in the observed browser transition; manually dispatching its change event cleared the pose. The existing camera test uses a mocked media-query event and does not catch this integration case.

Suggested correction: ensure a reduced-motion preference observed by the camera's frame guard also clears its transforms and `will-change`; cover the transition using real browser media emulation.

Evidence: [diagnosis.json](diagnosis.json), [media-trace.json](media-trace.json), [production.json](production.json).

### 2. Missing favicon returns HTTP 404 (P3)

Location: `index.html:3–9`; no favicon is present in `public/`.

Reproduction: open the production homepage in a fresh Chrome browser context. The automatic request to `/favicon.ico` returns HTTP 404 and creates a console error. A direct request confirmed the same status.

Expected: a declared favicon resolves successfully.

Suggested correction: declare a favicon using an existing ZANED symbol asset or add a favicon under `public/`.

Evidence: the console location and network response in [diagnosis.json](diagnosis.json).

## Executed verification

- `npm run build` passed.
- All six existing browser suites passed, totaling 76 assertions: intro (22), glass surface (9), grid distortion (13), hero camera (17), Silk background (12), and TechText (3).
- Production checks covered natural intro completion, Escape skip, intro keyboard isolation, correct focus order and visible focus, pointer clicks, touch input, live motion changes, original-artwork fallback without WebGL, font loading, and asset loading.
- All 14 production layout sizes passed checks for document overflow, clipped controls or copy, logo/navigation overlap, and collapsed artwork: 320×480, 320×568, 360×640, 390×844, 600×800, 601×320, 768×1024, 844×390, 900×600, 1024×768, 1280×720, 1440×900, 1920×1080, and 2560×1080.
- Production automation recorded 30 checks: 28 passed and 2 failed, corresponding to the findings above. Follow-up diagnosis confirmed both findings and confirmed that motion resumes when reduced motion is disabled.
- No uncaught production JavaScript errors or missing application assets were observed. The favicon was the sole confirmed failed resource.

The navigation and project button intentionally have no destinations in this phase. This is explicitly documented in `PRODUCT.md`, so their current behavior was not classified as a defect.

## Visual evidence

- [Desktop — 1440×900](layout-1440x900.png)
- [Phone — 390×844](layout-390x844.png)
- [Short landscape — 601×320](layout-601x320.png)
- [Existing suite results](suites.json)
- [Production results and layout measurements](production.json)

## Limits

Verification used local development and production servers with headless Google Chrome. WebGL assertions exercised real shader output through software rendering. Safari, Firefox, physical devices, native GPU performance, and a deployed hosting environment were not tested. This pass does not establish that every possible bug is absent.
