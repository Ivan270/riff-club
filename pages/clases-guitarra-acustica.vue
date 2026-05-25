<script setup lang="ts">
useSeoMeta({
  title: 'Clases de guitarra acústica en La Reina',
  description: 'Aprende acordes, rasgueos y canciones con clases presenciales de guitarra acústica. Escríbeme para agendar.'
})
</script>

<template>
  <div class="service-page">
    <section class="service-hero container" aria-labelledby="page-title">
      <p class="eyebrow">Acordes / rasgueos / ritmo</p>
      <h1 id="page-title" class="display">Clases de guitarra acústica en La Reina</h1>
      <p class="lead">
        Aprende guitarra acústica con clases presenciales para tocar canciones, ordenar acordes y mejorar tu ritmo
        con una ruta clara de práctica.
      </p>
    </section>

    <section class="section container content-grid" aria-labelledby="approach-title">
      <article class="panel main-panel flyer-panel">
        <span class="sticker">En clase</span>
        <h2 id="approach-title">Acompaña canciones sin perder el pulso.</h2>
        <p>
          Vemos cambios de acordes, cejillas, rasgueos, patrones rítmicos, dinámica y recursos para que puedas
          acompañar canciones completas con seguridad. Cada ejercicio se conecta con música real para que la práctica
          tenga sentido desde la primera etapa.
        </p>
        <p>
          Si ya tocas un poco, trabajamos limpieza, tempo, fluidez entre acordes y repertorio según tus gustos. Si
          estás empezando, armamos una base simple y progresiva para evitar frustraciones innecesarias.
        </p>
      </article>
      <aside class="panel area-panel venue-note" aria-labelledby="area-title">
        <h2 id="area-title">Zona de clases</h2>
        <p>
          Clases presenciales en La Reina para estudiantes de comunas cercanas como Ñuñoa, Las Condes, Peñalolén,
          Providencia y otros sectores de Santiago Oriente.
        </p>
      </aside>
    </section>

    <section class="section container related" aria-labelledby="related-title">
      <p class="eyebrow">También puedes revisar</p>
      <h2 id="related-title">Otros instrumentos</h2>
      <div class="related-links">
        <NuxtLink to="/clases-guitarra-electrica">Clases de guitarra eléctrica</NuxtLink>
        <NuxtLink to="/clases-bajo">Clases de bajo</NuxtLink>
      </div>
    </section>

    <ContactCta />
  </div>
</template>

<style scoped>
.service-hero {
  padding: 86px 0 56px;
}

/* h1 {
  max-width: 980px;
  margin: 14px 0 24px;
  font-size: clamp(3rem, 12vw, 8rem);
  line-height: .78;
  letter-spacing: -.09em;
  text-transform: uppercase;
} */

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
  box-shadow: 10px 10px 0 var(--acid);
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
  box-shadow: -8px 10px 0 var(--red);
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
  background: var(--red);
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
    box-shadow: 4px 6px 0 var(--acid);
  }

  .venue-note {
    box-shadow: -4px 6px 0 var(--red);
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
