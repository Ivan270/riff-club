# Logo Assets Integration Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace the site's legacy logo and web identity assets with the selected production-ready v-circular assets while keeping only files consumed by the Nuxt application.

**Architecture:** Preserve the existing public URLs consumed by `SiteHeader.vue` and `MobileMenu.vue`, replacing their files in place so no component logic changes are required. Extend Nuxt's static head links with the selected favicon fallbacks, manifest, Safari pinned tab, and Open Graph image. Remove old public assets that are no longer referenced, then verify the generated site.

**Tech Stack:** Nuxt 3.17, Vue 3, pnpm, static assets in `public/`, Netlify prerender output.

---

## File Map

- Replace: `public/logo-full-dark.svg` with the Onyx-background/Old Lace horizontal logo.
- Replace: `public/logo-full-light.svg` with the Old Lace-background/Onyx horizontal logo.
- Replace: `public/isotype-dark.svg` and `public/isotype-light.svg` with the standard isotipo.
- Replace: `public/favicon.svg` and `public/apple-touch-icon.png` with the web package assets.
- Add: `public/favicon.ico`, `public/favicon-16x16.png`, `public/favicon-32x32.png`, `public/site.webmanifest`, `public/og-image.png`, `public/safari-pinned-tab.svg`.
- Delete: legacy public logo/isotype files that have no remaining references after the replacement.
- Modify: `nuxt.config.ts` head links and metadata.
- Verify: generated files under `.output/public/` and `dist/`, without committing generated output unless already tracked by project convention.

### Task 1: Replace selected brand assets

**Files:**
- Modify: `public/logo-full-dark.svg`
- Modify: `public/logo-full-light.svg`
- Modify: `public/isotype-dark.svg`
- Modify: `public/isotype-light.svg`
- Modify: `public/favicon.svg`
- Modify: `public/apple-touch-icon.png`
- Create: `public/favicon.ico`
- Create: `public/favicon-16x16.png`
- Create: `public/favicon-32x32.png`
- Create: `public/site.webmanifest`
- Create: `public/og-image.png`
- Create: `public/safari-pinned-tab.svg`

- [ ] **Step 1: Confirm every source asset exists and inspect the worktree**

Run:

```bash
test -f "/Users/ivan270/Developer/Prod/riff-logo-designs/output/versions/v-circular-complete-system/colorways/svg/01-master-dark/logotipo-horizontal.svg"
test -f "/Users/ivan270/Developer/Prod/riff-logo-designs/output/versions/v-circular-complete-system/colorways/svg/02-master-light/logotipo-horizontal.svg"
test -f "/Users/ivan270/Developer/Prod/riff-logo-designs/output/versions/v-circular-complete-system/masters/isotipo/isotipo.svg"
test -f "/Users/ivan270/Developer/Prod/riff-logo-designs/output/versions/v-circular-complete-system/web/favicon.svg"
test -f "/Users/ivan270/Developer/Prod/riff-logo-designs/output/versions/v-circular-complete-system/web/favicon.ico"
test -f "/Users/ivan270/Developer/Prod/riff-logo-designs/output/versions/v-circular-complete-system/web/favicon-16x16.png"
test -f "/Users/ivan270/Developer/Prod/riff-logo-designs/output/versions/v-circular-complete-system/web/favicon-32x32.png"
test -f "/Users/ivan270/Developer/Prod/riff-logo-designs/output/versions/v-circular-complete-system/web/apple-touch-icon.png"
test -f "/Users/ivan270/Developer/Prod/riff-logo-designs/output/versions/v-circular-complete-system/web/site.webmanifest"
test -f "/Users/ivan270/Developer/Prod/riff-logo-designs/output/versions/v-circular-complete-system/web/og-image.png"
test -f "/Users/ivan270/Developer/Prod/riff-logo-designs/output/versions/v-circular-complete-system/web/safari-pinned-tab.svg"
git status --short
```

Expected: all `test` commands succeed and only intentional worktree changes are present.

- [ ] **Step 2: Copy the selected files into `public/`**

Run:

```bash
cp "/Users/ivan270/Developer/Prod/riff-logo-designs/output/versions/v-circular-complete-system/colorways/svg/01-master-dark/logotipo-horizontal.svg" public/logo-full-dark.svg
cp "/Users/ivan270/Developer/Prod/riff-logo-designs/output/versions/v-circular-complete-system/colorways/svg/02-master-light/logotipo-horizontal.svg" public/logo-full-light.svg
cp "/Users/ivan270/Developer/Prod/riff-logo-designs/output/versions/v-circular-complete-system/masters/isotipo/isotipo.svg" public/isotype-dark.svg
cp "/Users/ivan270/Developer/Prod/riff-logo-designs/output/versions/v-circular-complete-system/masters/isotipo/isotipo.svg" public/isotype-light.svg
cp "/Users/ivan270/Developer/Prod/riff-logo-designs/output/versions/v-circular-complete-system/web/favicon.svg" public/favicon.svg
cp "/Users/ivan270/Developer/Prod/riff-logo-designs/output/versions/v-circular-complete-system/web/favicon.ico" public/favicon.ico
cp "/Users/ivan270/Developer/Prod/riff-logo-designs/output/versions/v-circular-complete-system/web/favicon-16x16.png" public/favicon-16x16.png
cp "/Users/ivan270/Developer/Prod/riff-logo-designs/output/versions/v-circular-complete-system/web/favicon-32x32.png" public/favicon-32x32.png
cp "/Users/ivan270/Developer/Prod/riff-logo-designs/output/versions/v-circular-complete-system/web/apple-touch-icon.png" public/apple-touch-icon.png
cp "/Users/ivan270/Developer/Prod/riff-logo-designs/output/versions/v-circular-complete-system/web/site.webmanifest" public/site.webmanifest
cp "/Users/ivan270/Developer/Prod/riff-logo-designs/output/versions/v-circular-complete-system/web/og-image.png" public/og-image.png
cp "/Users/ivan270/Developer/Prod/riff-logo-designs/output/versions/v-circular-complete-system/web/safari-pinned-tab.svg" public/safari-pinned-tab.svg
```

Expected: the selected assets exist under `public/`, and no campaign, badge, vertical, micro-isotype, or unused PWA assets are copied.

- [ ] **Step 3: Remove legacy assets that are no longer consumed**

First search references:

```bash
rg -n "logo-full\.svg|isotype\.svg|logo-footer|logo-header|logo-mobile|favicon-light|favicon-dark" --glob '!docs/**' --glob '!dist/**' --glob '!.output/**' .
```

Delete only old files with no matches outside `public/` and no references in `nuxt.config.ts`, `SiteHeader.vue`, or `MobileMenu.vue`. Keep the four compatibility paths used by the components until Task 2 is complete.

Expected: the public directory contains only selected logo files plus unrelated site assets and no unreferenced old logo variants.

### Task 2: Register the selected web identity metadata

**Files:**
- Modify: `nuxt.config.ts:25-40`

- [ ] **Step 1: Update the static head configuration**

Keep the existing theme color and social card metadata, and replace the current `link` array with the following additions:

```ts
link: [
  { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
  { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: '' },
  {
    rel: 'stylesheet',
    href: 'https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:opsz,wdth,wght@12..96,75..100,400;12..96,75..100,600;12..96,75..100,700;12..96,75..100,800&family=DM+Sans:opsz,wght@9..40,400;9..40,500;9..40,600;9..40,700&display=swap'
  },
  { rel: 'icon', href: '/favicon.svg', type: 'image/svg+xml' },
  { rel: 'icon', href: '/favicon.ico', sizes: 'any' },
  { rel: 'icon', href: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
  { rel: 'icon', href: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
  { rel: 'apple-touch-icon', href: '/apple-touch-icon.png' },
  { rel: 'mask-icon', href: '/safari-pinned-tab.svg', color: '#101010' },
  { rel: 'manifest', href: '/site.webmanifest' }
]
```

Add this metadata entry to `meta`:

```ts
{ property: 'og:image', content: '/og-image.png' }
```

Expected: Nuxt emits all selected identity links in SSR HTML, and the application continues using `/logo-full-*` and `/isotype-*` without component code changes.

- [ ] **Step 2: Validate metadata syntax**

Run:

```bash
pnpm exec nuxi prepare
```

Expected: Nuxt prepares successfully without TypeScript or configuration errors.

### Task 3: Verify runtime and generated output

**Files:**
- Verify: `components/SiteHeader.vue`
- Verify: `components/MobileMenu.vue`
- Verify: `public/*`
- Verify: `.output/public/*` and `dist/*`

- [ ] **Step 1: Run the existing frontend regression check**

Run:

```bash
pnpm test:frontend
```

Expected: the regression script completes successfully.

- [ ] **Step 2: Generate the static site**

Run:

```bash
pnpm generate
```

Expected: Nuxt generates all configured routes without errors.

- [ ] **Step 3: Check generated asset presence**

Run:

```bash
for asset in logo-full-dark.svg logo-full-light.svg isotype-dark.svg isotype-light.svg favicon.svg favicon.ico favicon-16x16.png favicon-32x32.png apple-touch-icon.png site.webmanifest og-image.png safari-pinned-tab.svg; do test -f "dist/$asset" || exit 1; done
rg -n "favicon|apple-touch-icon|manifest|og:image|safari-pinned-tab" dist/index.html
```

Expected: every selected asset exists in `dist/`, and the generated HTML contains the favicon, manifest, Safari mask, Apple Touch Icon, and Open Graph references.

- [ ] **Step 4: Confirm no removed asset is referenced**

Run:

```bash
rg -n "logo-full\.svg|logo-header|logo-mobile|logo-footer|isotype\.svg" --glob '!docs/**' --glob '!dist/**' --glob '!.output/**' .
```

Expected: no matches, or only deliberate documentation references that do not affect runtime.

- [ ] **Step 5: Review the final diff and commit the implementation**

Run:

```bash
git status --short
git diff --stat
git diff -- nuxt.config.ts components/SiteHeader.vue components/MobileMenu.vue
git add public nuxt.config.ts
git commit -m "feat: replace site logo assets"
```

Expected: the commit contains only selected public assets and the Nuxt head configuration; generated directories and unrelated worktree changes remain untouched.
