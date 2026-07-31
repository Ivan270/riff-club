const siteUrl = "https://riffclub.cl"

export const useCanonicalUrl = () => {
  const route = useRoute()
  const path = route.path === "/" || route.path.endsWith("/")
    ? route.path
    : `${route.path}/`

  useHead({
    link: [{ rel: "canonical", href: `${siteUrl}${path}` }]
  })
}
