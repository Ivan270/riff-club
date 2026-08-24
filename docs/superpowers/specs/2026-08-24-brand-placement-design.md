# Distribucion de marca en navbar y Hero

## Objetivo

Uniformar la presencia de Riff Club usando cada pieza del sistema de marca en el contexto donde aporta mayor legibilidad: badge compacto en el navbar y logotipo horizontal dentro del poster del Hero.

## Navbar

El logotipo horizontal actual se reemplazara por el badge circular. Se usaran los masters oficiales segun el fondo del tema:

- Tema oscuro, fondo Onyx: `badge-v-circular-negative.svg`.
- Tema claro, fondo Old Lace: `badge-v-circular-positive.svg`.

El badge medira entre 68 y 72 px para mantener compacto el navbar sticky. Esta aplicacion constituye una excepcion aprobada al minimo oficial de 96 px del badge. El enlace conservara su destino a inicio, su etiqueta accesible y una imagen con `alt="Riff Club"`.

## Hero

El poster derecho mantendra su composicion editorial, cintas, rotacion, textura, ubicacion, lineas de guitarra y nota inferior. Los textos graficos `Riff`, `Club` y `01` se reemplazaran por el logotipo horizontal Onyx, apropiado para la superficie Old Lace del poster.

El logotipo sera la firma visual principal del Hero. Se dimensionara de forma fluida sin deformacion y respetando el ancho minimo de 180 px cuando el viewport lo permita. En pantallas estrechas podra reducirse solo hasta el ancho disponible del poster.

Como el nombre de la marca y el contenido de la pagina ya estan expresados por el encabezado y el navbar, el logo del poster sera decorativo y usara `alt=""` con `aria-hidden="true"`.

## Movimiento

La animacion existente del poster se conservara. El nuevo logotipo horizontal tendra una entrada breve dentro de la secuencia actual, sustituyendo la animacion por letras de `.poster-type span`. No se agregaran nuevas dependencias ni movimiento continuo. La preferencia de movimiento reducido seguira gestionada por `useGsapMotion`.

## Navegacion movil

El boton movil conservara el isotipo estandar a 52 px. El panel expandido conservara el logotipo horizontal tematico. El badge compacto se aplicara solamente a la marca principal del navbar.

## Favicon

El favicon nuevo ya esta integrado en SVG, ICO y PNG, junto con Apple Touch Icon, manifest, Safari pinned tab y metadatos Open Graph. Esta fase solo verificara que dichas referencias sigan presentes; no duplicara ni reemplazara esos recursos.

## Activos

Solo se agregaran al directorio publico:

- `badge-v-circular-negative.svg` como variante para navbar oscuro.
- `badge-v-circular-positive.svg` como variante para navbar claro.

Se reutilizara el logotipo horizontal Onyx ya publicado como `/logo-full-light.svg` para el poster Old Lace.

## Validacion

- Confirmar el cambio correcto de badge al alternar tema claro y oscuro.
- Comprobar que el navbar mantiene una altura compacta y que no recorta el badge.
- Verificar el Hero en escritorio y movil, sin deformacion ni desbordamiento del logo.
- Confirmar que navbar, menu movil y todas las rutas siguen siendo navegables.
- Verificar que favicon, manifest y recursos sociales continuan respondiendo correctamente.
- Ejecutar la regresion frontend, la generacion estatica y una prueba real con `pnpm dev`.
