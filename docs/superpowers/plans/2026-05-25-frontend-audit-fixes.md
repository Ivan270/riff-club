# Frontend Audit Fixes Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Fix the approved frontend audit findings while preserving the zine gig-flyer identity and static Nuxt generation.

**Architecture:** Add source-level regression checks, then make small focused changes. Shared service-page markup/styles move into one typed Vue component; theme state moves into one composable and the header toggle only consumes that API.

**Tech Stack:** Nuxt 3.17, Vue 3 Composition API with `<script setup lang="ts">`, CSS variables, npm scripts, Node-based source checks.

---

## File Structure

- Create `scripts/frontend-regression-check.mjs`: source-level regression checks for CTA number, active nav accessibility, theme toggle, overflow anti-pattern removal, and service CSS deduplication.
- Create `composables/useTheme.ts`: owns theme state, system preference detection, localStorage persistence, and `<html data-theme>` updates.
- Create `components/ThemeToggle.vue`: accessible dark/light theme switch.
- Create `components/ServicePage.vue`: shared service-page layout, accent classes, related links, and scoped styles.
- Modify `components/HeroZine.vue`: correct WhatsApp number.
- Modify `components/SiteHeader.vue`: typed nav list, `aria-current`, larger touch targets, theme toggle.
- Modify `assets/css/main.css`: theme variables, overflow clipping, typography stacks, focus scroll margins.
- Modify `pages/clases-guitarra-electrica.vue`, `pages/clases-guitarra-acustica.vue`, `pages/clases-bajo.vue`: replace duplicated service markup/styles with `ServicePage` usage.
- Modify `package.json`: add `test:frontend` script.

## Tasks

### Task 1: Regression Check Script

**Files:**
- Create: `scripts/frontend-regression-check.mjs`
- Modify: `package.json`

- [ ] **Step 1: Write the failing regression check**

```js
import { readFileSync } from 'node:fs'

const read = (path) => readFileSync(new URL(`../${path}`, import.meta.url), 'utf8')
const failures = []
const assert = (condition, message) => {
  if (!condition) failures.push(message)
}

const hero = read('components/HeroZine.vue')
const header = read('components/SiteHeader.vue')
const css = read('assets/css/main.css')
const servicePages = [
  'pages/clases-guitarra-electrica.vue',
  'pages/clases-guitarra-acustica.vue',
  'pages/clases-bajo.vue'
].map((path) => [path, read(path)])

assert(hero.includes('56995296324'), 'Hero WhatsApp CTA must use 56995296324')
assert(!hero.includes('56912345678'), 'Hero WhatsApp CTA must not use placeholder number')
assert(header.includes('aria-current'), 'SiteHeader must expose active page with aria-current')
assert(header.includes('ThemeToggle'), 'SiteHeader must render ThemeToggle')
assert(css.includes('[data-theme="light"]'), 'Global CSS must define light theme variables')
assert(css.includes('overflow-x: clip'), 'Global CSS must clip horizontal overflow')
assert(!css.includes('color-scheme: dark light'), 'Global CSS must not advertise both schemes globally')

for (const [path, source] of servicePages) {
  assert(source.includes('<ServicePage'), `${path} must use shared ServicePage component`)
  assert(!source.includes('max-width: calc(100% - 12px)'), `${path} must not keep overflow compensation anti-pattern`)
  assert(!source.includes('.content-grid'), `${path} must not keep duplicated service layout CSS`)
}

if (failures.length) {
  console.error(failures.map((failure) => `- ${failure}`).join('\n'))
  process.exit(1)
}

console.log('Frontend regression checks passed')
```

- [ ] **Step 2: Add npm script**

```json
"scripts": {
  "dev": "nuxt dev",
  "build": "nuxt build",
  "generate": "nuxt generate",
  "preview": "nuxt preview",
  "test:frontend": "node scripts/frontend-regression-check.mjs"
}
```

- [ ] **Step 3: Run check to verify it fails**

Run: `npm run test:frontend`

Expected: FAIL mentioning the old hero number, missing theme toggle, missing shared `ServicePage`, and duplicated CSS.

### Task 2: Theme System and Header Accessibility

**Files:**
- Create: `composables/useTheme.ts`
- Create: `components/ThemeToggle.vue`
- Modify: `components/SiteHeader.vue`
- Modify: `assets/css/main.css`

- [ ] **Step 1: Implement theme composable**

```ts
type Theme = 'dark' | 'light'

const STORAGE_KEY = 'riff-club-theme'

const theme = shallowRef<Theme>('dark')

const applyTheme = (value: Theme) => {
  if (import.meta.client) {
    document.documentElement.dataset.theme = value
    document.documentElement.style.colorScheme = value
  }
}

export const useTheme = () => {
  const setTheme = (value: Theme) => {
    theme.value = value
    if (import.meta.client) {
      localStorage.setItem(STORAGE_KEY, value)
    }
    applyTheme(value)
  }

  const toggleTheme = () => setTheme(theme.value === 'dark' ? 'light' : 'dark')

  onMounted(() => {
    const stored = localStorage.getItem(STORAGE_KEY)
    const systemTheme = window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark'
    setTheme(stored === 'dark' || stored === 'light' ? stored : systemTheme)
  })

  const themeLabel = computed(() => theme.value === 'dark' ? 'Activar modo claro' : 'Activar modo oscuro')

  return { theme: readonly(theme), themeLabel, setTheme, toggleTheme }
}
```

- [ ] **Step 2: Implement accessible toggle**

```vue
<script setup lang="ts">
const { theme, themeLabel, toggleTheme } = useTheme()
</script>

<template>
  <button class="theme-toggle" type="button" :aria-label="themeLabel" :aria-pressed="theme === 'light'" @click="toggleTheme">
    <span aria-hidden="true">{{ theme === 'dark' ? 'Oscuro' : 'Claro' }}</span>
  </button>
</template>
```

- [ ] **Step 3: Update header links and tap targets**

Use a typed nav array and set `:aria-current="isActive(item.to) ? 'page' : undefined"`. Add `<ThemeToggle />` after the nav links. Set `.nav-link` and `.theme-toggle` to `min-height: 44px` and inline-flex centering.

- [ ] **Step 4: Update global CSS themes**

Move `color-scheme` from broad `dark light` to theme-specific variables. Add `:root, [data-theme='dark']` dark variables and `[data-theme='light']` light variables. Add `html, body { overflow-x: clip; }` and `:target, :focus { scroll-margin-top: 96px; }`.

- [ ] **Step 5: Run check**

Run: `npm run test:frontend`

Expected: Still FAIL only for remaining service-page and hero-number items until later tasks are done.

### Task 3: Shared Service Page Component

**Files:**
- Create: `components/ServicePage.vue`
- Modify: `pages/clases-guitarra-electrica.vue`
- Modify: `pages/clases-guitarra-acustica.vue`
- Modify: `pages/clases-bajo.vue`

- [ ] **Step 1: Create shared component**

`ServicePage.vue` accepts props: `eyebrow`, `title`, `lead`, `sticker`, `approachTitle`, `body`, `area`, `related`, and `accent`. It renders the common hero, approach panel, area panel, related links, and `ContactCta`.

- [ ] **Step 2: Move shared CSS into component**

Keep accent-specific shadows via classes: `service-page--red`, `service-page--acid`, `service-page--purple`. Remove `max-width: calc(100% - 12px)` and use `overflow: clip`, smaller mobile shadows, and transform reset at mobile breakpoints.

- [ ] **Step 3: Replace electric page with data-only usage**

Keep existing `useSeoMeta`; template becomes one `ServicePage` call with electric guitar content and related links.

- [ ] **Step 4: Replace acoustic page with data-only usage**

Keep existing `useSeoMeta`; template becomes one `ServicePage` call with acoustic guitar content and related links.

- [ ] **Step 5: Replace bass page with data-only usage**

Keep existing `useSeoMeta`; template becomes one `ServicePage` call with bass content and related links.

- [ ] **Step 6: Run check**

Run: `npm run test:frontend`

Expected: Still FAIL only for hero number if Task 4 has not been completed.

### Task 4: CTA Number and Typography Polish

**Files:**
- Modify: `components/HeroZine.vue`
- Modify: `assets/css/main.css`

- [ ] **Step 1: Correct hero WhatsApp number**

Replace `56912345678` with `56995296324` in `components/HeroZine.vue`.

- [ ] **Step 2: Strengthen typography stacks without network dependency**

Use more distinctive local-first stacks:

```css
--font-display: Impact, Haettenschweiler, 'Franklin Gothic Heavy', 'Arial Black', sans-serif;
--font-body: Charter, 'Iowan Old Style', 'Palatino Linotype', Georgia, serif;
--font-mono: 'IBM Plex Mono', 'Courier New', Courier, monospace;
```

- [ ] **Step 3: Run check**

Run: `npm run test:frontend`

Expected: PASS with `Frontend regression checks passed`.

### Task 5: Final Verification and Commit

**Files:**
- All modified files

- [ ] **Step 1: Run frontend regression check**

Run: `npm run test:frontend`

Expected: PASS.

- [ ] **Step 2: Run static generation**

Run: `npm run generate`

Expected: PASS and prerendered routes generated.

- [ ] **Step 3: Inspect git diff**

Run: `git diff --stat && git diff --cached --stat`

Expected: Source/config changes only; no generated ignored output staged.

- [ ] **Step 4: Commit**

```bash
git add .
git commit -m "fix: address frontend audit findings"
```

## Self-Review

- Spec coverage: all approved findings 1, 4, 5, 6, 7, 8, and 9 are covered by tasks.
- Placeholder scan: no TBD/TODO/fill-later language remains.
- Type consistency: `Theme`, `ServicePage` props, and script names are used consistently across tasks.
