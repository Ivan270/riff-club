<script setup lang="ts">
useSeoMeta({
  title: 'Clases de bajo en Santiago | Profesor',
  description: 'Clases presenciales de bajo para trabajar groove, ritmo y técnica. Cerca de La Reina y Santiago Oriente.'
})

useCanonicalUrl()
</script>

<template>
  <ServicePage
    eyebrow="Groove / ritmo / técnica"
    title="Clases de bajo en Santiago"
    lead="Aprende bajo con clases presenciales enfocadas en groove, ritmo, técnica y el rol real del bajista dentro de una canción."
    sticker="En clase"
    approach-title="Construye la base que mueve la canción."
    :body="[
      'Trabajamos digitación, coordinación, muting, subdivisión, tempo, líneas simples y recursos para tocar con buen pulso. La meta es entender cómo el bajo sostiene la armonía y conversa con la batería, no solo memorizar notas aisladas.',
      'Puedes empezar desde cero o profundizar en canciones, técnica aplicada, lectura básica de cifrados y creación de líneas de bajo para distintos estilos.'
    ]"
    area="Clases presenciales cerca de La Reina para estudiantes de Santiago Oriente, incluyendo Ñuñoa, Las Condes, Peñalolén, Providencia y comunas cercanas."
    :related="[
      { label: 'Clases de guitarra eléctrica', to: '/clases-guitarra-electrica' },
      { label: 'Clases de guitarra acústica', to: '/clases-guitarra-acustica' }
    ]"
    accent="purple"
  />
</template>
