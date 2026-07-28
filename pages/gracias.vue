<script setup lang="ts">
useSeoMeta({
  title: 'Mensaje enviado | Riff Club',
  robots: 'noindex, nofollow'
})
</script>

<template>
  <section class="section container thank-you" aria-labelledby="thank-you-title">
    <span class="sticker">Mensaje recibido</span>
    <h1 id="thank-you-title" class="display">Gracias por escribir</h1>
    <p class="lead">
      Recibí tus datos. Te responderé para coordinar instrumento, nivel y horario.
    </p>
    <div class="actions">
      <NuxtLink class="button button-primary" to="/">Volver al inicio</NuxtLink>
      <NuxtLink class="button button-secondary" to="/contacto">Ver contacto</NuxtLink>
    </div>
  </section>
</template>

<style scoped>
.thank-you {
  min-height: 60vh;
  display: grid;
  align-content: center;
  justify-items: start;
}

.lead {
  max-width: 680px;
  color: var(--muted);
}

.actions {
  display: flex;
  flex-wrap: wrap;
  gap: 16px;
  margin-top: 24px;
}
</style>
