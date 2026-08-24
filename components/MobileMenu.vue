<script setup lang="ts">
interface NavItem {
  label: string
  to: string
  cta?: boolean
}

const props = defineProps<{
  items: NavItem[]
}>()

const route = useRoute()
const { theme } = useTheme()
const isOpen = shallowRef(false)
const previousBodyOverflow = shallowRef("")
const triggerRef = useTemplateRef<HTMLButtonElement>("trigger")
const menuRef = useTemplateRef<HTMLElement>("menu")

const isActive = (path: string) => route.path === path

const getFocusableElements = () => {
  if (!menuRef.value) {
    return []
  }

  return Array.from(
    menuRef.value.querySelectorAll<HTMLElement>(
      'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])',
    ),
  )
}

const focusFirstMenuItem = () => {
  getFocusableElements()[0]?.focus()
}

const openMenu = async () => {
  previousBodyOverflow.value = document.body.style.overflow
  document.body.style.overflow = "hidden"
  isOpen.value = true
  await nextTick()
  focusFirstMenuItem()
}

const closeMenu = async () => {
  isOpen.value = false
  document.body.style.overflow = previousBodyOverflow.value
  await nextTick()
  triggerRef.value?.focus()
}

const toggleMenu = () => {
  if (isOpen.value) {
    closeMenu()
  } else {
    openMenu()
  }
}

const handleKeydown = (event: KeyboardEvent) => {
  if (!isOpen.value) {
    return
  }

  if (event.key === "Escape") {
    event.preventDefault()
    closeMenu()
    return
  }

  if (event.key !== "Tab") {
    return
  }

  const focusableElements = getFocusableElements()
  const firstElement = focusableElements[0]
  const lastElement = focusableElements[focusableElements.length - 1]

  if (!firstElement || !lastElement) {
    return
  }

  if (event.shiftKey && document.activeElement === firstElement) {
    event.preventDefault()
    lastElement.focus()
  } else if (!event.shiftKey && document.activeElement === lastElement) {
    event.preventDefault()
    firstElement.focus()
  }
}

const handleResize = () => {
  if (window.innerWidth > 900 && isOpen.value) {
    closeMenu()
  }
}

onMounted(() => {
  window.addEventListener("keydown", handleKeydown)
  window.addEventListener("resize", handleResize)
})

onBeforeUnmount(() => {
  window.removeEventListener("keydown", handleKeydown)
  window.removeEventListener("resize", handleResize)
  document.body.style.overflow = previousBodyOverflow.value
})
</script>

<template>
  <div class="mobile-menu-shell">
    <button
      ref="trigger"
      class="mobile-menu-toggle"
      type="button"
      aria-controls="mobile-menu"
      :aria-expanded="isOpen"
      :aria-label="isOpen ? 'Cerrar menú' : 'Abrir menú'"
      @click="toggleMenu"
    >
      <span class="menu-strings" aria-hidden="true">
        <span class="menu-string"></span>
        <span class="menu-string"></span>
        <span class="menu-string"></span>
      </span>
    </button>

    <Teleport to="body">
      <div
        v-if="isOpen"
        id="mobile-menu"
        ref="menu"
        class="mobile-menu"
        role="dialog"
        aria-modal="true"
        aria-label="Navegación principal"
        @click.self="closeMenu"
      >
        <div class="mobile-menu__content">
          <div class="mobile-menu__masthead">
            <img class="mobile-menu__logo" :src="theme === 'light' ? '/logo-full-light.svg' : '/logo-full-dark.svg'" alt="Riff Club" />
            <span class="mobile-menu__serial">Riff Club / 01</span>
          </div>

          <nav class="mobile-menu__nav" aria-label="Navegación móvil">
            <NuxtLink
              v-if="route.path !== '/'"
              class="mobile-menu__link"
              :class="{ active: isActive('/') }"
              to="/"
              :aria-current="isActive('/') ? 'page' : undefined"
              @click="closeMenu"
            >
              Inicio
            </NuxtLink>
            <NuxtLink
              v-for="item in props.items"
              :key="item.to"
              class="mobile-menu__link"
              :class="{ active: isActive(item.to), 'mobile-menu__link--cta': item.cta }"
              :to="item.to"
              :aria-current="isActive(item.to) ? 'page' : undefined"
              @click="closeMenu"
            >
              {{ item.label }}
            </NuxtLink>
          </nav>

          <div class="mobile-menu__footer">
            <p>Clases presenciales / La Reina</p>
            <ThemeToggle />
          </div>
        </div>
      </div>
    </Teleport>
  </div>
</template>

<style scoped>
.mobile-menu-shell {
  display: contents;
}

.mobile-menu-toggle {
  display: none;
  width: 52px;
  height: 52px;
  padding: 0;
  border: 2px solid var(--paper);
  background: var(--paper);
  box-shadow: 5px 5px 0 var(--acid);
  cursor: pointer;
  transform: rotate(1deg);
}

.menu-strings {
  display: flex;
  flex-direction: column;
  gap: 6px;
  transform: rotate(-45deg);
}

.menu-string {
  width: 28px;
  height: 3px;
  background: var(--ink);
}

.mobile-menu {
  position: fixed;
  inset: 0;
  z-index: 40;
  display: grid;
  overflow-y: auto;
  padding: 92px 16px 28px;
  background:
    radial-gradient(circle at 80% 14%, var(--red-glow) 0 9rem, transparent 9.2rem),
    linear-gradient(135deg, var(--grid-line) 0 1px, transparent 1px 22px),
    var(--page-bg);
  color: var(--page-text);
}

.mobile-menu::before {
  content: "";
  position: fixed;
  inset: 0;
  z-index: -1;
  pointer-events: none;
  opacity: 0.18;
  background-image: radial-gradient(circle, var(--grain-light) 0 1px, transparent 1.5px);
  background-size: 5px 5px;
}

.mobile-menu__content {
  width: min(100%, 720px);
  margin: auto;
}

.mobile-menu__masthead {
  display: flex;
  gap: 18px;
  align-items: end;
  justify-content: space-between;
  padding-bottom: 24px;
  border-bottom: 2px dashed var(--section-border);
}

.mobile-menu__logo {
  display: block;
  width: min(58vw, 260px);
  height: auto;
}

.mobile-menu__serial {
  color: var(--acid);
  font-family: var(--font-ui);
  font-size: var(--type-label);
  font-weight: var(--weight-bold);
  letter-spacing: var(--tracking-label);
  text-transform: uppercase;
}

.mobile-menu__nav {
  display: grid;
  gap: 10px;
  padding: 32px 0;
}

.mobile-menu__link {
  display: block;
  padding: 12px 16px;
  border: 2px solid transparent;
  color: var(--page-text);
  font-family: var(--font-ui);
  font-size: clamp(2.25rem, 10vw, 5.5rem);
  font-weight: var(--weight-heavy);
  line-height: 0.92;
  letter-spacing: var(--tracking-display);
  text-decoration: none;
}

.mobile-menu__link:hover,
.mobile-menu__link:focus-visible,
.mobile-menu__link.active {
  border-color: var(--acid);
  background: var(--acid);
  color: var(--ink);
}

.mobile-menu__link--cta {
  background: var(--red);
  color: var(--ink);
  box-shadow: 8px 8px 0 var(--acid);
  transform: rotate(-1deg);
}

.mobile-menu__footer {
  display: flex;
  gap: 18px;
  align-items: center;
  justify-content: space-between;
  padding-top: 24px;
  border-top: 2px dashed var(--section-border);
}

.mobile-menu__footer p {
  margin: 0;
  color: var(--section-muted);
  font-family: var(--font-ui);
  font-size: var(--type-label);
  font-weight: var(--weight-semibold);
  letter-spacing: var(--tracking-label);
  text-transform: uppercase;
}

@media (max-width: 900px) {
  .mobile-menu-toggle {
    position: relative;
    z-index: 60;
    display: inline-flex;
    align-items: center;
    justify-content: center;
  }
}

@media (prefers-reduced-motion: no-preference) {
  .mobile-menu {
    animation: mobile-menu-in 0.2s ease-out both;
  }

  .mobile-menu__link {
    animation: mobile-menu-link-in 0.28s ease-out both;
  }

  .mobile-menu__link:nth-child(2) {
    animation-delay: 0.03s;
  }

  .mobile-menu__link:nth-child(3) {
    animation-delay: 0.06s;
  }

  .mobile-menu__link:nth-child(4) {
    animation-delay: 0.09s;
  }

  .mobile-menu__link:nth-child(5) {
    animation-delay: 0.12s;
  }

  .mobile-menu__link:nth-child(6) {
    animation-delay: 0.15s;
  }
}

@keyframes mobile-menu-in {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

@keyframes mobile-menu-link-in {
  from {
    opacity: 0;
    transform: translateY(14px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>
