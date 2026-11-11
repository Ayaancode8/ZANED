---
name: ZANED
description: Reference-led strategy, design, and technology identity
colors:
  ink: "#202629"
  body: "#4b555b"
  paper: "#f5f6f5"
  silver: "#e2e6e5"
  graphite: "#bec7c8"
  logo: "#202629"
  glass-fill: "rgb(241 242 242 / 48%)"
  glass-rim: "rgb(255 255 255 / 72%)"
  glass-highlight: "rgb(255 255 255 / 60%)"
  glass-solid: "#eceeef"
  intro-canvas: "#fdfdfd"
  intro-lettering: "#000"
typography:
  intro-wordmark:
    fontFamily: "Anton, Arial Narrow, sans-serif"
    fontSize: "96px"
    fontWeight: 400
    lineHeight: "99px"
  intro-tagline:
    fontFamily: "Belleza, Optima, Candara, sans-serif"
    fontSize: "32px"
    fontWeight: 400
    lineHeight: 1.25
    letterSpacing: "0.005em"
  intro-suffix:
    fontFamily: "Space Grotesk, sans-serif"
    fontSize: "26px"
    fontWeight: 400
    lineHeight: 1
    letterSpacing: "0.025em"
  display:
    fontFamily: "Anton, Arial Narrow, sans-serif"
    fontSize: "clamp(3rem, min(9vw, 11svh), 6rem)"
    fontWeight: 400
    lineHeight: 1.04
    letterSpacing: "-0.015em"
  body:
    fontFamily: "Belleza, Optima, Candara, sans-serif"
    fontSize: "clamp(18px, 1.5vw, 22px)"
    fontWeight: 400
    lineHeight: 1.45
    letterSpacing: "0.005em"
  label:
    fontFamily: "Belleza, Optima, Candara, sans-serif"
    fontSize: "16px"
    fontWeight: 400
    lineHeight: 1.35
    letterSpacing: "0.005em"
  project-label:
    fontFamily: "Belleza, Optima, Candara, sans-serif"
    fontSize: "17px"
    fontWeight: 400
    lineHeight: 1.35
    letterSpacing: "0.005em"
rounded:
  intro-tile: "5px"
  capsule: "999px"
components:
  intro-wordmark:
    backgroundColor: "{colors.intro-canvas}"
    textColor: "{colors.intro-lettering}"
    width: "max-content"
    height: "99px"
    typography: "{typography.intro-wordmark}"
  intro-tagline:
    textColor: "{colors.ink}"
    typography: "{typography.intro-tagline}"
  intro-suffix:
    textColor: "{colors.body}"
    typography: "{typography.intro-suffix}"
  intro-tile:
    rounded: "{rounded.intro-tile}"
    width: "52px"
  project-cta:
    textColor: "{colors.paper}"
    typography: "{typography.project-label}"
    rounded: "{rounded.capsule}"
    padding: "7px 8px 7px 23px"
    height: "54px"
  project-cta-compact:
    height: "48px"
    padding: "5px 8px 5px 23px"
  navigation:
    backgroundColor: "{colors.glass-fill}"
    textColor: "{colors.ink}"
    typography: "{typography.label}"
    rounded: "{rounded.capsule}"
    padding: "5px 7px"
    height: "56px"
  navigation-mobile:
    padding: "1px 4px"
    height: "48px"
  navigation-control:
    rounded: "{rounded.capsule}"
    padding: "0 20px"
    height: "44px"
  navigation-control-hover:
    backgroundColor: "{colors.glass-highlight}"
---

# Design System: ZANED

## Overview

**Creative North Star: "ZANED reference"**

The supplied identity pairs dense, emphatic typography with open space and original photographic cutouts. At the user's request, the palette follows the monochrome artwork, using a cool paper-white, silver, and graphite React Bits Grainient background with charcoal typography. The standalone crown emblem introduces the brand. Heavy compressed headline type contrasts with thin, flared supporting copy. The hero centers the headline, supporting copy, and project control above a large central portrait with two staggered profiles. This record covers the shipped header and hero only; future surfaces have no established component language yet.

The shipped brand intro adds a silent wordmark-to-media-to-crown sequence before the hero. Its reference-led near-white stage, black lettering, mixed-media tiles, and shaded emblem are specific to that introduction; they do not replace the hero palette or glass controls. Its full choreography is recorded in `.impeccable/surfaces/intro.md`.

**Key Characteristics:**

- Heavy display type and quiet supporting text.
- Charcoal lettering over paper white, with silver and graphite behind the portraits.
- Original imagery with interactive grid distortion, a stable composition, and minimal controls.

## Colors

### Primary

- **Ink (#202629):** headline, navigation, and the filled project control.
- **Body (#4b555b):** supporting copy, a softer slate gray.
- **Silver (#e2e6e5) and graphite (#bec7c8):** a lighter, restrained gradient behind the monochrome artwork, keeping portrait edges distinct without deep gray bands.

### Neutral

- **Paper (#f5f6f5):** the near-white base canvas, text on the project control, and text-selection foreground. This lighter silver palette supersedes the previous darker gray ramp at the user's request.
- The standalone emblem uses the same charcoal (#202629) as the headline. A top-to-bottom paper wash stabilizes contrast over the animated background, with 93%, 85%, and 40% opacity stops before becoming transparent at 82% of the hero height. The existing ink selection, focus outlines, and scrollbar follow the new tokens. Navigation uses translucent paper fill and a bright white rim; the project capsule uses a near-opaque charcoal gradient. Translucent white highlights are intentional material layers, including the 60% navigation hover wash and lighter arrow disc, rather than new background palette colors. Detector advisories about these literal white alpha values do not indicate stray identity colors.

The intro uses its own near-white canvas and pure black lettering, recorded as `intro-canvas` and `intro-lettering`. Literal black is intentional within this reference-led surface.

## Typography

**Display Font:** self-hosted Anton, an intrinsically heavy, compressed display face at its native weight 400. Tall uppercase glyphs and -0.015em tracking provide the requested editorial impact. Anton approximates Arizona Flare Compressed Bold; licensed Arizona files were unavailable.

**Description Font:** self-hosted Belleza 400, with thin strokes, subtle flared terminals, wider proportions, and 0.005em tracking. It approximates the requested Arizona Flare Regular/Light direction. Supporting copy uses a measure up to 62ch, capped at 44rem, with balanced wrapping.

**Control Font:** self-hosted Belleza 400 for navigation and CTA labels, with 1.35 leading and 0.005em tracking. Navigation uses 16px and the project label uses 17px to keep the regular-weight strokes readable. The intro suffix retains Space Grotesk 400.

The hierarchy makes a large jump from supporting copy to tightly tracked display text. There is no general heading ladder. The label token describes 16px navigation; the CTA uses a separate 17px label with the same weight, leading, and tracking.

At widths up to 900px, display text uses `clamp(2.5rem, 14vw, 5rem)` with 1.04 leading; supporting text uses 18px with 1.45 leading. Compact screens up to 700px tall reduce supporting text to 16px. Short landscape screens above 600px wide place both headline phrases on one centered line at `clamp(1.5rem, min(5.8vw, 9svh), 3rem)`, with 16px supporting text and 1.4 leading. The headline uses the supplied TechText canvas effect with one complete accessible heading name. Both canvas and static fallback use Anton's natural O glyphs so every letter shares the same compressed proportions.

**The Type Pair Rule.** Use Anton for the headline, Belleza for the description and controls, and Space Grotesk for the intro suffix.

**The Natural Wordmark Rule.** The intro uses plain “ZANED” in the site's self-hosted Anton at 96px with a 99px line box. Static and individually animated letters share the same natural widths and font metrics. A separate small “inc” uses the `intro-suffix` typography role and body color beside the upper-right corner of D, aligned with its top edge.

## Layout

The intro fits a centered 720 × 900 stage uniformly using the smaller viewport-to-stage ratio, without scrolling or independent axis scaling. Its wordmark, tiles, and crown retain their relative geometry across desktop, mobile, and landscape. Exact choreography coordinates belong to the intro surface brief.

The hero occupies one small viewport height (100svh) and clips overflow. A single-column grid places centered text above the assembled artwork; the artwork row receives the remaining height. Responsive gutters bound the content. A three-column header grid keeps navigation horizontally centered and aligns the logo at the left to the same vertical center. Equal outer tracks preserve the navigation center independently of the emblem width. The front-facing portrait is centered at the bottom edge, with outward-facing profiles offset from its center by the smaller of 25% of the stage width or 46% of its height. This keeps the profiles overlapping the central portrait on wide and short screens. The left profile sits lower than the right. The original reflected profile and standing figure have been replaced.

All viewport sizes retain the centered copy-above-artwork arrangement. The logo and navigation stay in one row at every width. At widths up to 900px, the artwork stage spans the viewport and hero top padding is 112px, reducing to 96px on compact screens; the separate logo row is removed. The stage is at most 1120px wide and 48svh tall, constrained by its available row height; desktop also caps its height at 46vw and mobile at 96vw. Profiles are 64% of the stage height, reducing to 46% below 600px width to keep their faces visible beside the central portrait. Copy intervals are 20px, with a 24–32px minimum gap before artwork. Compact screens reduce those intervals to 16px; short landscape uses 12px and limits artwork width to 150svh. The centered navigation capsule is 56px high, reducing to 48px at widths up to 600px while retaining all three labels and 44px controls. The project capsule is 54px high, reducing to 48px on compact and short landscape screens. These are surface-specific layout rules, not a general site grid or spacing scale.

**The Viewport Fit Rule.** Keep this hero within one viewport without scrolling, including short desktop and compact mobile screens.

## Elevation & Depth

Depth comes from the React Bits Grainient WebGL background, original cutout imagery, and two liquid-glass control surfaces. The locally adapted React Bits Glass Surface uses a capsule displacement map (scale -22) and 6px backdrop blur in supported Chromium browsers, without added dependencies or WebGL. Safari and Firefox use frosted 12px blur with saturation 1.05; browsers without backdrop-filter use solid paper-gray navigation and ink project surfaces. Bright rims, inset highlights, and soft offset shadows establish control depth. The shared rim is translucent white at 72%; the dark CTA reduces this to 30%. These translucent-white material values are intentional and may trigger advisory detector findings.

**The Glass Control Rule.** Keep the material on the navigation and project capsule, preserving readable labels, visible keyboard focus, and solid fallbacks.

Grainient uses the restored paper-white (#f5f6f5), pale silver (#e2e6e5), and graphite (#bec7c8) palette at angle 115, with three flowing bands, speed 6, flow 2.4, scale 1.3, silk 0.45, fine stationary grain (0.045), and DPR 1. Pointer stirring, click swirls, animated grain, and intro are disabled. The original directional paper wash preserves a light headline area. The layered hero camera remains active. Reduced motion freezes the gradient, including when the preference changes live; hidden pages and offscreen backgrounds stop rendering. Unavailable or lost WebGL exposes the matching CSS gradient. Cleanup preserves the canvas context across React Strict Mode effect remounts.

The hero uses one 1200px perspective viewport and a shared 3D scene. An inverse camera pose looks toward the scene center while the headline and artwork retain fixed world transforms. The backdrop sits at Z=-700px, the left profile at -160px, the right at -60px, the central portrait at +180px, and the copy at 0. Fixed depth compensation preserves the resting composition. Fine-pointer input moves the camera up to 105px horizontally and 62px vertically, with 18px/9px ambient travel and a slow 16px dolly. Exponential tracking smooths interruptions. The backdrop overscans by 12%; artwork planes have 18px lower overscan to keep the portrait grounded. Touch devices ignore gestures and use 35% ambient movement. Layouts up to 600px use 18% camera travel and 8px lower overscan. The header remains outside the camera. Only the scene transform changes per frame; hidden and offscreen heroes pause, cleanup cancels the frame loop, and live reduced motion restores the original static composition. Headline layout measurements use local coordinates, and pointer input is unprojected onto its Z=0 plane so dragging remains accurate through camera movement and resizing.

Each artwork uses the supplied React Bits GridDistortion shader with a crisp 50-cell grid, radius 0.12, strength 0.3, relaxation 0.9, drag mode, softness 0, chroma 0.6, idle 0.3, click ripples, and an intro scramble that settles. The shader preserves image alpha and premultiplies its output to keep transparent silhouettes clean. Artwork canvases supersample at 2× on standard screens and honor native display density up to 3× on retina phones. Drawing buffers round fractional CSS dimensions upward and update on layout or window resizing; source PNGs stay unchanged. Each wrapper preserves its source aspect ratio. Static image fallbacks cover reduced motion, unavailable WebGL, and context loss. Live motion-preference changes stop distortion immediately; hidden and offscreen artwork pauses rendering. Global passive pointer listeners keep touch scrolling available and limit interaction to each artwork’s bounds. The locally adapted TechText animates individual headline letters with dashed outlines, selection frames, particles, drag springs, click kicks, and idle sweeps. Inline canvases span the viewport with 64px bleed and are aligned from the measured text bounds, keeping dragged letters and selection frames visible beyond their original lines under camera movement. Canvas surfaces remain transparent and ignore pointer events; only the hero viewport clips overflow. It has no entrance animation and does not change layout. Reduced motion uses the static DOM fallback; hidden pages and offscreen text pause rendering.

## Shapes

Intro media uses compact rectangular tiles with the `intro-tile` corner radius, circular masks, and an unclipped cutout. The literal small radius is intentional and applies to intro tiles, not to the hero capsules. The supplied shaded crown retains its original silhouette and proportions.

Navigation and the project control use full capsules (999px radius) with thin bright rims. The project arrow sits inside a circular disc (36px). The logo is the approved crown emblem, using its solid charcoal silhouette and four open cutouts. The headline uses natural compressed letterforms. Artwork preserves its supplied silhouette and proportions.

## Components

### Project control

A charcoal glass capsule with paper text and a northeast inline SVG arrow inside a translucent circular disc. The label is 17px; the arrow is 15px within its 36px disc. Default padding is 7px 8px 7px 23px with a 28px internal gap. Compact layouts reduce vertical padding to 5px; short landscape uses 5px 6px 5px 20px. The material grades from charcoal at 95% opacity to deep charcoal at 98%, with a white rim and soft shadows.

The shipped control is an enabled native button. Clicking intentionally opens nothing while `projectHref` is absent; a configured URL renders a native link. Fine-pointer hover brightens the surface highlight and disc and moves the arrow 2px northeast. Press scales the capsule to 0.975 with a 70ms response; normal transitions are 200ms. Keyboard focus uses an ink outline (2px, offset 5px). Reduced motion removes all control transitions and transforms, retaining static state feedback.

### Navigation

Three Belleza labels share a centered translucent paper-white capsule with 4px gaps. Each enabled control is at least 44px high and 76px wide, with 20px horizontal padding. At widths up to 600px, controls use 64px minimum width, 10px horizontal padding, and 2px gaps; up to 360px, they use 60px minimum width and 8px padding. The header uses 12px side gutters at that smallest breakpoint. All three labels remain visible on phones.

Unassigned destinations render enabled native buttons: Enter, Space, and pointer clicks provide native activation without opening anything. Configured `href` values render native links. Fine-pointer hover adds a translucent white wash with a soft shadow and inset highlight. Press adds an ink wash and inset shadow, scales to 0.97, and responds in 70ms; normal transitions are 180ms. Keyboard focus uses an ink outline (2px, offset 1px) plus a white wash. Reduced motion removes transitions and press transforms.

### Hero identity

The standalone crown SVG symbol, two-line headline, and three new artwork cutouts form the composition. The symbol lives in SiteHeader and is 48px wide on desktop, 40px at widths up to 900px, and 32px at widths up to 600px. It preserves its original aspect ratio and stays vertically centered beside the navigation on all screen sizes. The large central portrait leads the assembled artwork, with outward-facing profiles staggered at different heights in their original orientations. All three faces stay visible; the inward digital fragments layer behind the central portrait. Decorative imagery is hidden from assistive technology. Exact asset placement belongs to the home surface brief rather than a reusable layout primitive.

### Brand intro

A silent, automatic introduction plays on every fresh page load. Plain Anton ZANED with a small upper-right “inc” suffix becomes eleven mixed-media tiles, the row collapses inward, and two clipped halves resolve into the unchanged supplied `assets/logo/symbol-shaded.svg`. The seven stills and four muted video clips use local assets; video posters remain visible when playback is blocked or fails. Intro depth comes from the supplied media and shaded emblem rather than glass surfaces or added shadows.

The exact tagline “Websites that refuse to blend in.” sits below the crown at stage y=598 in 32px Belleza, with a 40px line box and charcoal #202629 throughout. The React Bits SplitText flip is adapted to the shared Web Animations clock: bottom-origin rotationX -90° to 0°, six-em perspective, 1100ms per character, and approximately 34.74ms stagger across 28 non-space characters. It starts at 4800ms and finishes at 6838ms, leaving 200ms before the melt. It plays automatically as part of the intro on mouse and touch devices. The outgoing melt texture includes the settled tagline, preserving continuity when the live stage hides.

The sequence lasts 7038ms before a 2000ms melt using the user-selected React Bits Morph Slider. The official two-texture displacement shader bends the crown and incoming hero together. Its settings are `melt`, `power2.inOut`, intensity 0.7, and noise scale 10; aberration, idle drift, and vignette opacity are zero. The hero mounts at 5400ms and Modern Screenshot captures its rendered composition, including canvas pixels and fonts, during the crown hold. OGL renders the two textures, with the existing Web Animations clock replacing the component's GSAP tween and carousel controls. A slow first capture extends the crown hold by at most 1800ms. Capture failure or lost/unavailable WebGL skips to the live hero. The hero remains inert and hidden from assistive technology until completion. Hidden tabs pause the sequence, morph, and media. Escape skips immediately; reduced motion and unavailable Web Animations bypass the intro. Completion is guarded, and cleanup cancels tracks, animation frames, media, observers, listeners, and the morph GPU resources for React Strict Mode remounts.

**The Intro Handoff Rule.** Keep the underlying hero inactive until the intro completes or is skipped; Escape and reduced motion must always reach the hero.

## Do's and Don'ts

### Do:

- **Do** preserve the supplied logo and artwork proportions.
- **Do** preserve natural intro letter proportions, uniform stage scaling, silent media, and poster fallbacks.
- **Do** use the approved self-hosted type pair and retain the accessible heading name.
- **Do** verify this hero at both narrow and short viewport sizes.

### Don't:

- **Don't** restore the previous reflected profile or standing figure layout.
- **Don't** disable unassigned preview controls; keep native buttons enabled with hover, focus, and press feedback, and render native links only when destinations exist.
- **Don't** infer cards, fields, additional pages, or a motion system from this hero.
