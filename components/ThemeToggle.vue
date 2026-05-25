<script setup lang="ts">
const { theme, themeLabel, toggleTheme } = useTheme()
</script>

<template>
  <button class="theme-toggle" type="button" :aria-label="themeLabel" :aria-pressed="theme === 'light'" @click="toggleTheme">
    <span aria-hidden="true">{{ theme === 'dark' ? 'Oscuro' : 'Claro' }}</span>
  </button>
</template>

<style scoped>
.theme-toggle {
  display: inline-flex;
  min-height: 44px;
  align-items: center;
  justify-content: center;
  padding: 9px 12px;
  border: 2px solid var(--paper);
  background: var(--paper);
  color: var(--ink);
  box-shadow: 4px 4px 0 var(--acid);
  cursor: pointer;
  font: 900 .78rem/1 var(--font-mono);
  letter-spacing: .08em;
  text-transform: uppercase;
  transform: rotate(-1deg);
}

.theme-toggle[aria-pressed='true'] {
  background: var(--acid);
  box-shadow: 4px 4px 0 var(--red);
}
</style>
