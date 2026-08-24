<script setup lang="ts">
const route = useRoute();
const { theme } = useTheme();
const isActive = (path: string) => route.path === path;
const horizontalLogoSrc = computed(() =>
  theme.value === "light" ? "/logo-full-light.svg" : "/logo-full-dark.svg",
);
const symbolSrc = computed(() =>
  theme.value === "light" ? "/isotype-light.svg" : "/isotype-dark.svg",
);

const navItems = [
  { label: "Eléctrica", to: "/clases-guitarra-electrica" },
  { label: "Acústica", to: "/clases-guitarra-acustica" },
  { label: "Bajo", to: "/clases-bajo" },
  { label: "Método", to: "/sobre-mi" },
  { label: "Contacto", to: "/contacto", cta: true },
];
</script>

<template>
  <header class="site-header">
    <NuxtLink class="brand" to="/" aria-label="Ir al inicio — Riff Club">
      <img class="brand-logo" :src="horizontalLogoSrc" alt="Riff Club" />
      <img class="brand-symbol" :src="symbolSrc" alt="" aria-hidden="true" />
    </NuxtLink>
    <nav aria-label="Navegación principal">
      <NuxtLink
        v-if="route.path !== '/'"
        class="nav-link"
        :class="{ active: isActive('/') }"
        to="/"
        :aria-current="isActive('/') ? 'page' : undefined"
        >Inicio</NuxtLink
      >
      <NuxtLink
        v-for="item in navItems"
        :key="item.to"
        class="nav-link"
        :class="{ active: isActive(item.to), 'nav-cta': item.cta }"
        :to="item.to"
        :aria-current="isActive(item.to) ? 'page' : undefined"
        >{{ item.label }}</NuxtLink
      >
      <ThemeToggle />
    </nav>
    <MobileMenu :items="navItems" />
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
  backdrop-filter: blur(10px);
  box-shadow: 0 10px 0 color-mix(in srgb, var(--brand-onyx) 30%, transparent);
}

.brand {
  display: inline-flex;
  flex: 0 1 auto;
  align-items: center;
  min-width: 0;
  text-decoration: none;
}

.brand-logo {
  display: block;
  width: clamp(180px, 15.3vw, 220px);
  min-width: 180px;
  height: auto;
}

.brand-symbol {
  display: none;
  width: 52px;
  height: 52px;
}

nav {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  align-items: center;
  justify-content: flex-end;
  overflow: visible;
  font-family: var(--font-ui);
  font-size: var(--type-ui);
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
  font-family: var(--font-ui);
  font-size: var(--type-ui);
  font-weight: var(--weight-medium);
  line-height: 1.2;
  letter-spacing: 0.01em;
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
  transition: transform 0.16s ease;
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

@media (max-width: 900px) {
  .site-header {
    align-items: center;
  }

  .site-header > nav {
    display: none;
  }

  .brand-logo {
    display: none;
  }

  .brand-symbol {
    display: block;
  }
}
</style>
