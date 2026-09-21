# Altobello Victorio — sitio web

Sitio de **Altobello Victorio**, muebles para oficina en Rosario desde
1959. Next.js con App Router, TypeScript y Tailwind, listo para desplegar
en Vercel.

## Arrancar

```bash
npm install
npm run dev        # http://localhost:3000
```

Otros comandos:

```bash
npm run build      # compila para producción
npm start          # sirve el build
npm run fotos      # regenera las imágenes desde fotos-originales/
```

## Desplegar

El build genera **HTML estático**, sin servidor. Sirve igual en cualquier
hosting de archivos. Hay dos caminos armados.

### GitHub Pages (gratis, permite uso comercial)

Ya hay un workflow listo en `.github/workflows/pages.yml`. Se activa una
sola vez:

1. En el repo: **Settings → Pages → Source → GitHub Actions**.
2. Listo. Cada push a la rama publica el sitio.

La URL queda en `https://<usuario>.github.io/<repo>/`. No hay secretos ni
tokens que configurar.

> El repo tiene que ser **público**. GitHub Pages sobre repos privados
> requiere plan pago.

### Vercel

1. Importá el repo en [vercel.com/new](https://vercel.com/new).
2. Elegí la rama.
3. Deploy.

Vercel detecta Next solo, no hay nada que configurar.

### Sobre el costo

El sitio está armado para no gastar cuota: las siete rutas son HTML
estático servido desde el CDN. **No hay funciones de servidor, ni
revalidación, ni optimización de imágenes en tiempo de ejecución.** Eso
deja fuera de juego los límites que suelen consumirse en los planes
gratuitos (invocaciones, CPU y transformaciones de imagen).

Lo único que se consume es tráfico: la portada pesa unos 0,6 MB la
primera vez y después queda en caché.

**La letra chica de Vercel:** su plan gratuito (Hobby) no cobra —si
llegaras a un tope, el sitio deja de servir hasta el mes siguiente en vez
de facturarte— pero **no permite uso comercial**. Para mostrar el boceto
está bien; si la empresa lo adopta como su web real, corresponde el plan
Pro. GitHub Pages y Cloudflare Pages no tienen esa restricción.

### Servirlo bajo un subdirectorio

GitHub Pages publica en `/<repo>`, no en la raíz. La variable
`NEXT_PUBLIC_BASE_PATH` maneja eso, y el workflow ya la pasa. En local y
en Vercel queda vacía.

Todo lo que salga de `public/` tiene que pasar por `img()`
(`lib/rutas.ts`): Next prefija solo lo que controla él —los `<Link>` y
sus bundles—, así que una URL escrita a mano se rompe bajo subdirectorio.

### Un detalle del build estático

«Años fabricando acá» se calcula con la fecha de compilación, no en cada
visita. Cambia una vez por año y se actualiza en el próximo deploy.

## Estructura

```
app/
  layout.tsx          cabecera, pie, panel y las tres fuentes
  globals.css         el sistema de diseño completo
  page.tsx            portada
  catalogo/           catálogo con filtros
  servicios/          diseño 3D, fabricación, instalación
  proyectos/          casos entregados
    [slug]/           página de cada proyecto con nombre, con su galería
  contacto/           formulario y direcciones
components/
  ui/number-ticker.tsx  cifras que cuentan al entrar en pantalla
  ui/gallery-animation.tsx  galería del proyecto: tira de fotos enteras
                            que se desliza, y visor a pantalla completa
  presupuesto.tsx       la lista de presupuesto (contexto + localStorage)
  header, footer, marca, foto, revelar, flecha
  catalogo-cliente.tsx  filtros y grilla
  ficha-producto.tsx    tarjeta de producto
  formulario-presupuesto.tsx
lib/
  datos.ts            empresa, categorías, productos y proyectos
  utils.ts            cn() para componer clases
public/img/           imágenes generadas
fotos-originales/     los archivos que mandó la empresa
procesar_fotos.py     genera public/img desde fotos-originales
```

Todo el contenido —datos de contacto, catálogo, proyectos— vive en
`lib/datos.ts`. Es el único archivo que hay que tocar para cambiar
textos, precios o productos.

## Sobre Tailwind y el CSS

El sistema de diseño está en `app/globals.css` como CSS plano con
variables: colores, escala tipográfica, espaciado, componentes y
movimiento. Tailwind está instalado y disponible, pero el sistema no se
tradujo a utilidades — son 950 líneas de CSS ya afinado y reescribirlo
como clases no habría mejorado nada. Tailwind sirve para lo nuevo, y
`cn()` (en `lib/utils.ts`) para componer clases, siguiendo la convención
de shadcn.

## Cómo funciona el pedido de presupuesto

No hay carrito ni precios: en muebles de oficina el precio depende del
volumen, el tapizado y el proyecto. El visitante arma una **lista de
presupuesto**, que vive en un contexto de React y persiste en
`localStorage`. Llega resumida arriba del formulario de contacto.

El formulario **no envía nada**: es una maqueta, y al enviarlo lo aclara.
Conectarlo a un mail o a un CRM es un paso posterior — la ruta natural
sería una Server Action o una API route en `app/api/`.

## Las fotos

Todas las imágenes son reales. Se generan desde `fotos-originales/`:

```bash
npm run fotos
```

Tres de las cuatro fotos de ambiente traen el texto del banner quemado en
la imagen, porque son piezas de la web actual. El script recorta las
zonas limpias en vez de taparlo, para no superponer dos titulares. El
detalle está en [`public/img/README.md`](public/img/README.md).

La portada usa una foto del showroom propio. **Los originales del
showroom miden 960 px de ancho**, así que a pantalla completa se estiran
y pierden nitidez en monitores grandes. Si la empresa tiene esa misma
foto en tamaño original, reemplazarla en `fotos-originales/Showroom
1.jpg` y correr `npm run fotos` alcanza.

## Las cifras que cuentan

`components/ui/number-ticker.tsx` anima las cifras de la portada al
entrar en pantalla, con un resorte de framer-motion. Tres diferencias con
la versión de referencia, y el motivo de cada una:

- **Sin separador de miles opcional.** Intl agrupa por defecto y el año
  salía «1.959». Los años se escriben sin separador.
- **Arranca mostrando el valor final.** El original renderiza un span
  vacío hasta que el resorte emite: sin JavaScript no se veía ningún
  número. Acá el servidor entrega la cifra.
- **El resorte es configurable.** Los valores de referencia (damping 60,
  stiffness 100) están calibrados para su demo, que cuenta hasta 100. Un
  número de cuatro cifras necesita una precisión relativa mucho más fina
  y tardaba casi cinco segundos, mostrando «1958» durante tres de ellos.
  El año usa un resorte más firme y cierra en poco más de dos segundos.

«3D» no es un número y no cuenta: queda fijo.

## De dónde sale cada texto

**Ya no queda ningún hueco marcado como pendiente.** Los textos salen de
tres lugares, en este orden:

1. **Lo que pasó la empresa**: la bajada de portada, el párrafo de «Una
   empresa familiar» y la introducción a los servicios.
2. **Su web, altobellovictorio.com.ar**: las descripciones de los
   servicios, las líneas del catálogo (Strada, Tetra, Ejecutiva,
   Comedor), los modelos y versiones de asientos que se cuentan en la
   banda de sillas, el teléfono, el WhatsApp y los horarios.
3. **Redactado para el sitio**, a partir de lo anterior: los textos de
   cierre, la bajada del catálogo, la descripción de transporte e
   instalación y el caso destacado de proyectos. No afirman nada que la
   empresa no diga en algún lado, pero conviene que los lean.

Sigue faltando, y sí hay que preguntarlo:

- Las **medidas** de los productos. Las fichas dicen «Medidas y
  terminaciones a consultar» en vez de inventar milímetros. Cuando la
  empresa las pase, se cargan en `PRODUCTOS`.
- El catálogo son 12 piezas, las que tienen foto. El real es más grande.
- Proyectos son cuatro: Coworking Banco Municipal, Don Palacios
  Construcciones, Banco Municipal y BCRlabs, todos con página propia y
  galería, con fotos que mandó la empresa. A Don Palacios y a Banco
  Municipal figuran en Rosario sin precisar la dirección, que la empresa
  no dio. Las dos tarjetas anónimas que había antes salieron: al lado de
  cuatro obras con nombre se leían como un error.
- Ojo con los dos del banco: el coworking de La Favorita y la sucursal son
  proyectos distintos para el mismo cliente.
- Para sumar un proyecto con página: poné las fotos en `fotos-originales/`,
  sumalas a `PROYECTOS` en `procesar_fotos.py` (recorta solo las bandas
  negras de los bordes, si las hay) y cargá `slug` y `fotos` con las medidas
  que imprime el script en `PROYECTOS` de `lib/datos.ts`. Si las fotos son
  verticales, `encuadre` elige qué franja se ve en la tarjeta.
- La web de la empresa publica **un solo número** para teléfono y
  WhatsApp, así que el sitio usa ese para el showroom y para la fábrica.
  Si son distintos, se corrige en `TELEFONO` (`lib/datos.ts`).

## Datos de contacto

Verificados contra la página de contacto de la empresa.

| | |
|---|---|
| Showroom | Bv. Rondeau 3042 · Lun a Vie 9 a 17 h |
| | Tel. +54 341 532 1776 · presupuestos@altobellovictorio.com.ar |
| Fábrica y administración | Pedro Goyena 1023 · Lun a Jue 9-17 h, Vie hasta 16 h |
| | Tel. +54 341 532 1776 · administracion@altobellovictorio.com.ar |
| WhatsApp | +54 341 532 1776 |
| Fundación | 1959 |
