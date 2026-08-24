# Integracion de activos de logo

## Objetivo

Actualizar la identidad visual del sitio Nuxt usando solo los activos de marca que la aplicacion consume actualmente, evitando copiar el paquete web completo y retirar los archivos antiguos sin uso.

## Mapeo de activos

- Header sobre tema oscuro/Onyx: `01-master-dark/logotipo-horizontal.svg`, publicado como `/logo-full-dark.svg`.
- Header sobre tema claro/Old Lace: `02-master-light/logotipo-horizontal.svg`, publicado como `/logo-full-light.svg`.
- Boton de navegacion movil de 52 px: `masters/isotipo/isotipo.svg`, publicado como `/isotype-dark.svg` y `/isotype-light.svg` para conservar la API actual del componente.
- Favicon principal: `web/favicon.svg`, publicado como `/favicon.svg`.
- Fallbacks de favicon: `web/favicon.ico`, `web/favicon-16x16.png` y `web/favicon-32x32.png`.
- Apple Touch Icon: `web/apple-touch-icon.png`.
- PWA: `web/site.webmanifest`.
- Open Graph: `web/og-image.png`.
- Safari pinned tab: `web/safari-pinned-tab.svg`.

El isotipo micro, badge, logotipos verticales, variantes de campaña, iconos PWA no referenciados y avatares sociales quedan fuera de este cambio porque no tienen consumidores en la aplicacion.

## Integracion Nuxt

Se conservaran los nombres de archivo publicos que ya usa `SiteHeader.vue` y `MobileMenu.vue`, evitando cambios de logica y URLs innecesarios. `nuxt.config.ts` registrara el manifest, los fallbacks de favicon, Apple Touch Icon, Safari pinned tab y `og:image`. Las rutas deben ser absolutas desde `/` para funcionar tanto en desarrollo como en el prerender de Netlify.

## Rendimiento y limpieza

Los activos antiguos reemplazados se eliminaran de `public/`. No se copiara la carpeta `web/` completa. Se verificara que no existan referencias a archivos retirados y que todos los archivos registrados se incluyan en la salida prerenderizada.

## Validacion

- Buscar referencias a nombres de logos antiguos y rutas publicas inexistentes.
- Ejecutar el build de Nuxt y el prerender configurado.
- Revisar que la salida contenga los logos, iconos, manifest y `og-image` seleccionados.
