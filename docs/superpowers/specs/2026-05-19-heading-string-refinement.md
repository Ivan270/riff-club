# Heading And Instrument String Refinement Spec

## Goal

Improve heading readability and visual impact while preserving the Zine Gig-Flyer direction, and correct instrument-mark string counts on homepage service cards.

## Approved Direction

Use a focused refinement of the existing poster typography rather than a new visual system.

## Scope

Included:

- Replace the global display font stack so Impact is no longer the first-choice font.
- Improve heading readability by relaxing negative letter spacing and increasing line height where headings are too compressed.
- Apply the heading refinement to global `.display`, page `h1`/`h2`, component CTA/footer/hero poster headings, and service card `h3` where needed.
- Fix `ServiceCard` instrument marks so guitar variants show six visible strings and bass shows four visible strings.

Excluded:

- New font packages or external font loading.
- Broad layout redesign.
- Copy, SEO metadata, schema, CTA, or routing changes.

## Typography Requirements

- `--font-display` should prefer a heavier readable condensed/block stack before `Impact`, such as `"Arial Black"`, `"Franklin Gothic Heavy"`, `Haettenschweiler`, `Impact`, sans-serif.
- Global `.display` should keep a poster feel but use safer spacing: line height around `.86` and letter spacing around `-.035em`.
- Local H1/H2/H3 rules should avoid extreme values like `line-height: .78` or `letter-spacing: -.09em` when text wraps across multiple lines.
- Heading text must remain uppercase and visually bold.

## Instrument Mark Requirements

- Electric guitar mark: six visible string lines.
- Acoustic guitar mark: six visible string lines while preserving the soundhole/chord-grid feel.
- Bass mark: four visible string lines; decorative dots/circle must not replace or hide one of the string lines.
- Keep the existing `variant: 'electric' | 'acoustic' | 'bass'` API.

## Verification

- Static check confirms `--font-display` does not start with `Impact`.
- Static check confirms no project SFC heading rule still uses `line-height: .78`, `line-height: .8`, `line-height: .82`, `letter-spacing: -.09em`, or `letter-spacing: -.08em` for headings.
- Static check confirms ServiceCard template/CSS supports six guitar strings and four bass strings.
- Run `npm run generate`.
