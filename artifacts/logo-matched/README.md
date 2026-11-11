# ZANED — matched ribbon identity

The emblem keeps the original five-point crown, central spine, tiered silhouette, and four openings. Sweeping contours, tapered terminals, and subtle mirrored folds connect it to the existing ZANED wordmark.

## Assets

Each arrangement is available in `shaded`, `black`, and `white` treatments, as an editable SVG and a transparent PNG.

| Arrangement | Filename pattern | PNG dimensions |
| --- | --- | --- |
| Standalone emblem | `symbol-{treatment}.svg` / `.png` | 1024 × 976 |
| Symbol beside wordmark | `horizontal-{treatment}.svg` / `.png` | 2400 × 473 |
| Symbol above wordmark | `stacked-{treatment}.svg` / `.png` | 2400 × 1387 |

`preview.png` and `preview.svg` show the shaded and reversed identity on contrasting backgrounds. `size-check.png` shows the emblem at 24, 48, and 128 px, with enlarged pixel details for the smaller sizes. Preview backgrounds and labels are not part of the production assets.

`spacing-comparison.png` compares the previous and revised wordmark at the same scale. The revised Z is 12% narrower and 4% shorter, and ANED moves 86 wordmark units closer. This balances the Z with the remaining letters and closes the optical gap between Z and A. All six paired exports use this correction; the stacked symbol is recentered over the revised wordmark.

## Use

- Use shaded artwork on light backgrounds when the folded finish can be seen.
- Use solid black or white for small placements, single-color reproduction, embroidery, or engraving. At widths below 48 px, the solid treatments are preferable.
- The standalone symbol was checked down to 24 px wide. This does not establish a minimum width for the complete wordmark lockups.
- Preserve the supplied aspect ratios. SVGs contain paths rather than live lettering and need no fonts or linked images.
- Cutouts and surrounding areas are transparent in both SVG and PNG files.

The horizontal emblem is 110% of the wordmark's visible height, with a 30% height gap. The stacked emblem is 150% of the wordmark's visible height, with a 35% height gap. The stacked symbol is centered over the visible wordmark bounds.

## Verification

All nine production SVGs were checked for unique IDs, resolved internal references, valid drawing bounds, transparent margins, and the absence of raster artwork and font dependencies. All PNGs were inspected for transparency and clipping. Independent Inkscape and librsvg/Cairo renders were compared and visually inspected; all four symbol openings remain distinct at 24, 48, and 128 px in both renderers.

The original wordmark paths, gradients, and fold artwork are retained, with the scale and position corrections described above. The solid lockups use the white wordmark artwork, recolored to black where applicable. The original wordmark files and standalone emblem exports remain byte-identical. No website files were changed. The revised Z and A were also checked for overlap at twice the source resolution; their flourishes remain separate.
