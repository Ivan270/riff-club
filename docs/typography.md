# Riff Club Typography

Riff Club uses contrast between expressive headlines and calm functional text.

## Font Roles

- **Bricolage Grotesque:** hero headlines, H1-H3 headings, card titles, large numbers, pull quotes, and short campaign statements.
- **Bricolage Grotesque UI:** navigation, buttons, menu controls, eyebrows, stamps, stickers, compact labels, badges, tabs, and metadata.
- **DM Sans:** body copy, lead paragraphs, descriptions, forms, schedules, and FAQs.
- **Official logo SVGs:** the wordmark is always an image asset. Do not recreate `RIFF CLUB` with live text.

## Responsive Hierarchy

| Role | Font | Weight | Desktop/mobile scale |
| --- | --- | ---: | --- |
| Hero / H1 | Bricolage Grotesque | 800 | `clamp(3.5rem, 7vw, 7.5rem)` |
| H2 | Bricolage Grotesque | 800 | `clamp(2.25rem, 4vw, 4rem)` |
| H3 | Bricolage Grotesque | 700 | `clamp(1.5rem, 2.4vw, 2rem)` |
| Lead | DM Sans | 500 | `clamp(1.125rem, 1.6vw, 1.375rem)` |
| Body | DM Sans | 400 | `clamp(1rem, 1.1vw, 1.125rem)` |
| UI | Bricolage Grotesque | 500-600 | `clamp(1rem, 1vw, 1rem)` |
| Label | Bricolage Grotesque | 600-700 | `clamp(0.75rem, 0.9vw, 0.875rem)` |

Large headlines use tight leading and modest negative tracking. On small screens,
reduce tracking before reducing readability or forcing words to collide.

## Usage Examples

```html
<h1 class="display">Clases de guitarra en La Reina</h1>
<h2>Diagnostico, ruta y canciones reales.</h2>
<h3>Guitarra electrica</h3>
<p class="lead">Una ruta clara para practicar con direccion.</p>
<p>Trabajamos tecnica, ritmo y canciones conectadas con tus metas.</p>
<a class="button" href="/contacto">Agendar por WhatsApp</a>
<span class="eyebrow">Clases presenciales</span>
```

Use sentence case for paragraphs, navigation, buttons, forms, schedules, prices,
and FAQs. Uppercase is reserved for short eyebrows, stickers, stamps, and
metadata. Keep essential interface text at least 16px.

## Theme Guidance

The same font roles apply in both themes. Contrast comes from the existing Riff
Club color tokens, not from changing type weight. Purple service links use a
theme-aware foreground token so they remain readable in dark and light modes.

## Tokens

The implementation lives in `assets/css/main.css`. Reuse `--font-display`,
`--font-ui`, `--font-body`, the `--weight-*` tokens, and the `--type-*` tokens
instead of adding one-off font declarations in components.
