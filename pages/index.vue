<script setup lang="ts">
useSeoMeta({
  title: 'Clases de guitarra en La Reina | Profesor',
  description: 'Clases presenciales de guitarra y bajo en La Reina. Aprende con método, canciones reales y agenda por WhatsApp.',
  ogTitle: 'Clases de guitarra en La Reina | Profesor',
  ogDescription: 'Clases presenciales de guitarra y bajo en La Reina. Aprende con método, canciones reales y agenda por WhatsApp.'
})

useHead({
  script: [
    {
      type: 'application/ld+json',
      textContent: JSON.stringify({
        '@context': 'https://schema.org',
        '@type': ['LocalBusiness', 'EducationalOrganization'],
        name: 'Riff Club Local - Clases de guitarra y bajo',
        description: 'Clases presenciales de guitarra eléctrica, guitarra acústica y bajo en La Reina, Santiago de Chile.',
        areaServed: ['La Reina', 'Ñuñoa', 'Las Condes', 'Peñalolén', 'Providencia', 'Santiago Oriente'],
        address: { '@type': 'PostalAddress', addressLocality: 'La Reina', addressRegion: 'Región Metropolitana', addressCountry: 'CL' },
        geo: { '@type': 'GeoCoordinates', latitude: -33.441, longitude: -70.535 },
        url: 'https://example.com/',
        sameAs: [],
        makesOffer: [
          { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Clases de guitarra eléctrica' } },
          { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Clases de guitarra acústica' } },
          { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Clases de bajo' } }
        ]
      })
    }
  ]
})
</script>

<template>
  <div>
    <HeroZine />
    <section class="section container" aria-labelledby="dolores-title">
      <p class="eyebrow">Si esto te suena</p>
      <h2 id="dolores-title">Deja de aprender con videos sueltos.</h2>
      <div class="note-grid">
        <article class="note"><h3>No sabes qué practicar</h3><p>Ordenamos técnica, ritmo y canciones para que cada semana tenga foco.</p></article>
        <article class="note"><h3>Te cuesta cambiar acordes</h3><p>Trabajamos movimientos concretos, tempo lento y progresiones reales.</p></article>
        <article class="note"><h3>Sientes que no avanzas</h3><p>Detectamos el bloqueo y armamos ejercicios que se conectan con música.</p></article>
      </div>
    </section>
    <section class="section container" aria-labelledby="servicios-title">
      <p class="eyebrow">Elige tu instrumento</p>
      <h2 id="servicios-title">Clases presenciales cerca de Santiago Oriente.</h2>
      <div class="service-grid">
        <ServiceCard title="Guitarra eléctrica" label="Riffs / técnica" text="Riffs, rock, técnica, sonido, improvisación y canciones que dan ganas de practicar." to="/clases-guitarra-electrica" variant="electric" />
        <ServiceCard title="Guitarra acústica" label="Acordes / canciones" text="Acompañamiento, rasgueos, acordes, ritmo y repertorio para tocar desde la primera etapa." to="/clases-guitarra-acustica" variant="acoustic" />
        <ServiceCard title="Bajo" label="Groove / ritmo" text="Base rítmica, digitación, groove, canciones y técnica aplicada al rol del bajista." to="/clases-bajo" variant="bass" />
      </div>
    </section>
    <section class="section container method setlist-panel" aria-labelledby="metodo-title">
      <span class="sticker">Método sin relleno</span>
      <h2 id="metodo-title">Diagnóstico, ruta y canciones reales.</h2>
      <p>Las clases se adaptan a tu nivel, pero no son improvisadas: definimos objetivos, corregimos técnica y usamos canciones para que la práctica tenga sentido.</p>
    </section>
    <ContactCta />
  </div>
</template>

<style scoped>
h2 { font-size: clamp(2.6rem, 8vw, 6rem); line-height: .82; letter-spacing: -.08em; text-transform: uppercase; margin: 12px 0 28px; }
.note-grid, .service-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 22px; }
.note { position: relative; box-sizing: border-box; max-width: calc(100% - 12px); padding: 24px; border: 2px solid var(--ink); background: var(--paper); color: var(--ink); box-shadow: 8px 8px 0 #000; transform: rotate(-1.5deg); }
.note:nth-child(2) { transform: rotate(1deg); }
.note:nth-child(3) { transform: rotate(-.5deg); }
.note::before { content: ''; position: absolute; top: -11px; left: 24px; width: 72px; height: 20px; background: color-mix(in srgb, var(--acid) 78%, white); border: 1px solid var(--ink); transform: rotate(-3deg); }
.note h3 { color: var(--ink); font-size: 1.4rem; text-transform: uppercase; }
.note p { color: #272727; }
.method p { color: var(--muted); }
.method { background: #050505; padding-inline: 24px; border-left: 8px solid var(--red); }
.setlist-panel { position: relative; box-sizing: border-box; max-width: calc(100% - 12px); border: 2px solid var(--paper); box-shadow: 12px 12px 0 var(--red); background: linear-gradient(135deg, #050505 0 78%, rgba(218, 255, 0, .16) 78% 100%); }
.setlist-panel::after { content: 'setlist'; position: absolute; right: 18px; top: 18px; padding: 5px 10px; border: 1px solid var(--paper); color: var(--paper); font-size: .78rem; font-weight: 950; letter-spacing: .18em; text-transform: uppercase; transform: rotate(4deg); }
@media (max-width: 860px) { .note-grid, .service-grid { grid-template-columns: 1fr; } .note, .note:nth-child(2), .note:nth-child(3) { transform: none; box-shadow: 4px 6px 0 #000; } .setlist-panel { box-shadow: 4px 6px 0 var(--red); } .setlist-panel::after { position: static; display: inline-block; margin-top: 18px; } }
</style>
