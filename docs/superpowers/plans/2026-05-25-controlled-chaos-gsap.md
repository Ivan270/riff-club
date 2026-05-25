# Controlled Chaos GSAP Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add client-only GSAP Controlled Chaos animations that reinforce the zine flyer identity while preserving Nuxt static generation and accessibility.

**Architecture:** GSAP is installed as a runtime dependency but imported dynamically only on the client through one composable. Components own their local animation targets via template refs and use the composable for reduced-motion checks, context cleanup, ScrollTrigger registration, and shared button feedback helpers.

**Tech Stack:** Nuxt 3.17, Vue 3 Composition API with `<script setup lang="ts">`, GSAP, ScrollTrigger, npm source regression checks.

---

## File Structure

- Modify `package.json`: add `gsap` dependency after installing with npm.
- Modify `package-lock.json`: lock GSAP dependency.
- Modify `scripts/frontend-regression-check.mjs`: add source checks for GSAP dependency, dynamic import, reduced-motion guardrails, cleanup, and no scroll-jacking/infinite repeat patterns.
- Create `composables/useGsapMotion.ts`: owns client-only GSAP loading, reduced-motion detection, ScrollTrigger registration, context cleanup helper, and button punch helper.
- Modify `components/HeroZine.vue`: add refs and hero poster assembly timeline.
- Modify `components/ServicePage.vue`: add scroll-triggered flyer panel and related-link entry animation.
- Modify `components/ContactCta.vue`: add scroll-triggered CTA paper/stamp/tear-off animation and button punch feedback.
- Modify `components/SiteFooter.vue`: add scroll-triggered footer card reveal and CTA button feedback.

## Task 1: Regression Checks And Dependency

**Files:**
- Modify: `scripts/frontend-regression-check.mjs`
- Modify: `package.json`
- Modify: `package-lock.json`

- [ ] **Step 1: Add failing regression checks**

Add this helper near the existing `read` helper in `scripts/frontend-regression-check.mjs`:

```js
const readOptional = (path) => {
  try {
    return read(path)
  } catch {
    return ''
  }
}
```

Then append these checks after the existing CSS assertions and before the service page loop:

```js
const pkg = JSON.parse(read('package.json'))
const motion = readOptional('composables/useGsapMotion.ts')
const animatedFiles = [
  'components/HeroZine.vue',
  'components/ServicePage.vue',
  'components/ContactCta.vue',
  'components/SiteFooter.vue'
].map((path) => [path, read(path)])

assert(pkg.dependencies?.gsap, 'GSAP must be installed as a runtime dependency')
assert(motion.includes("import('gsap')"), 'GSAP must be dynamically imported inside the motion composable')
assert(motion.includes("import('gsap/ScrollTrigger')"), 'ScrollTrigger must be dynamically imported inside the motion composable')
assert(motion.includes('prefers-reduced-motion: reduce'), 'Motion composable must respect reduced motion')
assert(motion.includes('gsap.context'), 'Motion composable must use gsap.context for cleanup')
assert(!motion.includes('scrollerProxy'), 'Motion composable must not use scroll-jacking APIs')

for (const [path, source] of animatedFiles) {
  assert(source.includes('useGsapMotion'), `${path} must use the shared GSAP motion composable`)
  assert(source.includes('onMounted'), `${path} must initialize animation from a client lifecycle hook`)
  assert(!source.includes('repeat: -1'), `${path} must not include infinite GSAP loops`)
}
```

- [ ] **Step 2: Run regression checks to verify failure**

Run: `npm run test:frontend`

Expected: FAIL because `gsap` is missing, `composables/useGsapMotion.ts` does not exist, and animated components do not use the composable.

- [ ] **Step 3: Install GSAP**

Run: `npm install gsap`

Expected: `package.json` and `package-lock.json` update; no source implementation yet.

- [ ] **Step 4: Run regression checks again**

Run: `npm run test:frontend`

Expected: FAIL only for missing `useGsapMotion.ts` and component animation usage.

## Task 2: Shared Motion Composable

**Files:**
- Create: `composables/useGsapMotion.ts`

- [ ] **Step 1: Implement the composable**

Create `composables/useGsapMotion.ts`:

```ts
import type { Ref } from 'vue'

type GsapModule = typeof import('gsap')
type ScrollTriggerModule = typeof import('gsap/ScrollTrigger')
type Gsap = GsapModule['gsap']
type ScrollTrigger = ScrollTriggerModule['ScrollTrigger']

let gsapPromise: Promise<{ gsap: Gsap; ScrollTrigger: ScrollTrigger }> | null = null

const loadGsap = async () => {
  if (!gsapPromise) {
    gsapPromise = Promise.all([import('gsap'), import('gsap/ScrollTrigger')]).then(([gsapModule, scrollTriggerModule]) => {
      gsapModule.gsap.registerPlugin(scrollTriggerModule.ScrollTrigger)
      return { gsap: gsapModule.gsap, ScrollTrigger: scrollTriggerModule.ScrollTrigger }
    })
  }

  return gsapPromise
}

const prefersReducedMotion = () => {
  if (!import.meta.client) {
    return true
  }

  return window.matchMedia('(prefers-reduced-motion: reduce)').matches
}

export const useGsapMotion = () => {
  const runWhenMotionAllowed = async (
    scope: Ref<HTMLElement | null>,
    setup: (tools: { gsap: Gsap; ScrollTrigger: ScrollTrigger }) => void
  ) => {
    if (!import.meta.client || prefersReducedMotion() || !scope.value) {
      return undefined
    }

    const tools = await loadGsap()
    const context = tools.gsap.context(() => setup(tools), scope.value)

    return () => context.revert()
  }

  const bindPressFeedback = async (elements: Element[]) => {
    if (!import.meta.client || prefersReducedMotion() || elements.length === 0) {
      return undefined
    }

    const { gsap } = await loadGsap()
    const cleanups = elements.map((element) => {
      const onPointerDown = () => {
        gsap.to(element, { scale: 0.96, x: 1, y: 1, duration: 0.08, ease: 'power2.out' })
      }
      const onPointerUp = () => {
        gsap.to(element, { scale: 1, x: 0, y: 0, duration: 0.18, ease: 'back.out(2)' })
      }

      element.addEventListener('pointerdown', onPointerDown)
      element.addEventListener('pointerup', onPointerUp)
      element.addEventListener('pointerleave', onPointerUp)

      return () => {
        element.removeEventListener('pointerdown', onPointerDown)
        element.removeEventListener('pointerup', onPointerUp)
        element.removeEventListener('pointerleave', onPointerUp)
      }
    })

    return () => cleanups.forEach((cleanup) => cleanup())
  }

  return {
    bindPressFeedback,
    prefersReducedMotion,
    runWhenMotionAllowed
  }
}
```

- [ ] **Step 2: Run regression checks**

Run: `npm run test:frontend`

Expected: FAIL only because the four target components do not yet use `useGsapMotion`.

## Task 3: Hero Poster Animation

**Files:**
- Modify: `components/HeroZine.vue`

- [ ] **Step 1: Add refs and lifecycle setup**

Replace the current script block in `components/HeroZine.vue` with:

```vue
<script setup lang="ts">
const whatsappHref = 'https://wa.me/56995296324?text=Hola%2C%20quiero%20consultar%20por%20clases%20presenciales%20de%20guitarra%2Fbajo%20en%20La%20Reina.%20%C2%BFTienes%20horarios%20disponibles%3F'

const heroRef = useTemplateRef<HTMLElement>('heroRef')
const { bindPressFeedback, runWhenMotionAllowed } = useGsapMotion()
let cleanupTimeline: (() => void) | undefined
let cleanupButtons: (() => void) | undefined

onMounted(async () => {
  cleanupTimeline = await runWhenMotionAllowed(heroRef, ({ gsap }) => {
    const timeline = gsap.timeline({ defaults: { ease: 'power3.out' } })

    timeline
      .from('.hero-copy > *', { y: 22, opacity: 0, duration: 0.45, stagger: 0.08 })
      .from('.poster', { y: 34, opacity: 0, rotate: -3, scale: 0.97, duration: 0.58, ease: 'back.out(1.5)' }, '-=0.28')
      .from('.poster-tape', { y: -18, opacity: 0, rotate: -14, duration: 0.28, stagger: 0.08 }, '-=0.2')
      .from('.poster-type span', { x: -24, opacity: 0, rotate: -8, scale: 0.9, duration: 0.32, stagger: 0.08, ease: 'back.out(2)' }, '-=0.14')
      .from('.string-lines span', { scaleX: 0, transformOrigin: 'left center', duration: 0.32, stagger: 0.045 }, '-=0.28')
      .from('.poster-local, .poster-note, .poster b', { opacity: 0, scale: 0.92, rotate: -4, duration: 0.28, stagger: 0.06 }, '-=0.2')
  })

  cleanupButtons = await bindPressFeedback(Array.from(heroRef.value?.querySelectorAll('.button') ?? []))
})

onBeforeUnmount(() => {
  cleanupTimeline?.()
  cleanupButtons?.()
})
</script>
```

- [ ] **Step 2: Add the template ref**

Change the opening hero section to:

```vue
<section ref="heroRef" class="hero container" aria-labelledby="home-title">
```

- [ ] **Step 3: Remove duplicate CSS poster-drop animation**

Remove `animation: poster-drop .7s cubic-bezier(.2, .8, .15, 1) both;` from `.poster` and delete the `@keyframes poster-drop` block. GSAP now owns that behavior; static fallback remains the final CSS state.

- [ ] **Step 4: Run regression checks**

Run: `npm run test:frontend`

Expected: FAIL because `ServicePage`, `ContactCta`, and `SiteFooter` are not yet animated.

## Task 4: Service Page Scroll Animations

**Files:**
- Modify: `components/ServicePage.vue`

- [ ] **Step 1: Add refs and lifecycle setup**

Insert this before the `defineProps` call in `components/ServicePage.vue`:

```ts
const servicePageRef = useTemplateRef<HTMLElement>('servicePageRef')
const { bindPressFeedback, runWhenMotionAllowed } = useGsapMotion()
let cleanupTimeline: (() => void) | undefined
let cleanupButtons: (() => void) | undefined

onMounted(async () => {
  cleanupTimeline = await runWhenMotionAllowed(servicePageRef, ({ gsap, ScrollTrigger }) => {
    gsap.utils.toArray<HTMLElement>('.panel, .related-links a').forEach((element, index) => {
      gsap.from(element, {
        y: 28,
        opacity: 0,
        rotate: index % 2 === 0 ? -2 : 2,
        duration: 0.48,
        ease: 'back.out(1.4)',
        scrollTrigger: {
          trigger: element,
          start: 'top 82%',
          once: true
        }
      })
    })

    ScrollTrigger.refresh()
  })

  cleanupButtons = await bindPressFeedback(Array.from(servicePageRef.value?.querySelectorAll('a') ?? []))
})

onBeforeUnmount(() => {
  cleanupTimeline?.()
  cleanupButtons?.()
})
```

- [ ] **Step 2: Add the template ref**

Change the root div to:

```vue
<div ref="servicePageRef" class="service-page" :class="`service-page--${accent}`">
```

- [ ] **Step 3: Run regression checks**

Run: `npm run test:frontend`

Expected: FAIL because `ContactCta` and `SiteFooter` are not yet animated.

## Task 5: CTA Animation

**Files:**
- Modify: `components/ContactCta.vue`

- [ ] **Step 1: Add refs and lifecycle setup**

Replace the current script block in `components/ContactCta.vue` with:

```vue
<script setup lang="ts">
const whatsappHref = 'https://wa.me/56995296324?text=Hola%2C%20quiero%20consultar%20por%20clases%20presenciales%20de%20guitarra%2Fbajo%20en%20La%20Reina.%20%C2%BFTienes%20horarios%20disponibles%3F'

const ctaRef = useTemplateRef<HTMLElement>('ctaRef')
const { bindPressFeedback, runWhenMotionAllowed } = useGsapMotion()
let cleanupTimeline: (() => void) | undefined
let cleanupButtons: (() => void) | undefined

onMounted(async () => {
  cleanupTimeline = await runWhenMotionAllowed(ctaRef, ({ gsap }) => {
    const timeline = gsap.timeline({
      scrollTrigger: {
        trigger: ctaRef.value,
        start: 'top 82%',
        once: true
      }
    })

    timeline
      .from('.cta-paper', { y: 30, opacity: 0, rotate: -3, duration: 0.48, ease: 'back.out(1.4)' })
      .from('.stamp', { scale: 0.86, opacity: 0, rotate: -8, duration: 0.24, ease: 'back.out(2)' }, '-=0.2')
      .from('.tear-offs span', { y: 14, opacity: 0, duration: 0.22, stagger: 0.04 }, '-=0.12')
  })

  cleanupButtons = await bindPressFeedback(Array.from(ctaRef.value?.querySelectorAll('.button') ?? []))
})

onBeforeUnmount(() => {
  cleanupTimeline?.()
  cleanupButtons?.()
})
</script>
```

- [ ] **Step 2: Add the template ref**

Change the opening CTA section to:

```vue
<section ref="ctaRef" class="cta" aria-labelledby="cta-title">
```

- [ ] **Step 3: Run regression checks**

Run: `npm run test:frontend`

Expected: FAIL because `SiteFooter` is not yet animated.

## Task 6: Footer Animation

**Files:**
- Modify: `components/SiteFooter.vue`

- [ ] **Step 1: Add script setup**

Add this script block above the template in `components/SiteFooter.vue`:

```vue
<script setup lang="ts">
const footerRef = useTemplateRef<HTMLElement>('footerRef')
const { bindPressFeedback, runWhenMotionAllowed } = useGsapMotion()
let cleanupTimeline: (() => void) | undefined
let cleanupButtons: (() => void) | undefined

onMounted(async () => {
  cleanupTimeline = await runWhenMotionAllowed(footerRef, ({ gsap }) => {
    gsap.from('.footer-grid', {
      y: 30,
      opacity: 0,
      rotate: -1.5,
      duration: 0.48,
      ease: 'back.out(1.4)',
      scrollTrigger: {
        trigger: footerRef.value,
        start: 'top 86%',
        once: true
      }
    })
  })

  cleanupButtons = await bindPressFeedback(Array.from(footerRef.value?.querySelectorAll('.button') ?? []))
})

onBeforeUnmount(() => {
  cleanupTimeline?.()
  cleanupButtons?.()
})
</script>
```

- [ ] **Step 2: Add the template ref**

Change the opening footer tag to:

```vue
<footer ref="footerRef" class="footer">
```

- [ ] **Step 3: Run regression checks**

Run: `npm run test:frontend`

Expected: PASS with `Frontend regression checks passed`.

## Task 7: Final Verification And Commit

**Files:**
- All modified files.

- [ ] **Step 1: Run frontend regression checks**

Run: `npm run test:frontend`

Expected: PASS.

- [ ] **Step 2: Run static generation**

Run: `npm run generate`

Expected: PASS and prerender 14 routes.

- [ ] **Step 3: Inspect repository changes**

Run: `git status --short && git diff --stat`

Expected: Source changes only; generated output remains ignored.

- [ ] **Step 4: Commit**

```bash
git add package.json package-lock.json scripts/frontend-regression-check.mjs composables/useGsapMotion.ts components/HeroZine.vue components/ServicePage.vue components/ContactCta.vue components/SiteFooter.vue docs/superpowers/plans/2026-05-25-controlled-chaos-gsap.md
git commit -m "feat: add controlled chaos gsap motion"
```

## Self-Review

- Spec coverage: hero load, section entry, stickers/stamps, CTA feedback, reduced motion, client-only GSAP, SSG verification, and no scroll-jacking are covered.
- Placeholder scan: no TBD, TODO, or unspecified implementation steps remain.
- Type consistency: `useGsapMotion`, `runWhenMotionAllowed`, `bindPressFeedback`, `Gsap`, and `ScrollTrigger` names are consistent across tasks.
