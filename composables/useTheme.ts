type Theme = 'dark' | 'light'

const STORAGE_KEY = 'riff-club-theme'
const theme = shallowRef<Theme>('dark')

const isTheme = (value: string | null): value is Theme => value === 'dark' || value === 'light'

const applyTheme = (value: Theme) => {
  if (!import.meta.client) {
    return
  }

  document.documentElement.dataset.theme = value
  document.documentElement.style.colorScheme = value
}

export const useTheme = () => {
  const setTheme = (value: Theme) => {
    theme.value = value

    if (import.meta.client) {
      localStorage.setItem(STORAGE_KEY, value)
    }

    applyTheme(value)
  }

  const toggleTheme = () => setTheme(theme.value === 'dark' ? 'light' : 'dark')

  onMounted(() => {
    const stored = localStorage.getItem(STORAGE_KEY)
    const systemTheme: Theme = window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark'

    setTheme(isTheme(stored) ? stored : systemTheme)
  })

  const themeLabel = computed(() => (theme.value === 'dark' ? 'Activar modo claro' : 'Activar modo oscuro'))

  return {
    theme: readonly(theme),
    themeLabel,
    setTheme,
    toggleTheme
  }
}
