<script setup lang="ts">
const route = useRoute()
const isActive = (path: string) => route.path === path

const navItems = [
  { label: 'Eléctrica', to: '/clases-guitarra-electrica' },
  { label: 'Acústica', to: '/clases-guitarra-acustica' },
  { label: 'Bajo', to: '/clases-bajo' },
  { label: 'Método', to: '/sobre-mi' },
  { label: 'Contacto', to: '/contacto', cta: true }
]
</script>

<template>
  <header class="site-header tape">
    <NuxtLink class="brand" to="/" aria-label="Ir al inicio">Riff Club Local</NuxtLink>
    <nav aria-label="Navegación principal">
      <NuxtLink v-if="route.path !== '/'" class="nav-link" :class="{ active: isActive('/') }" to="/" :aria-current="isActive('/') ? 'page' : undefined">Inicio</NuxtLink>
      <NuxtLink
        v-for="item in navItems"
        :key="item.to"
        class="nav-link"
        :class="{ active: isActive(item.to), 'nav-cta': item.cta }"
        :to="item.to"
        :aria-current="isActive(item.to) ? 'page' : undefined"
      >{{ item.label }}</NuxtLink>
      <ThemeToggle />
    </nav>
  </header>
</template>

<style scoped>
.site-header {
  position: sticky;
  top: 0;
  z-index: 20;
  display: flex;
  gap: 18px;
  align-items: center;
  justify-content: space-between;
  padding: 14px 18px 16px;
  background: var(--header-bg);
  border-bottom: 3px solid var(--section-border);
  clip-path: polygon(0 0, 100% 0, 99% 100%, 91% 92%, 83% 100%, 72% 94%, 64% 100%, 55% 93%, 46% 100%, 36% 94%, 27% 100%, 18% 93%, 8% 100%, 0 96%);
  backdrop-filter: blur(10px);
  box-shadow: 0 10px 0 rgba(0, 0, 0, .3);
}

.brand {
  color: var(--acid);
  font-family: var(--font-display);
  font-size: clamp(1.2rem, 3vw, 1.8rem);
  font-weight: 950;
  line-height: .86;
  text-transform: uppercase;
  text-decoration: none;
  letter-spacing: -.05em;
  text-shadow: 2px 2px 0 var(--red);
}

nav {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  align-items: center;
  justify-content: flex-end;
  overflow: visible;
  font-size: .86rem;
}

.nav-link {
  position: relative;
  display: inline-flex;
  min-height: 44px;
  align-items: center;
  justify-content: center;
  padding: 7px 9px;
  color: var(--page-text);
  white-space: nowrap;
  text-decoration: none;
  font: 900 .86rem/1 var(--font-mono);
  letter-spacing: .03em;
  text-transform: uppercase;
}

.nav-link::after {
  content: "";
  position: absolute;
  left: 7px;
  right: 7px;
  bottom: 0;
  height: 4px;
  background: var(--acid);
  transform: scaleX(0) rotate(-1deg);
  transform-origin: left;
  transition: transform .16s ease;
}

.nav-link:hover::after,
.nav-link.active::after {
  transform: scaleX(1) rotate(-1deg);
}

.nav-link.active {
  color: var(--red);
}

.nav-cta {
  background: var(--red);
  color: var(--ink);
  border: 2px solid var(--paper);
  box-shadow: 4px 4px 0 var(--acid);
  transform: rotate(1deg);
}

.nav-cta:hover,
.nav-cta.active {
  background: var(--acid);
  color: var(--ink);
  box-shadow: 4px 4px 0 var(--red);
}

.nav-cta::after {
  background: var(--ink);
}

@media (max-width: 760px) {
  .site-header {
    align-items: flex-start;
    flex-direction: column;
  }

  nav {
    justify-content: flex-start;
    width: 100%;
  }
}
</style>
