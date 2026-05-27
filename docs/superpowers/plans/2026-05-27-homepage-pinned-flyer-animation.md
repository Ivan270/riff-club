# Homepage Pinned Flyer Animation Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add an impactful GSAP pinned scroll animation to the homepage pain-point and services transition without changing unrelated code.

**Architecture:** Keep the change localized to `pages/index.vue`. Use the existing `useGsapMotion()` composable and `ScrollTrigger` support, with static CSS fallbacks for reduced motion and SSG safety.

**Tech Stack:** Nuxt 3, Vue 3 `<script setup lang="ts">`, GSAP, ScrollTrigger, scoped CSS.

---

### Task 1: Add Homepage Scroll Animation Wiring

**Files:**
- Modify: `pages/index.vue`

- [ ] **Step 1: Add a page ref and cleanup in `<script setup>`**

Add this after the existing `useHead(...)` block:

```ts
const homeRef = useTemplateRef<HTMLElement>('homeRef')
const { runWhenMotionAllowed } = useGsapMotion()
let cleanupHomeMotion: (() => void) | undefined

onMounted(async () => {
  cleanupHomeMotion = await runWhenMotionAllowed(homeRef, ({ gsap, ScrollTrigger }) => {
    const flyer = homeRef.value?.querySelector('.pain-flyer')
    const services = homeRef.value?.querySelector('.services-stage')

    if (!flyer || !services) {
      return
    }

    const flyerTimeline = gsap.timeline({
      scrollTrigger: {
        trigger: flyer,
        start: 'top top',
        end: '+=135%',
        scrub: 0.8,
        pin: true,
        anticipatePin: 1
      }
    })

    flyerTimeline
      .from('.pain-flyer__sheet', { yPercent: 18, scale: 0.92, rotate: -2.5, opacity: 0, duration: 0.32, ease: 'power3.out' })
      .from('.pain-flyer .eyebrow', { y: 36, opacity: 0, letterSpacing: '0.34em', duration: 0.22 }, '-=0.08')
      .from('#dolores-title', { y: 46, opacity: 0, scale: 0.88, rotate: 1.2, duration: 0.28, ease: 'back.out(1.4)' }, '-=0.06')
      .from('.pain-flyer .note', { y: 70, opacity: 0, scale: 0.82, rotate: 7, duration: 0.3, stagger: 0.08, ease: 'back.out(1.8)' }, '+=0.08')
      .to('.pain-flyer__sheet', { yPercent: -7, scale: 0.98, rotate: 0, duration: 0.18, ease: 'power2.inOut' }, '+=0.08')

    const servicesTimeline = gsap.timeline({
      scrollTrigger: {
        trigger: services,
        start: 'top bottom',
        end: 'top top',
        scrub: 0.7
      }
    })

    servicesTimeline
      .from('.services-stage .eyebrow', { y: 44, opacity: 0, duration: 0.22 })
      .from('#servicios-title', { scale: 0.72, y: 70, opacity: 0, transformOrigin: 'left center', duration: 0.32, ease: 'power3.out' }, '-=0.1')
      .to('#servicios-title', { scale: 1.16, duration: 0.28, ease: 'power2.inOut' })
      .to('#servicios-title', { scale: 1, y: 0, duration: 0.2, ease: 'power2.out' })
      .from('.services-stage .service-grid > *', { y: 48, opacity: 0, scale: 0.95, duration: 0.28, stagger: 0.06, ease: 'power2.out' }, '-=0.08')

    ScrollTrigger.refresh()
  })
})

onBeforeUnmount(() => {
  cleanupHomeMotion?.()
})
```

- [ ] **Step 2: Add template classes and ref**

Change the root wrapper and the first two sections:

```vue
<div ref="homeRef">
  <HeroZine />
  <section class="pain-flyer" aria-labelledby="dolores-title">
    <div class="pain-flyer__sheet container">
      <p class="eyebrow">Si esto te suena</p>
      <h2 id="dolores-title">Deja de aprender con videos sueltos.</h2>
      <div class="note-grid">
        <article class="note"><h3>No sabes qué practicar</h3><p>Ordenamos técnica, ritmo y canciones para que cada semana tenga foco.</p></article>
        <article class="note"><h3>Te cuesta cambiar acordes</h3><p>Trabajamos movimientos concretos, tempo lento y progresiones reales.</p></article>
        <article class="note"><h3>Sientes que no avanzas</h3><p>Detectamos el bloqueo y armamos ejercicios que se conectan con música.</p></article>
      </div>
    </div>
  </section>
  <section class="section container services-stage" aria-labelledby="servicios-title">
```

- [ ] **Step 3: Add focused scoped CSS for the pinned flyer and services stage**

Add below the existing shared `h2` rule:

```css
.pain-flyer {
  min-height: 100svh;
  display: grid;
  align-items: center;
  overflow: clip;
  padding: clamp(24px, 5vw, 48px) 0;
}

.pain-flyer__sheet {
  position: relative;
  min-height: min(760px, calc(100svh - 48px));
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: clamp(28px, 6vw, 72px);
  border: 3px solid var(--ink);
  background:
    radial-gradient(circle at 18% 20%, color-mix(in srgb, var(--red) 22%, transparent) 0 8rem, transparent 8.2rem),
    radial-gradient(circle at 88% 18%, color-mix(in srgb, var(--acid) 26%, transparent) 0 7rem, transparent 7.2rem),
    linear-gradient(135deg, var(--paper) 0%, var(--paper-aged) 100%);
  color: var(--ink);
  box-shadow: 18px 18px 0 var(--red);
  isolation: isolate;
}

.pain-flyer__sheet::before {
  content: '';
  position: absolute;
  inset: 0;
  z-index: -1;
  opacity: 0.18;
  background-image: radial-gradient(circle, var(--ink) 0 1px, transparent 1.4px);
  background-size: 8px 8px;
}

.pain-flyer .eyebrow {
  color: var(--red);
}

.services-stage {
  min-height: 100svh;
  display: flex;
  flex-direction: column;
  justify-content: center;
}
```

- [ ] **Step 4: Keep mobile/reduced-motion readable**

Extend the existing media query with full-screen but non-fragile styles:

```css
@media (max-width: 860px) {
  .pain-flyer { min-height: auto; padding: 64px 0; }
  .pain-flyer__sheet { min-height: auto; box-shadow: 6px 8px 0 var(--red); }
  .services-stage { min-height: auto; }
}
```

- [ ] **Step 5: Verify**

Run:

```bash
pnpm test:frontend
pnpm generate
```

Expected:
- `Frontend regression checks passed`
- Nuxt generates the static site successfully.

---

## Self-Review

- Spec coverage: The plan covers pinned full-screen flyer, phrase reveal, sticker note reveal, connected service-section headline scale, reduced-motion fallback through existing composable, and minimal scope.
- Placeholder scan: No placeholders remain.
- Scope check: Single-file change plus existing verification commands; no new dependencies or unrelated refactors.
