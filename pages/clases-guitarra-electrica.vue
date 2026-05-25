<script setup lang="ts">
useSeoMeta({
  title: 'Clases de guitarra eléctrica en Santiago',
  description: 'Aprende riffs, técnica y canciones con clases presenciales cerca de La Reina. Agenda tu primera clase.'
})
</script>

<template>
  <ServicePage
    eyebrow="Riffs / técnica / canciones"
    title="Clases de guitarra eléctrica en Santiago"
    lead="Aprende guitarra eléctrica con clases presenciales cerca de La Reina, pensadas para avanzar con riffs, técnica aplicada y canciones reales desde el primer tramo."
    sticker="En clase"
    approach-title="Sonido, manos y repertorio con foco."
    :body="[
      'Trabajamos postura, púa, digitación, coordinación, bends, ligados, power chords y recursos para tocar riffs completos sin depender de videos sueltos. La técnica aparece conectada a canciones para que sepas exactamente por qué practicar cada ejercicio.',
      'Las clases se adaptan a tu nivel: puedes partir desde cero, ordenar lo que ya sabes o preparar canciones específicas de rock, pop, blues o estilos cercanos a tu gusto.'
    ]"
    area="Atención presencial para estudiantes de La Reina y comunas de Santiago Oriente como Ñuñoa, Las Condes, Peñalolén y Providencia."
    :related="[
      { label: 'Clases de guitarra acústica', to: '/clases-guitarra-acustica' },
      { label: 'Clases de bajo', to: '/clases-bajo' }
    ]"
    accent="red"
  />
</template>
