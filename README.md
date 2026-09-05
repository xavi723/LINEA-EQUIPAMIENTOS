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

## Desplegar en Vercel

No hace falta configurar nada: Vercel detecta Next.js solo.

1. Importá el repo en [vercel.com/new](https://vercel.com/new).
2. Elegí la rama.
3. Deploy.

No hay variables de entorno ni base de datos.

### Sobre el costo

El sitio está armado para no gastar cuota. Las siete rutas se
prerrenderizan como HTML estático y se sirven desde el CDN: **no hay
funciones de servidor, ni revalidación, ni optimización de imágenes en
tiempo de ejecución**. Eso deja fuera de juego los tres límites que
suelen consumirse en el plan gratuito (invocaciones, CPU activa y
transformaciones de imagen).

Lo único que se consume es tráfico: la portada pesa unos 0,6 MB la
primera vez y después queda en caché. Con el tope de 100 GB del plan
Hobby eso da del orden de 150 mil visitas por mes.

El plan Hobby **no cobra**: si llegaras a un tope, el sitio deja de
servir hasta el mes siguiente en vez de facturarte.

**La letra chica que importa:** el plan Hobby no permite uso comercial.
Para mostrar el boceto está bien. Si la empresa lo adopta como su web
real, corresponde el plan Pro (20 USD por asiento al mes). Alternativa
sin ese impedimento: Cloudflare Pages, cuyo plan gratuito sí permite uso
comercial y también despliega Next.

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
  contacto/           formulario y direcciones
components/
  ui/number-ticker.tsx  cifras que cuentan al entrar en pantalla
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

## Pendiente de confirmar con la empresa

- Los nombres de producto y las familias salen de los nombres de archivo
  de las fotos, así que son reales. Las **medidas no están**: las fichas
  dicen «Medidas y terminaciones a consultar» en vez de inventar
  milímetros. Cuando la empresa las pase, se cargan en `PRODUCTOS`.
- El catálogo son 12 piezas, las que tienen foto. El real es más grande.
- Proyectos tiene dos, los documentados con foto y crédito.
- Los teléfonos figuran en la web de la empresa sin característica;
  asumí (0341), que es la de Rosario.

## Datos de contacto

Verificados contra la página de contacto de la empresa.

| | |
|---|---|
| Showroom | Bv. Rondeau 3042 · Lun a Vie 9 a 18 h |
| | Tel (0341) 455-5606 · presupuestos@altobellovictorio.com.ar |
| Fábrica y administración | Pedro Goyena 1023 · Lun a Jue 8-12 y 13-17, Vie hasta 16 h |
| | Tel (0341) 453-0775 · administracion@altobellovictorio.com.ar |
| WhatsApp | (0341) 15-601-6491 |
| Fundación | 1959 |
