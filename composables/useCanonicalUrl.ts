const siteUrl = "https://riffclub.cl"

export const useCanonicalUrl = () => {
  const route = useRoute()
  const path = route.path === "/" ? "/" : route.path.replace(/\/+$/, "")

  useHead({
    link: [{ rel: "canonical", href: `${siteUrl}${path}` }]
  })
}
