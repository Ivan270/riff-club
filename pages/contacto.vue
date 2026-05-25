<script setup lang="ts">
const faqs = [
  { q: '¿Las clases son presenciales?', a: 'Sí. Las clases son presenciales en La Reina, Santiago de Chile.' },
  { q: '¿Puedo tomar clases si vivo en Ñuñoa o Las Condes?', a: 'Sí. Muchos estudiantes pueden venir desde Ñuñoa, Las Condes, Peñalolén, Providencia y otros sectores de Santiago Oriente.' },
  { q: '¿Necesito saber tocar antes de empezar?', a: 'No. Puedes partir desde cero en guitarra eléctrica, guitarra acústica o bajo.' },
  { q: '¿También sirven para nivel intermedio?', a: 'Sí. Trabajamos técnica, ritmo, repertorio, sonido y una ruta de práctica según tu nivel.' }
]

useSeoMeta({ title: 'Contacto | Clases de guitarra en La Reina', description: 'Agenda clases presenciales de guitarra o bajo en La Reina. Escríbeme por WhatsApp o envía el formulario.' })

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
      <form class="contact-form-card" name="contacto" method="POST" action="https://formspree.io/f/your-form-id">
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
.contact { display: grid; grid-template-columns: 1fr 420px; gap: 36px; align-items: start; }
.contact p, details p { color: var(--muted); }
form { display: grid; gap: 14px; padding: 22px; background: var(--paper); color: var(--ink); box-shadow: 8px 8px 0 var(--red); }
.contact-form-card { position: relative; box-sizing: border-box; max-width: calc(100% - 12px); border: 2px solid var(--ink); transform: rotate(1deg); }
.contact-form-card::before { content: ''; position: absolute; top: -12px; left: 28px; width: 86px; height: 22px; background: color-mix(in srgb, var(--acid) 72%, white); border: 1px solid var(--ink); transform: rotate(-4deg); }
label { display: grid; gap: 6px; font-weight: 900; }
input, textarea { box-sizing: border-box; width: 100%; padding: 12px; border: 2px solid var(--ink); background: var(--paper); color: var(--ink); font: inherit; }
h2 { font-size: clamp(2.5rem, 8vw, 5rem); line-height: .82; text-transform: uppercase; letter-spacing: -.08em; }
.faq-row { position: relative; box-sizing: border-box; max-width: calc(100% - 12px); margin-bottom: 14px; padding: 18px 20px; border: 2px solid var(--paper); background: #111; box-shadow: 6px 6px 0 #000; }
.faq-row::before { content: ''; position: absolute; top: -8px; right: 26px; width: 18px; height: 18px; border: 2px solid var(--paper); border-radius: 50%; background: var(--red); }
.faq-row:nth-child(even) { transform: rotate(.5deg); }
.faq-row:nth-child(odd) { transform: rotate(-.5deg); }
summary { cursor: pointer; font-weight: 900; font-size: 1.2rem; }
@media (max-width: 860px) { .contact { grid-template-columns: 1fr; } .contact-form-card { transform: none; box-shadow: 4px 6px 0 var(--red); } .faq-row, .faq-row:nth-child(even), .faq-row:nth-child(odd) { transform: none; box-shadow: 4px 5px 0 #000; } }
</style>
