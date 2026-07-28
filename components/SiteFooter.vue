<script setup lang="ts">
const footerRef = useTemplateRef<HTMLElement>("footerRef");
const { bindPressFeedback, runWhenMotionAllowed } = useGsapMotion();
let cleanupTimeline: (() => void) | undefined;
let cleanupButtons: (() => void) | undefined;

onMounted(async () => {
  cleanupTimeline = await runWhenMotionAllowed(footerRef, ({ gsap }) => {
    gsap.from(".footer-grid", {
      y: 30,
      opacity: 0,
      rotate: -1.5,
      duration: 0.48,
      ease: "back.out(1.4)",
      scrollTrigger: {
        trigger: footerRef.value,
        start: "top 86%",
        once: true,
      },
    });
  });

  cleanupButtons = await bindPressFeedback(
    Array.from(footerRef.value?.querySelectorAll(".button") ?? []),
  );
});

onBeforeUnmount(() => {
  cleanupTimeline?.();
  cleanupButtons?.();
});
</script>

<template>
  <footer ref="footerRef" class="footer">
    <div class="container footer-grid">
      <div>
        <p class="eyebrow">Clases presenciales</p>
        <h2>Guitarra y bajo en La Reina</h2>
        <p class="footer-stamp">La Reina / Santiago Oriente</p>
      </div>
      <p>
        Para estudiantes de La Reina, Ñuñoa, Las Condes, Peñalolén, Providencia
        y Santiago Oriente.
      </p>
      <NuxtLink class="button button-primary" to="/contacto"
        >Agendar clase</NuxtLink
      >
    </div>
    <p class="container site-credit">
      Sitio desarrollado por
      <a
        href="https://github.com/ivan270"
        target="_blank"
        rel="noopener noreferrer nofollow"
        >iVerdugo</a
      >
    </p>
  </footer>
</template>

<style scoped>
.footer {
  position: relative;
  padding: 72px 0 64px;
  border-top: 4px solid var(--section-border);
  background: linear-gradient(
    180deg,
    var(--section-bg-start) 0%,
    var(--section-bg-end) 100%
  );
  color: var(--section-text);
  overflow: hidden;
}
.footer::before,
.footer::after {
  content: "";
  position: absolute;
  inset: 18px auto auto 5%;
  width: min(520px, 70vw);
  height: 86px;
  border: 2px solid var(--paper);
  background: var(--red);
  transform: rotate(-2deg);
  opacity: 0.8;
}
.footer::after {
  inset: auto 6% 20px auto;
  width: min(420px, 62vw);
  background: var(--purple);
  transform: rotate(2deg);
}
.footer-grid {
  position: relative;
  z-index: 1;
  display: grid;
  gap: 24px;
  grid-template-columns: 1.3fr 1fr auto;
  align-items: center;
  padding: clamp(24px, 4vw, 34px);
  background: var(--section-overlay);
  border: 2px dashed var(--section-border);
  box-shadow: 9px 9px 0 var(--acid);
}
h2 {
  margin: 0;
  font-family: var(--font-display);
  font-size: var(--type-h2);
  font-weight: var(--weight-heavy);
  line-height: var(--leading-heading);
  letter-spacing: var(--tracking-heading);
}
p {
  color: var(--section-muted);
  font-family: var(--font-body);
}
.footer-stamp {
  display: inline-block;
  margin: 16px 0 0;
  padding: 8px 10px;
  color: var(--ink);
  background: var(--paper);
  border: 2px solid var(--red);
  font-family: var(--font-body);
  font-size: var(--type-label);
  font-weight: var(--weight-bold);
  line-height: 1.2;
  letter-spacing: var(--tracking-label);
  text-transform: uppercase;
  box-shadow: 4px 4px 0 var(--red);
  transform: rotate(-1deg);
}
.site-credit {
  position: relative;
  z-index: 1;
  margin-top: 22px;
  font-family: var(--font-body);
  font-size: var(--type-label);
  font-weight: var(--weight-bold);
  line-height: 1.4;
  letter-spacing: 0.04em;
  text-transform: uppercase;
}
.site-credit a {
  color: var(--section-text);
  text-decoration: underline;
  text-decoration-thickness: 2px;
  text-underline-offset: 4px;
}
@media (max-width: 820px) {
  .footer-grid {
    grid-template-columns: 1fr;
  }
}
</style>
