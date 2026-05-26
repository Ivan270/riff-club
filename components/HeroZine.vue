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

<template>
  <section ref="heroRef" class="hero container" aria-labelledby="home-title">
    <div class="hero-copy">
      <span class="sticker">Clases presenciales / La Reina</span>
      <h1 id="home-title" class="display">Clases de guitarra en La Reina</h1>
      <p class="lead">Aprende guitarra eléctrica, acústica o bajo con método, canciones reales y una ruta clara para
        dejar de practicar a ciegas.</p>
      <div class="actions">
        <a class="button button-primary" :href="whatsappHref" target="_blank" rel="noopener">Agendar por WhatsApp</a>
        <NuxtLink class="button button-secondary" to="/contacto">Enviar formulario</NuxtLink>
      </div>
    </div>
    <div class="poster" aria-hidden="true">
      <i class="poster-tape tape-a"></i>
      <i class="poster-tape tape-b"></i>
      <div class="poster-local">La Reina / Santiago Oriente</div>
      <div class="string-lines"><span></span><span></span><span></span><span></span><span></span><span></span></div>
      <div class="poster-type"><span>Riff</span><span>Club</span><span>Local</span></div>
      <div class="poster-note">Guitarra electrica / acustica / bajo</div>
      <b>01</b>
    </div>
  </section>
</template>

<style scoped>
.hero {
  display: grid;
  grid-template-columns: 1.1fr .9fr;
  gap: 36px;
  align-items: center;
  min-height: 82vh;
  padding: 72px 0;
}

.lead {
  max-width: 680px;
  color: var(--muted);
  font-size: clamp(1.1rem, 2.5vw, 1.35rem);
}

.actions {
  display: flex;
  flex-wrap: wrap;
  gap: 16px;
  margin-top: 28px;
}

.poster {
  position: relative;
  min-height: 420px;
  padding: 58px 26px 28px;
  background: var(--paper);
  color: var(--ink);
  border: 3px solid var(--ink);
  box-shadow: 14px 14px 0 var(--red);
  overflow: hidden;
  transform: rotate(1deg);
}

.poster::before {
  content: "";
  position: absolute;
  inset: 0;
  z-index: 0;
  opacity: .22;
  background-image: radial-gradient(circle, var(--ink) 0 1px, transparent 1.5px);
  background-size: 7px 7px;
  mix-blend-mode: multiply;
}

.poster::after {
  content: "";
  position: absolute;
  right: -22%;
  bottom: -18%;
  z-index: 0;
  width: 72%;
  height: 54%;
  background: var(--ink);
  clip-path: polygon(15% 8%, 100% 0, 85% 100%, 0 80%);
}

.poster-tape {
  position: absolute;
  z-index: 3;
  display: block;
  width: 118px;
  height: 30px;
  background: color-mix(in srgb, var(--tape) 78%, transparent);
  border: 1px solid rgba(16, 16, 16, .16);
  box-shadow: 0 2px 0 rgba(16, 16, 16, .12);
}

.tape-a {
  top: 18px;
  left: 22px;
  transform: rotate(-9deg);
}

.tape-b {
  top: 24px;
  right: 24px;
  transform: rotate(7deg);
}

.poster-local {
  position: relative;
  z-index: 2;
  display: inline-block;
  padding: 8px 10px;
  border: 2px solid var(--ink);
  background: var(--acid);
  font: 900 .78rem/1 var(--font-mono);
  letter-spacing: .08em;
  text-transform: uppercase;
  transform: rotate(-2deg);
}

.string-lines {
  position: absolute;
  top: 92px;
  right: 18px;
  left: 18px;
  z-index: 1;
  display: grid;
  gap: 13px;
  transform: rotate(-5deg);
}

.string-lines span {
  display: block;
  height: 3px;
  background: var(--ink);
  box-shadow: 0 10px 0 rgba(16, 16, 16, .12);
}

.poster-type {
  position: relative;
  z-index: 2;
  margin-top: 34px;
}

.poster-type span {
  display: block;
  width: max-content;
  margin: 12px 0;
  padding: 9px 12px;
  background: var(--acid);
  color: var(--ink);
  font-family: var(--font-display);
  font-size: clamp(3rem, 8vw, 6rem);
  font-weight: 950;
  line-height: .76;
  text-transform: uppercase;
  letter-spacing: .01em;
  box-shadow: 6px 6px 0 var(--ink);
  transform: rotate(-3deg);
}

.poster-type span:nth-child(2) {
  margin-left: auto;
  background: var(--purple);
  color: var(--paper);
  transform: rotate(2deg);
}

.poster-type span:nth-child(3) {
  background: var(--red);
  color: var(--paper);
  transform: rotate(-1deg);
}

.poster-note {
  position: relative;
  z-index: 2;
  width: fit-content;
  margin-top: 24px;
  padding: 8px 10px;
  background: var(--ink);
  color: var(--paper);
  font: 900 .8rem/1 var(--font-mono);
  letter-spacing: .06em;
  text-transform: uppercase;
}

.poster b {
  position: absolute;
  right: 18px;
  bottom: 8px;
  z-index: 2;
  color: var(--acid);
  font-size: 7rem;
  line-height: 1;
  letter-spacing: -.12em;
}

@media (max-width: 860px) {
  .hero {
    grid-template-columns: 1fr;
    min-height: auto;
  }

  .poster {
    min-height: 340px;
    padding-inline: 18px;
  }
}
</style>
