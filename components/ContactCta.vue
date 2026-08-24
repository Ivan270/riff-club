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
        rotate: -1,
        duration: 0.48,
        ease: "back.out(1.4)",
      })
      .from(
        ".stamp",
        {
          scale: 0.86,
          opacity: 0,
          rotate: -1,
          duration: 0.24,
          ease: "back.out(2)",
        },
        "-=0.2",
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
    <div class="cta-paper">
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
  box-shadow: 10px 10px 0 var(--red);
}
h2 {
  position: relative;
  margin: 18px 0;
  max-width: 760px;
  font-family: var(--font-display);
  font-size: var(--type-h2);
  font-weight: var(--weight-heavy);
  line-height: var(--leading-heading);
  letter-spacing: var(--tracking-heading);
}
p {
  position: relative;
  max-width: 620px;
  color: var(--ink);
  font-family: var(--font-body);
}
.actions {
  display: flex;
  flex-wrap: wrap;
  gap: 16px;
  margin-top: 22px;
}
.button-primary {
  background: var(--acid);
}
</style>
