# Fix verification — 11 November 2026

Both findings from the initial QA report are resolved.

- `src/components/HeroSection.jsx` now caches the reduced-motion preference and updates it in the media-query change handler, matching the other animation components. The animation loop no longer reads the live media query before its change event can restore the static composition.
- `index.html` declares the existing ZANED SVG symbol as its favicon. Vite includes the icon in the production output, and the browser no longer makes the failed automatic `/favicon.ico` request.

Verification completed:

- `npm run build` passed.
- All six existing browser suites passed again: 76 assertions, no failures. See [fix-suites.json](fix-suites.json).
- The rebuilt production site passed [verify-fixes.mjs](verify-fixes.mjs): the favicon returned HTTP 200 with valid SVG content; three real reduced-motion transitions cleared transforms and `will-change` on all six camera layers and remained static; animation resumed after every transition; initial reduced motion bypassed the intro and preserved the static camera; no browser errors or HTTP failures were observed.

The regression check requires Playwright and Google Chrome. With the production preview running on port 4173, this environment's command is:

```sh
ZANED_PLAYWRIGHT_MODULE=/home/robot/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright/index.mjs node artifacts/qa-2026-11-11/verify-fixes.mjs
```

The script also accepts a base URL as its first argument. No application dependencies were added. Verification used headless Chrome; Safari, Firefox, and physical devices remain outside this verification scope.
