<script setup lang="ts">
defineProps<{
  title: string;
  text: string;
  to: string;
  label: string;
  variant: "electric" | "acoustic" | "bass";
}>();
</script>

<template>
  <article class="service-card" :class="`service-card--${variant}`">
    <div class="instrument-mark" :class="variant" aria-hidden="true">
      <span></span><span></span><span></span><span></span><span></span
      ><span></span>
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
  box-shadow: 8px 8px 0 var(--red);
  overflow: hidden;
}
.service-card .eyebrow {
  color: var(--ink);
}
.service-card--acoustic {
  transform: rotate(1deg);
  box-shadow: 8px 8px 0 var(--acid);
}
.service-card--bass {
  transform: rotate(-1deg);
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
  background: var(--acid);
  overflow: hidden;
  transform: rotate(-1deg);
}
.instrument-mark span {
  position: absolute;
  display: block;
}
.instrument-mark.electric {
  background:
    linear-gradient(
      135deg,
      transparent 0 42%,
      var(--ink) 42% 47%,
      transparent 47%
    ),
    radial-gradient(circle at 78% 48%, var(--red) 0 15px, transparent 16px),
    var(--acid);
}
.instrument-mark.electric span {
  left: 18px;
  right: 18px;
  height: 3px;
  background: var(--ink);
  transform: rotate(-8deg);
}
.instrument-mark.electric span:nth-child(1) {
  top: 18px;
}
.instrument-mark.electric span:nth-child(2) {
  top: 26px;
}
.instrument-mark.electric span:nth-child(3) {
  top: 34px;
}
.instrument-mark.electric span:nth-child(4) {
  top: 42px;
}
.instrument-mark.electric span:nth-child(5) {
  top: 50px;
}
.instrument-mark.electric span:nth-child(6) {
  top: 58px;
}
.instrument-mark.acoustic {
  background: linear-gradient(90deg, var(--paper-aged), var(--brand-sand));
  transform: rotate(1deg);
}
.instrument-mark.acoustic::before,
.instrument-mark.acoustic::after {
  content: "";
  position: absolute;
  border-radius: 50%;
}
.instrument-mark.acoustic::before {
  top: 18px;
  left: 34%;
  width: 40px;
  height: 40px;
  background: var(--ink);
  transform: translateX(-50%);
}
.instrument-mark.acoustic::after {
  top: 29px;
  left: 34%;
  width: 18px;
  height: 18px;
  background: var(--paper);
  transform: translateX(-50%);
}
.instrument-mark.acoustic span {
  left: 18px;
  right: 18px;
  height: 2px;
  background: var(--ink);
}
.instrument-mark.acoustic span:nth-child(1) {
  top: 18px;
}
.instrument-mark.acoustic span:nth-child(2) {
  top: 26px;
}
.instrument-mark.acoustic span:nth-child(3) {
  top: 34px;
}
.instrument-mark.acoustic span:nth-child(4) {
  top: 42px;
}
.instrument-mark.acoustic span:nth-child(5) {
  top: 50px;
}
.instrument-mark.acoustic span:nth-child(6) {
  top: 58px;
}
.instrument-mark.bass {
  background: linear-gradient(
    90deg,
    var(--purple) 0 38%,
    var(--ink) 38% 42%,
    var(--paper) 42% 100%
  );
  transform: rotate(-2deg);
}
.instrument-mark.bass::after {
  content: "";
  position: absolute;
  top: 50px;
  right: 22px;
  width: 18px;
  height: 18px;
  border: 4px solid var(--acid);
  border-radius: 50%;
  background: var(--ink);
}
.instrument-mark.bass span {
  left: 14px;
  right: 14px;
  height: 4px;
  background: var(--ink);
  border-radius: 999px;
}
.instrument-mark.bass span:nth-child(1) {
  top: 16px;
}
.instrument-mark.bass span:nth-child(2) {
  top: 30px;
}
.instrument-mark.bass span:nth-child(3) {
  top: 44px;
}
.instrument-mark.bass span:nth-child(4) {
  top: 58px;
}
.instrument-mark.bass span:nth-child(n + 5) {
  display: none;
}
</style>
