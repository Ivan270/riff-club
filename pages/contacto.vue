<script setup lang="ts">
const faqs = [
  { q: '¿Las clases son presenciales?', a: 'Sí. Las clases son presenciales en La Reina, Santiago de Chile.' },
  { q: '¿Puedo tomar clases si vivo en Ñuñoa o Las Condes?', a: 'Sí. Muchos estudiantes pueden venir desde Ñuñoa, Las Condes, Peñalolén, Providencia y otros sectores de Santiago Oriente.' },
  { q: '¿Necesito saber tocar antes de empezar?', a: 'No. Puedes partir desde cero en guitarra eléctrica, guitarra acústica o bajo.' },
  { q: '¿También sirven para nivel intermedio?', a: 'Sí. Trabajamos técnica, ritmo, repertorio, sonido y una ruta de práctica según tu nivel.' }
]

useSeoMeta({ title: 'Contacto | Clases de guitarra en La Reina', description: 'Agenda clases presenciales de guitarra o bajo en La Reina. Escríbeme por WhatsApp o envía el formulario.' })

useCanonicalUrl()

useHead({
  script: [
    {
      type: 'application/ld+json',
      textContent: JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        mainEntity: faqs.map((faq) => ({
          '@type': 'Question',
          name: faq.q,
          acceptedAnswer: { '@type': 'Answer', text: faq.a }
        }))
      })
    }
  ]
})
</script>

<template>
  <div>
    <section class="section container contact">
      <div>
        <span class="sticker">Contacto</span>
        <h1 class="display">Agenda tu clase</h1>
        <p>Cuéntame tu instrumento, nivel y disponibilidad. Respondo para coordinar una clase presencial en La Reina.</p>
        <a class="button button-primary" href="https://wa.me/56995296324?text=Hola%2C%20quiero%20consultar%20por%20clases%20presenciales%20de%20guitarra%2Fbajo%20en%20La%20Reina.%20%C2%BFTienes%20horarios%20disponibles%3F" target="_blank" rel="noopener">WhatsApp</a>
      </div>
      <form
        class="contact-form-card"
        name="contacto"
        method="POST"
        action="/gracias"
        data-netlify="true"
        netlify-honeypot="bot-field"
      >
        <input type="hidden" name="form-name" value="contacto">
        <p hidden>
          <label>No completar este campo <input name="bot-field" tabindex="-1" autocomplete="off"></label>
        </p>
        <label>Nombre <input name="name" autocomplete="name" required></label>
        <label>Email <input name="email" type="email" autocomplete="email" required></label>
        <label>Instrumento <input name="instrument" required></label>
        <label>Mensaje <textarea name="message" rows="5" required></textarea></label>
        <button class="button button-secondary" type="submit">Enviar formulario</button>
      </form>
    </section>
    <section class="section container" aria-labelledby="faq-title">
      <p class="eyebrow">Preguntas frecuentes</p>
      <h2 id="faq-title">Antes de escribir</h2>
      <div class="faq-list">
        <details v-for="faq in faqs" :key="faq.q" class="faq-row">
          <summary>{{ faq.q }}</summary>
          <p>{{ faq.a }}</p>
        </details>
      </div>
    </section>
  </div>
</template>

<style scoped>
.contact { display: grid; grid-template-columns: minmax(0, 1fr) minmax(320px, 420px); gap: clamp(40px, 6vw, 72px); align-items: start; }
.contact p { color: var(--muted); }
details p { color: var(--section-muted); }
form { display: grid; gap: 14px; padding: 22px; background: var(--paper); color: var(--ink); box-shadow: 8px 8px 0 var(--red); }
.contact-form-card { position: relative; box-sizing: border-box; border: 2px solid var(--ink); }
label { display: grid; gap: 6px; font-family: var(--font-body); font-weight: var(--weight-medium); }
input, textarea { box-sizing: border-box; width: 100%; padding: 12px; border: 2px solid var(--ink); background: var(--paper); color: var(--ink); font: inherit; }
h2 { font-family: var(--font-heading); font-size: var(--type-h2); font-weight: var(--weight-heavy); line-height: var(--leading-heading); letter-spacing: var(--tracking-heading); }
.faq-row { position: relative; box-sizing: border-box; margin-bottom: 14px; padding: 18px 20px; border: 2px solid var(--section-border); background: var(--section-bg); color: var(--section-text); box-shadow: 6px 6px 0 var(--brand-onyx); }
summary { cursor: pointer; font-family: var(--font-body); font-weight: var(--weight-medium); font-size: var(--type-ui); }
@media (max-width: 860px) { .contact { grid-template-columns: 1fr; } .contact-form-card { box-shadow: 4px 6px 0 var(--red); } .faq-row { box-shadow: 4px 5px 0 var(--brand-onyx); } }
</style>
