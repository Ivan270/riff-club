<script setup lang="ts">
useSeoMeta({
  title: 'Clases de guitarra acústica en La Reina',
  description: 'Aprende acordes, rasgueos y canciones con clases presenciales de guitarra acústica. Escríbeme para agendar.'
})
</script>

<template>
  <ServicePage
    eyebrow="Acordes / rasgueos / ritmo"
    title="Clases de guitarra acústica en La Reina"
    lead="Aprende guitarra acústica con clases presenciales para tocar canciones, ordenar acordes y mejorar tu ritmo con una ruta clara de práctica."
    sticker="En clase"
    approach-title="Acompaña canciones sin perder el pulso."
    :body="[
      'Vemos cambios de acordes, cejillas, rasgueos, patrones rítmicos, dinámica y recursos para que puedas acompañar canciones completas con seguridad. Cada ejercicio se conecta con música real para que la práctica tenga sentido desde la primera etapa.',
      'Si ya tocas un poco, trabajamos limpieza, tempo, fluidez entre acordes y repertorio según tus gustos. Si estás empezando, armamos una base simple y progresiva para evitar frustraciones innecesarias.'
    ]"
    area="Clases presenciales en La Reina para estudiantes de comunas cercanas como Ñuñoa, Las Condes, Peñalolén, Providencia y otros sectores de Santiago Oriente."
    :related="[
      { label: 'Clases de guitarra eléctrica', to: '/clases-guitarra-electrica' },
      { label: 'Clases de bajo', to: '/clases-bajo' }
    ]"
    accent="acid"
  />
</template>
