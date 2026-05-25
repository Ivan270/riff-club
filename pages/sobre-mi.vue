<script setup lang="ts">
useSeoMeta({ title: 'Profesor de guitarra y bajo en La Reina', description: 'Conoce el método de clases personalizadas para guitarra eléctrica, acústica y bajo en Santiago Oriente.' })
</script>

<template>
  <div>
    <section class="section container">
      <span class="sticker">Método cercano y directo</span>
      <h1 class="display">Profesor de guitarra y bajo en La Reina</h1>
      <p class="lead">Las clases combinan diagnóstico, objetivos claros y canciones reales para que cada estudiante entienda qué practicar y por qué.</p>
    </section>
    <section class="section container setlist-steps">
      <article><h2>1. Diagnóstico</h2><p>Revisamos nivel, intereses, técnica, ritmo y bloqueos actuales.</p></article>
      <article><h2>2. Ruta</h2><p>Definimos ejercicios y canciones conectadas con tus metas.</p></article>
      <article><h2>3. Práctica guiada</h2><p>Te llevas indicaciones simples para avanzar entre clases sin perder foco.</p></article>
    </section>
    <ContactCta />
  </div>
</template>

<style scoped>
.lead, .setlist-steps p { color: var(--muted); max-width: 760px; }
.setlist-steps { display: grid; gap: 22px; grid-template-columns: repeat(3, 1fr); counter-reset: setlist; }
article { position: relative; box-sizing: border-box; max-width: calc(100% - 12px); padding: 52px 24px 24px; background: var(--paper); color: var(--ink); border: 2px solid var(--ink); box-shadow: 8px 8px 0 #000; transform: rotate(-1.5deg); }
article:nth-child(2) { transform: rotate(1deg); }
article:nth-child(3) { transform: rotate(-.5deg); }
article::before { counter-increment: setlist; content: counter(setlist, decimal-leading-zero); position: absolute; top: 14px; left: 18px; color: var(--red); font-size: .9rem; font-weight: 950; letter-spacing: .18em; }
article p { color: #272727; }
h2 { text-transform: uppercase; }
@media (max-width: 860px) { .setlist-steps { grid-template-columns: 1fr; } article, article:nth-child(2), article:nth-child(3) { transform: none; box-shadow: 4px 6px 0 #000; } }
</style>
