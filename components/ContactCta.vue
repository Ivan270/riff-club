<script setup lang="ts">
const whatsappHref =
  "https://wa.me/56995296324?text=Hola%2C%20quiero%20consultar%20por%20clases%20presenciales%20de%20guitarra%2Fbajo%20en%20La%20Reina.%20%C2%BFTienes%20horarios%20disponibles%3F";

const ctaRef = useTemplateRef<HTMLElement>("ctaRef");
const { bindPressFeedback, runWhenMotionAllowed } = useGsapMotion();
let cleanupTimeline: (() => void) | undefined;
let cleanupButtons: (() => void) | undefined;

onMounted(async () => {
  cleanupTimeline = await runWhenMotionAllowed(ctaRef, ({ gsap }) => {
    const timeline = gsap.timeline({
      scrollTrigger: {
        trigger: ctaRef.value,
        start: "top 82%",
        once: true,
      },
    });

    timeline
      .from(".cta-paper", {
        y: 30,
        opacity: 0,
        rotate: -3,
        duration: 0.48,
        ease: "back.out(1.4)",
      })
      .from(
        ".stamp",
        {
          scale: 0.86,
          opacity: 0,
          rotate: -8,
          duration: 0.24,
          ease: "back.out(2)",
        },
        "-=0.2",
      )
      .from(
        ".tear-offs span",
        { y: 14, opacity: 0, duration: 0.22, stagger: 0.04 },
        "-=0.12",
      );
  });

  cleanupButtons = await bindPressFeedback(
    Array.from(ctaRef.value?.querySelectorAll(".button") ?? []),
  );
});

onBeforeUnmount(() => {
  cleanupTimeline?.();
  cleanupButtons?.();
});
</script>

<template>
  <section ref="ctaRef" class="cta" aria-labelledby="cta-title">
    <div class="cta-paper tear-edge">
      <p class="stamp">Cupos presenciales</p>
      <h2 id="cta-title">¿Listo para tocar con dirección?</h2>
      <p>
        Escríbeme por WhatsApp o deja tus datos y coordinamos instrumento, nivel
        y horario.
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
      <div class="tear-offs" aria-hidden="true">
        <span></span><span></span><span></span><span></span><span></span>
      </div>
    </div>
  </section>
</template>

<style scoped>
.cta {
  margin: 48px auto;
  max-width: 940px;
  padding: 0 16px;
}
.cta-paper {
  position: relative;
  padding: clamp(28px, 6vw, 54px) clamp(22px, 5vw, 46px) 64px;
  background: var(--paper);
  color: var(--ink);
  border: 3px solid var(--ink);
  box-shadow:
    10px 10px 0 var(--purple),
    18px 18px 0 var(--acid);
  transform: rotate(-0.5deg);
}
.cta-paper::before {
  content: "";
  position: absolute;
  inset: 14px;
  pointer-events: none;
  border: 2px dashed rgba(16, 16, 16, 0.32);
}
h2 {
  position: relative;
  margin: 18px 0;
  max-width: 760px;
  font-family: var(--font-display);
  font-size: clamp(2.5rem, 9vw, 6rem);
  line-height: 0.8;
  letter-spacing: -0.03em;
  text-transform: uppercase;
}
p {
  position: relative;
  max-width: 620px;
  color: var(--ink);
}
.actions {
  display: flex;
  flex-wrap: wrap;
  gap: 16px;
  margin-top: 22px;
}
.tear-offs {
  position: absolute;
  right: clamp(18px, 5vw, 48px);
  bottom: -2px;
  left: clamp(18px, 5vw, 48px);
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 10px;
}
.tear-offs span {
  height: 34px;
  background: linear-gradient(180deg, var(--paper-aged), var(--paper));
  border: 2px solid var(--ink);
  border-bottom: 0;
  box-shadow: 3px 0 0 rgba(16, 16, 16, 0.18) inset;
}
.tear-offs span:nth-child(even) {
  transform: translateY(7px) rotate(1deg);
}
.tear-offs span:nth-child(odd) {
  transform: rotate(-1deg);
}
</style>
