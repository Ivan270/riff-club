<script setup lang="ts">
defineProps<{
  title: string;
  text: string;
  to: string;
  label: string;
  variant: "electric" | "acoustic" | "bass";
}>();

const stringCountByVariant = {
  electric: 6,
  acoustic: 6,
  bass: 4,
} as const;
</script>

<template>
  <article class="service-card" :class="`service-card--${variant}`">
    <div class="instrument-mark" :class="variant" aria-hidden="true">
      <span
        v-for="stringIndex in stringCountByVariant[variant]"
        :key="stringIndex"
      ></span>
    </div>
    <p class="eyebrow">{{ label }}</p>
    <h3>{{ title }}</h3>
    <p>{{ text }}</p>
    <NuxtLink :to="to" :aria-label="`Ver clases de ${title}`"
      >Ver clases -></NuxtLink
    >
  </article>
</template>

<style scoped>
.service-card {
  position: relative;
  padding: 24px;
  min-height: 300px;
  background: var(--paper);
  color: var(--ink);
  border: 2px solid var(--ink);
  box-shadow: 8px 8px 0 var(--brand-onyx);
  overflow: hidden;
}
.service-card .eyebrow {
  color: var(--ink);
}
.service-card--electric {
  box-shadow: 8px 8px 0 var(--acid);
}
.service-card--bass {
  box-shadow: 8px 8px 0 var(--purple);
}
h3 {
  margin: 18px 0 10px;
  font-family: var(--font-display);
  font-size: var(--type-h3);
  font-weight: var(--weight-bold);
  line-height: 1.08;
  letter-spacing: -0.015em;
}
a {
  font-family: var(--font-ui);
  font-weight: var(--weight-semibold);
}
.instrument-mark {
  position: relative;
  height: 78px;
  margin: -6px -4px 20px;
  border: 2px solid var(--ink);
  background: var(--paper-aged);
  overflow: hidden;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 7px;
  padding: 0 18px;
}
.instrument-mark span {
  display: block;
  flex: 0 0 auto;
  width: 100%;
  height: 3px;
  background: var(--ink);
}
.instrument-mark.electric {
  background: var(--acid);
}
.instrument-mark.acoustic {
  background: linear-gradient(90deg, var(--paper-aged), var(--brand-sand));
}
.instrument-mark.bass {
  background: var(--purple);
}
</style>
