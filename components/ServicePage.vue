<script setup lang="ts">
type Accent = 'red' | 'acid' | 'purple'

const servicePageRef = useTemplateRef<HTMLElement>('servicePageRef')
const { bindPressFeedback, runWhenMotionAllowed } = useGsapMotion()
let cleanupTimeline: (() => void) | undefined
let cleanupButtons: (() => void) | undefined

onMounted(async () => {
  cleanupTimeline = await runWhenMotionAllowed(servicePageRef, ({ gsap, ScrollTrigger }) => {
    const page = servicePageRef.value
    const animatedElements = page ? Array.from(page.querySelectorAll<HTMLElement>('.service-motion-target')) : []

    animatedElements.forEach((element, index) => {
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

  cleanupButtons = await bindPressFeedback(Array.from(servicePageRef.value?.querySelectorAll('.related-links a') ?? []))
})

onBeforeUnmount(() => {
  cleanupTimeline?.()
  cleanupButtons?.()
})

defineProps<{
  eyebrow: string
  title: string
  lead: string
  sticker: string
  approachTitle: string
  body: string[]
  area: string
  related: Array<{ label: string; to: string }>
  accent: Accent
}>()
</script>

<template>
  <div ref="servicePageRef" class="service-page" :class="`service-page--${accent}`">
    <section class="service-hero container" aria-labelledby="page-title">
      <p class="eyebrow">{{ eyebrow }}</p>
      <h1 id="page-title" class="display">{{ title }}</h1>
      <p class="lead">{{ lead }}</p>
    </section>

    <section class="section container content-grid" aria-labelledby="approach-title">
      <article class="panel main-panel flyer-panel service-motion-target">
        <span class="sticker">{{ sticker }}</span>
        <h2 id="approach-title">{{ approachTitle }}</h2>
        <p v-for="paragraph in body" :key="paragraph">{{ paragraph }}</p>
      </article>
      <aside class="panel area-panel venue-note service-motion-target" aria-labelledby="area-title">
        <h2 id="area-title">Zona de clases</h2>
        <p>{{ area }}</p>
      </aside>
    </section>

    <section class="section container related" aria-labelledby="related-title">
      <p class="eyebrow">También puedes revisar</p>
      <h2 id="related-title">Otros instrumentos</h2>
      <div class="related-links">
        <NuxtLink v-for="link in related" :key="link.to" class="service-motion-target" :to="link.to">{{ link.label }}</NuxtLink>
      </div>
    </section>

    <ContactCta />
  </div>
</template>

<style scoped>
.service-page {
  overflow: clip;
}

.service-hero {
  padding: 86px 0 56px;
}

.lead {
  max-width: 760px;
  color: var(--muted);
  font-size: var(--type-lead);
  font-weight: var(--weight-medium);
  line-height: 1.5;
}

.content-grid {
  display: grid;
  grid-template-columns: minmax(0, 1.7fr) minmax(260px, .8fr);
  gap: 24px;
  align-items: stretch;
}

.panel {
  box-sizing: border-box;
  padding: 28px;
  border: 2px solid var(--section-border);
  background: var(--section-bg);
  color: var(--section-text);
}

.main-panel {
  box-shadow: 10px 10px 0 var(--service-accent);
}

.flyer-panel {
  position: relative;
  overflow: hidden;
  background: linear-gradient(180deg, var(--section-bg-start), var(--section-bg-end));
  border-style: dashed;
}

.flyer-panel::after {
  content: '';
  position: absolute;
  inset: auto -16px -18px -16px;
  height: 34px;
  background: repeating-linear-gradient(90deg, transparent 0 16px, var(--section-border) 16px 19px);
  opacity: .28;
}

.area-panel {
  background: var(--paper);
  color: var(--ink);
  transform: rotate(1deg);
}

.venue-note {
  border-color: var(--ink);
  box-shadow: -8px 10px 0 var(--area-accent);
}

h2 {
  font-family: var(--font-heading);
  margin: 14px 0 18px;
  font-size: var(--type-h2);
  font-weight: var(--weight-heavy);
  line-height: var(--leading-heading);
  letter-spacing: var(--tracking-heading);
}

p {
  line-height: 1.65;
}

.panel p {
  color: var(--section-muted);
}

.area-panel p {
  color: var(--ink);
}

.related {
  padding-top: 36px;
}

.related-links {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 18px;
}

.related-links a {
  box-sizing: border-box;
  padding: 20px;
  background: var(--service-accent);
  color: var(--ink);
  border: 2px solid var(--ink);
  box-shadow: 6px 6px 0 var(--paper);
  font-family: var(--font-body);
  font-weight: var(--weight-semibold);
  text-decoration: none;
  clip-path: polygon(0 8%, 96% 0, 100% 92%, 4% 100%);
  transform: rotate(-1deg);
}

.related-links a:nth-child(2) {
  background: var(--paper);
  transform: rotate(1deg);
}

.service-page--red {
  --service-accent: var(--red);
  --area-accent: var(--acid);
}

.service-page--acid {
  --service-accent: var(--acid);
  --area-accent: var(--red);
}

.service-page--purple {
  --service-accent: var(--purple);
  --area-accent: var(--acid);
}

.service-page--purple .related-links a:first-child {
  color: var(--purple-link-text);
}

@media (max-width: 820px) {
  .service-hero {
    padding-top: 58px;
  }

  .content-grid,
  .related-links {
    grid-template-columns: 1fr;
  }

  .main-panel {
    box-shadow: 4px 6px 0 var(--service-accent);
  }

  .venue-note {
    box-shadow: -4px 6px 0 var(--area-accent);
  }

  .area-panel,
  .related-links a,
  .related-links a:nth-child(2) {
    transform: none;
  }

  .related-links a {
    box-shadow: 4px 5px 0 var(--paper);
  }
}
</style>
