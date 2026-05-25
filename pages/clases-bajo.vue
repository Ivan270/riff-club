<script setup lang="ts">
useSeoMeta({
  title: 'Clases de bajo en Santiago | Profesor',
  description: 'Clases presenciales de bajo para trabajar groove, ritmo y técnica. Cerca de La Reina y Santiago Oriente.'
})
</script>

<template>
  <div class="service-page">
    <section class="service-hero container" aria-labelledby="page-title">
      <p class="eyebrow">Groove / ritmo / técnica</p>
      <h1 id="page-title" class="display">Clases de bajo en Santiago</h1>
      <p class="lead">
        Aprende bajo con clases presenciales enfocadas en groove, ritmo, técnica y el rol real del bajista dentro de
        una canción.
      </p>
    </section>

    <section class="section container content-grid" aria-labelledby="approach-title">
      <article class="panel main-panel flyer-panel">
        <span class="sticker">En clase</span>
        <h2 id="approach-title">Construye la base que mueve la canción.</h2>
        <p>
          Trabajamos digitación, coordinación, muting, subdivisión, tempo, líneas simples y recursos para tocar con
          buen pulso. La meta es entender cómo el bajo sostiene la armonía y conversa con la batería, no solo memorizar
          notas aisladas.
        </p>
        <p>
          Puedes empezar desde cero o profundizar en canciones, técnica aplicada, lectura básica de cifrados y creación
          de líneas de bajo para distintos estilos.
        </p>
      </article>
      <aside class="panel area-panel venue-note" aria-labelledby="area-title">
        <h2 id="area-title">Zona de clases</h2>
        <p>
          Clases presenciales cerca de La Reina para estudiantes de Santiago Oriente, incluyendo Ñuñoa, Las Condes,
          Peñalolén, Providencia y comunas cercanas.
        </p>
      </aside>
    </section>

    <section class="section container related" aria-labelledby="related-title">
      <p class="eyebrow">También puedes revisar</p>
      <h2 id="related-title">Otros instrumentos</h2>
      <div class="related-links">
        <NuxtLink to="/clases-guitarra-electrica">Clases de guitarra eléctrica</NuxtLink>
        <NuxtLink to="/clases-guitarra-acustica">Clases de guitarra acústica</NuxtLink>
      </div>
    </section>

    <ContactCta />
  </div>
</template>

<style scoped>
.service-hero {
  padding: 86px 0 56px;
}

.lead {
  max-width: 760px;
  color: var(--muted);
  font-size: clamp(1.15rem, 2.5vw, 1.55rem);
  line-height: 1.45;
}

.content-grid {
  display: grid;
  grid-template-columns: minmax(0, 1.7fr) minmax(260px, .8fr);
  gap: 24px;
  align-items: stretch;
}

.panel {
  box-sizing: border-box;
  max-width: calc(100% - 12px);
  padding: 28px;
  border: 2px solid var(--paper);
  background: #151515;
}

.main-panel {
  box-shadow: 10px 10px 0 var(--purple);
}

.flyer-panel {
  position: relative;
  overflow: hidden;
  background: linear-gradient(180deg, #181818, #0b0b0b);
  border-style: dashed;
}

.flyer-panel::after {
  content: '';
  position: absolute;
  inset: auto -16px -18px -16px;
  height: 34px;
  background: repeating-linear-gradient(90deg, transparent 0 16px, var(--paper) 16px 19px);
  opacity: .28;
}

.area-panel {
  background: var(--paper);
  color: var(--ink);
  transform: rotate(1deg);
}

.venue-note {
  box-shadow: -8px 10px 0 var(--acid);
  border-color: var(--ink);
}

h2 {
  margin: 14px 0 18px;
  font-size: clamp(2.1rem, 6vw, 4.8rem);
  line-height: .86;
  letter-spacing: -.08em;
  text-transform: uppercase;
}

p {
  line-height: 1.65;
}

.panel p {
  color: var(--muted);
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
  max-width: calc(100% - 12px);
  padding: 20px;
  background: var(--purple);
  color: var(--ink);
  border: 2px solid var(--ink);
  box-shadow: 6px 6px 0 var(--paper);
  font-weight: 950;
  text-transform: uppercase;
  text-decoration: none;
  clip-path: polygon(0 8%, 96% 0, 100% 92%, 4% 100%);
  transform: rotate(-1deg);
}

.related-links a:nth-child(2) {
  background: var(--paper);
  transform: rotate(1deg);
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
    box-shadow: 4px 6px 0 var(--purple);
  }

  .venue-note {
    box-shadow: -4px 6px 0 var(--acid);
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
