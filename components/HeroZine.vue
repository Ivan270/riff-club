<script setup lang="ts">
const whatsappHref =
  "https://wa.me/56995296324?text=Hola%2C%20quiero%20consultar%20por%20clases%20presenciales%20de%20guitarra%2Fbajo%20en%20La%20Reina.%20%C2%BFTienes%20horarios%20disponibles%3F";

const heroRef = useTemplateRef<HTMLElement>("heroRef");
const { bindPressFeedback, runWhenMotionAllowed } = useGsapMotion();
let cleanupTimeline: (() => void) | undefined;
let cleanupButtons: (() => void) | undefined;

onMounted(async () => {
  cleanupTimeline = await runWhenMotionAllowed(heroRef, ({ gsap }) => {
    const timeline = gsap.timeline({ defaults: { ease: "power3.out" } });

    timeline
      .from(".hero-copy > *", {
        y: 22,
        opacity: 0,
        duration: 0.45,
        stagger: 0.08,
      })
      .from(
        ".poster",
        {
          y: 34,
          opacity: 0,
          rotate: -3,
          scale: 0.97,
          duration: 0.58,
          ease: "back.out(1.5)",
        },
        "-=0.28",
      )
      .from(
        ".poster-tape",
        { y: -18, opacity: 0, rotate: -14, duration: 0.28, stagger: 0.08 },
        "-=0.2",
      )
      .from(
        ".poster-brand",
        {
          x: -24,
          opacity: 0,
          rotate: -5,
          scale: 0.94,
          duration: 0.38,
          ease: "back.out(1.6)",
        },
        "-=0.14",
      )
      .from(
        ".string-lines span",
        {
          scaleX: 0,
          transformOrigin: "left center",
          duration: 0.32,
          stagger: 0.045,
        },
        "-=0.28",
      )
      .from(
        ".poster-local, .poster-note",
        { opacity: 0, scale: 0.92, rotate: -4, duration: 0.28, stagger: 0.06 },
        "-=0.2",
      );
  });

  cleanupButtons = await bindPressFeedback(
    Array.from(heroRef.value?.querySelectorAll(".button") ?? []),
  );
});

onBeforeUnmount(() => {
  cleanupTimeline?.();
  cleanupButtons?.();
});
</script>

<template>
  <section ref="heroRef" class="hero container" aria-labelledby="home-title">
    <div class="hero-copy">
      <span class="sticker">Clases presenciales / La Reina</span>
      <h1 id="home-title" class="display">Clases de guitarra en La Reina</h1>
      <p class="lead">
        Aprende guitarra eléctrica, acústica o bajo con método, canciones reales
        y una ruta clara para dejar de practicar a ciegas.
      </p>
      <div class="actions">
        <a
          class="button button-primary"
          :href="whatsappHref"
          target="_blank"
          rel="noopener"
          >Agendar por WhatsApp</a
        >
        <NuxtLink class="button button-secondary" to="/contacto"
          >Enviar formulario</NuxtLink
        >
      </div>
    </div>
    <div class="poster" aria-hidden="true">
      <i class="poster-tape tape-a"></i>
      <i class="poster-tape tape-b"></i>
      <div class="poster-local">La Reina / Santiago Oriente</div>
      <div class="string-lines">
        <span></span><span></span><span></span><span></span><span></span
        ><span></span>
      </div>
      <div class="poster-brand">
        <img :src="'/logo-full-light.svg'" alt="" aria-hidden="true" />
      </div>
      <div class="poster-note">Guitarra electrica / acustica / bajo</div>
    </div>
  </section>
</template>

<style scoped>
.hero {
  display: grid;
  grid-template-columns: 1.1fr 0.9fr;
  gap: 36px;
  align-items: center;
  min-height: 82vh;
  padding: 72px 0;
}

.lead {
  max-width: 680px;
  color: var(--muted);
  font-size: var(--type-lead);
  font-weight: var(--weight-medium);
  line-height: 1.5;
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
  opacity: 0.22;
  background-image: radial-gradient(
    circle,
    var(--ink) 0 1px,
    transparent 1.5px
  );
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
  border: 1px solid rgba(16, 16, 16, 0.16);
  box-shadow: 0 2px 0 rgba(16, 16, 16, 0.12);
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
  font-family: var(--font-body);
  font-size: var(--type-label);
  font-weight: var(--weight-bold);
  line-height: 1.2;
  letter-spacing: var(--tracking-label);
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
  box-shadow: 0 10px 0 rgba(16, 16, 16, 0.12);
}

.poster-brand {
  position: relative;
  z-index: 2;
  display: grid;
  place-items: center;
  min-height: 190px;
  margin-top: 30px;
  padding: 22px 16px;
  background: color-mix(in srgb, var(--paper) 84%, transparent);
  border: 3px solid var(--ink);
  box-shadow: 8px 8px 0 var(--acid);
  transform: rotate(-2deg);
}

.poster-brand img {
  display: block;
  width: min(100%, 300px);
  min-width: min(180px, 100%);
  height: auto;
}

.poster-note {
  position: relative;
  z-index: 2;
  width: fit-content;
  margin-top: 24px;
  padding: 8px 10px;
  background: var(--ink);
  color: var(--paper);
  font-family: var(--font-body);
  font-size: var(--type-label);
  font-weight: var(--weight-bold);
  line-height: 1.2;
  letter-spacing: var(--tracking-label);
  text-transform: uppercase;
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
