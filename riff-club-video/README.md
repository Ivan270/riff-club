# Riff Club Video

20-second 9:16 HyperFrames promo for Riff Club.

## Setup

```bash
pnpm install
```

## Preview

```bash
pnpm preview
```

## Validate

```bash
pnpm check
```

Or run the checks individually:

```bash
pnpm lint
pnpm validate
pnpm inspect
pnpm test:composition
```

## Render

```bash
pnpm render
```

This writes `renders/riff-club-promo.mp4`.

## Optional Music Bed

To render with music, place a royalty-free file at `assets/music.mp3`, then uncomment the `music-bed` audio element in `index.html`.
