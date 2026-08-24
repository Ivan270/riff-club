# Riff Club Design System

## Brand Palette

The palette is immutable. Define these primitives once at the beginning of
`assets/css/main.css`; all runtime colors must resolve through a primitive or a
semantic token.

| Primitive | Value | Role |
| --- | --- | --- |
| Onyx | `#101010` | Primary ink, dark canvas, structural shadow |
| Old Lace | `#fff7e8` | Primary paper, light canvas, text on dark |
| Lime | `#d8ff00` | High-energy accent and focus |
| Lavender | `#a855f7` | Secondary campaign or service accent |
| Cinnabar | `#ff3b30` | Urgent accent and primary CTA emphasis |
| Graphite | `#2a2a2a` | Dark depth and secondary dark surface |
| Sand | `#eadfc7` | Aged paper and light depth |
| Bone | `#d8d0bf` | Muted text on dark surfaces |
| Stone | `#5e574c` | Muted text on light surfaces |

Do not tint or replace Lime, Lavender, or Cinnabar between themes. Alpha colors
and gradients must derive from these primitives with `color-mix()`; do not add
hex, RGB, HSL, white, or black color literals outside the primitive block.

## Semantic Mapping

| Semantic role | Dark | Light |
| --- | --- | --- |
| Ink / paper | Onyx / Old Lace | Onyx / Old Lace |
| Page background / text | Onyx / Old Lace | Old Lace / Onyx |
| Background start / middle / end | Graphite / Onyx / Onyx | Old Lace / Old Lace / Sand |
| Section background / text | Onyx / Old Lace | Old Lace / Onyx |
| Section gradient start / end | Graphite / Onyx | Old Lace / Sand |
| Section muted | Bone | Stone |
| Section border | Old Lace | Onyx |
| Header and section overlays | Onyx-derived alpha | Old-Lace-derived alpha |
| General muted / muted on dark / muted ink | Bone / Bone / Stone | Stone / Bone / Stone |
| Acid / red / purple accents | Lime / Cinnabar / Lavender | Lime / Cinnabar / Lavender |
| `--purple-link-text` on Lavender | Onyx, at least `4.5:1` | Onyx, at least `4.5:1` |

`--purple-link-text` is the accessible Onyx foreground for links placed on a
Lavender service accent. Keep this pairing in both themes so normal text meets
the WCAG AA `4.5:1` minimum.

Use no more than two accent colors in one composition. Onyx, Old Lace,
Graphite, Sand, Bone, and Stone are neutrals and do not count toward that limit.
Choose one dominant accent and reserve the second for a distinct action or
instrument category; never distribute all three accents decoratively in one
component.

## Typography

- `--font-display`: Bricolage Grotesque for hero text, headings, card titles,
  large numerals, pull quotes, and short expressive statements.
- `--font-ui: var(--font-display)`: buttons, navigation links, menu controls,
  eyebrows, stamps, stickers, compact labels, badges, tabs, and compact
  metadata.
- `--font-body`: DM Sans for paragraphs, lead copy, descriptions, forms,
  schedules, and FAQs.
- `--font-heading` is a compatibility alias to `--font-display`; new heading
  styles should use the role token directly where practical.
- The official wordmark is always an SVG asset. Never recreate `RIFF CLUB` as
  styled live text.

## Logo Hierarchy

1. Use the horizontal signature as the primary identity in hero, poster, and
   wide brand placements. Its minimum rendered width is `180px`.
2. Use the standard isotipo only when horizontal space cannot support the
   signature. Render it at `48px` to `56px`; the current header size is `52px`.
3. Use a circular badge only in placements at least `96px` wide. It is not a
   substitute for the compact header isotipo and must never be reduced below
   its minimum.
4. Use the theme-matched official asset on a stable approved surface. Preserve
   aspect ratio, geometry, internal spacing, and clear space; do not redraw,
   crop, stretch, rotate, outline, recolor, or place effects inside the logo.

The three-line signature motif belongs to brand and menu affordances. It may be
used as exactly three parallel strokes when it clearly reads as that signature.
Instrument illustrations use physical string counts instead: six lines for
electric or acoustic guitar and four visible lines for bass. Never use three
lines as an instrument diagram or use six/four-line instrument patterns as a
logo substitute.

## Placement

Allowed placements are uncluttered hero/poster panels, theme-matched headers,
footers with sufficient contrast, approved social artwork, and favicon/app-icon
contexts using their dedicated exports. Decorative use is allowed only when an
accessible brand label already exists nearby and the image has empty alt text.

Disallowed placements include photography or patterns that compromise
contrast, unapproved color fields, multiple competing logos in one region,
body-copy lockups, controls smaller than the stated minimums, and any placement
that treats the signature, isotipo, badge, or instrument strings as
interchangeable geometry.
