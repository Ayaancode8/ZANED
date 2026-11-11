# Brand intro

Mode: Experience. A silent, automatic introduction on every fresh page load.

Visual authority: `/home/robot/Videos/svg_i_ssspin.io_1793043077.mp4`.
Closing transition authority: `/home/robot/Videos/Screencasts/Screencast from 2026-10-15 18-14-12.webm`,
requested on November 11 to replace the fade shown in the second supplied recording.
The user subsequently selected `https://reactbits.dev/components/morph-slider`
as the implementation authority for the handoff.
The user approved the implementation plan on November 11, 2026: use all eleven
supplied motion assets in the fixed plan order and end with
`assets/logo/symbol-shaded.svg`. The subsequent typography refinement replaces
the decorative wordmark with plain Anton ZANED, retains the inc suffix, and
adds the exact tagline “Websites that refuse to blend in.” in charcoal Belleza.

## Direction contract

THESIS: Reproduce the supplied wordmark-to-media-to-symbol choreography.

OWN-WORLD: Near-white #fdfdfd, black lettering, compact mixed-media tiles,
small rounded corners, circular masks, and the supplied shaded crown.

STORY: The ZANED name becomes its creative work, then resolves into its emblem.

FIRST VIEWPORT: Uniformly fitted 720 × 900 stage; name centered at 360/450,
eleven tiles spanning nearly its width, crown centered near 360/495.
No visible controls. Escape skips; reduced motion bypasses.

FORM: User-pinned reference; no seed or alternative concept round applies.
7038ms sequence, then a 2000ms React Bits Morph Slider melt into the existing hero.

FINISH: unreviewed and undocumented is unfinished; this build ends with the finish review, the verdict, DESIGN.md, and every shipping raster carrying its provenance

## Shipped geometry and behavior

The 720 × 900 stage scales uniformly by `min(viewportWidth / 720,
viewportHeight / 900)`. Plain ZANED uses the site's self-hosted Anton at
96px with a 99px line box, centered horizontally at stage y=402. Static and
animated glyphs share their natural widths. A separate 26px Space Grotesk 400
“inc” sits 12px to the right of D at its upper edge, with its box at y=404.
The suffix does not take space in the wordmark row. The eleven media tiles use 52px
widths, heights of 52/100/42/88px, and a shared row top at 432px. Rectangles
have 5px corners; circles use round masks, and the cutout remains unclipped.
The row's settled pitch is 64px. The unchanged shaded crown is 148 × 141px,
positioned at 286/424.5, centered at 360/495.

The sequence replaces the letters with media, holds the expanded row, collapses
the tiles inward from 4100ms, assembles the two crown halves by 5400ms, and
holds the crown until the 7038ms sequence ends. React Bits Morph Slider then
reveals the hero with its official two-texture melt shader. The chosen settings
are 2000ms, power2.inOut, intensity 0.7, noise scale 10, and zero aberration,
drift, and vignette opacity. The existing shared clock drives OGL rendering.
Modern Screenshot captures the hero and its canvas pixels under the crown hold;
the outgoing texture reproduces the full crown at its measured position. A slow
capture may extend the crown hold by at most 1800ms. Capture failure and
unavailable or lost WebGL skip to the live hero.
The hero mounts at 5400ms but stays inert and hidden from assistive technology
until completion. Media uses seven stills and four silent clips with posters.
Escape and reduced motion complete immediately; hidden tabs pause the shared
Web Animations timeline, Morph Slider renderer, and video playback. Reduced-motion changes are handled
live, and blocked or failed video playback retains still imagery.

The tagline sits below the crown at y=598 with 32px Belleza, 40px line height,
0.005em tracking, and charcoal #202629 throughout. React Bits SplitText's flip
is adapted to the existing Web Animations clock without a new dependency:
bottom-origin rotationX -90° to 0°, six-em perspective, 1100ms per character,
and 34.74ms stagger over 28 non-space characters. Playback starts at 4800ms
and settles at 6838ms, 200ms before the melt. The outgoing texture draws its
settled state so it remains present when the live stage hides. Desktop and
390px phone captures are in `artifacts/tagline-intro/`; 33 browser checks
passed, including timing, charcoal final color, hidden-tab pauses, Escape,
reduced motion, WebGL fallbacks, completion, and cleanup.
