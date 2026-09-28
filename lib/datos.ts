/**
 * Datos del sitio de Línea Equipamiento.
 *
 * REGLA: acá solo entra información que salió de la propia empresa (su
 * Instagram, su Facebook y el formulario que se completó para el sitio).
 * Lo que no se sabe no se completa con algo verosímil.
 *
 * Las fotos de producto son genéricas, de referencia: los nombres
 * describen la pieza y no son líneas propias de la empresa. Las medidas
 * no las tenemos, por eso las fichas dicen "a consultar".
 */

export const EMPRESA = {
  nombre: "Línea Equipamiento",

  // La frase con la que se presenta en Instagram.
  lema: "Equipamos ambientes · Impulsamos proyectos · Construimos confianza",

  // Cómo se describe en su afiche de servicios.
  bajada: "Mobiliario integral",

  // "Más de 50 años" es lo que dice la empresa; no publica año de fundación.
  trayectoria: "Más de 50 años",
  anios: 50,

  // Posteo de Instagram del 3 de septiembre de 2025.
  fundador: "Abel Baroni",

  ciudad: "Rosario, Santa Fe",

  showroom: {
    calle: "Córdoba 1080",
    horario: "Lunes a viernes de 9:30 a 12:30 h",
  },

  instagram: "https://www.instagram.com/lineaequipamiento/",
  instagramUsuario: "@lineaequipamiento",
  facebook: "https://www.facebook.com/linea.equipamiento",
} as const;

/**
 * Los espacios que equipa, tal como los enumera la empresa en su afiche
 * "Diseñamos proyectos de mobiliario integral para…".
 */
export const RUBROS = [
  "Espacios de trabajo",
  "Comercios",
  "Centros de salud",
  "Locales gastronómicos",
  "Hogares",
] as const;

/**
 * WhatsApp. La empresa no publica teléfono fijo ni mail, así que todos
 * los contactos del sitio (enlace tel:, botón de WhatsApp y formulario
 * de presupuesto) van a este número.
 */
export const TELEFONO = "+54 341 505-1461" as const;
/** El mismo número, sin formato, para tel: y wa.me. */
export const TELEFONO_CRUDO = "5493415051461" as const;

export type ClaveCategoria = "escritorios" | "sillas" | "reunion" | "accesorios";

export interface Categoria {
  clave: ClaveCategoria;
  nombre: string;
  descripcion: string;
  portada: string;
}

export const CATEGORIAS: Categoria[] = [
  {
    clave: "escritorios",
    nombre: "Escritorios",
    descripcion: "Ejecutivos y operativos",
    portada: "cat-escritorios.webp",
  },
  {
    clave: "sillas",
    nombre: "Sillas",
    descripcion: "Ergonómicas, operativas y de recepción",
    portada: "cat-sillas.webp",
  },
  {
    clave: "reunion",
    nombre: "Salas de reunión",
    descripcion: "Mesas rectangulares, redondas y bote",
    portada: "cat-reunion.webp",
  },
  {
    clave: "accesorios",
    nombre: "Accesorios",
    descripcion: "Percheros, cestos y pasacables",
    portada: "cat-accesorios.webp",
  },
];

export interface Producto {
  codigo: string;
  nombre: string;
  linea: string;
  categoria: ClaveCategoria;
  img: string;
}

/**
 * Piezas de referencia con nombres genéricos. Cuando la empresa pase su
 * catálogo real, se reemplazan acá (nombre, línea y foto).
 */
export const PRODUCTOS: Producto[] = [
  { codigo: "escritorio-ejecutivo", nombre: "Escritorio ejecutivo con retorno", linea: "Escritorios ejecutivos", categoria: "escritorios", img: "escritorio-prisma.webp" },
  { codigo: "escritorio-rack-blanco", nombre: "Escritorio con cajonera, patas blancas", linea: "Escritorios operativos", categoria: "escritorios", img: "escritorio-strada.webp" },
  { codigo: "escritorio-rack-negro", nombre: "Escritorio con cajonera, patas negras", linea: "Escritorios operativos", categoria: "escritorios", img: "escritorio-tetra.webp" },
  { codigo: "escritorio-l", nombre: "Escritorio en L", linea: "Escritorios operativos", categoria: "escritorios", img: "escritorio-ergonomico.webp" },
  { codigo: "escritorio-recto", nombre: "Escritorio recto con cajones", linea: "Escritorios operativos", categoria: "escritorios", img: "escritorio-recto.webp" },

  { codigo: "silla-ergonomica", nombre: "Silla ergonómica con cabezal", linea: "Sillas ergonómicas", categoria: "sillas", img: "silla-cool.webp" },
  { codigo: "silla-gerencial", nombre: "Silla gerencial", linea: "Sillas ejecutivas", categoria: "sillas", img: "silla-cool-jazz.webp" },
  { codigo: "silla-operativa", nombre: "Silla operativa de red", linea: "Sillas operativas", categoria: "sillas", img: "silla-equis.webp" },
  { codigo: "butaca-recepcion", nombre: "Butaca de recepción", linea: "Recepción", categoria: "sillas", img: "butaca-paulin.webp" },

  { codigo: "mesa-bote", nombre: "Mesa de reunión bote", linea: "Mesas de reunión", categoria: "reunion", img: "mesa-bote.webp" },
  { codigo: "mesa-redonda", nombre: "Mesa de reunión redonda", linea: "Mesas de reunión", categoria: "reunion", img: "mesa-redonda.webp" },

  { codigo: "perchero", nombre: "Perchero de pie", linea: "Accesorios", categoria: "accesorios", img: "perchero.webp" },
];

/** Foto de galería. El tamaño da la proporción: se muestra entera, sin recorte. */
export interface FotoProyecto {
  src: string;
  ancho: number;
  alto: number;
}

export interface Proyecto {
  nombre: string;
  lugar: string;
  descripcion: string;
  /** Foto de la tarjeta en el listado. Sin foto, la tarjeta muestra el color de la marca. */
  img?: string;
  /**
   * Qué parte de la foto se ve en la tarjeta apaisada (background-position).
   * Hace falta con fotos verticales: por defecto solo queda la franja del medio.
   */
  encuadre?: string;
  /** Página propia, en /proyectos/<slug>. */
  slug: string;
  bajada?: string;
  texto?: string;
  /** Galería de la página del proyecto, en orden. */
  fotos?: FotoProyecto[];
  /** Publicación de Instagram (reel o posteo) que se muestra incrustada. */
  instagram?: string;
  /**
   * Proyecto que no es de la empresa: está para mostrar cómo queda una
   * página de proyecto. Se marca como ejemplo en la tarjeta y en la página.
   */
  ejemplo?: boolean;
}

/**
 * El único proyecto propio publicado es el de Baigorria, y por ahora
 * solo está en video. Cuando lleguen las fotos se cargan en `fotos` y el
 * video puede quedar o salir.
 *
 * Los dos siguientes son ejemplos, con fotos de otra empresa: muestran
 * cómo se ve una página de proyecto con galería. Hay que sacarlos cuando
 * haya obras propias con fotos.
 */
export const PROYECTOS: Proyecto[] = [
  {
    slug: "centro-investigaciones-clinicas-baigorria",
    nombre: "Centro de Investigaciones Clínicas Baigorria",
    lugar: "Rosario",
    descripcion: "Interiorismo y equipamiento, junto a Andrés Haugh Arquitecto",
    bajada:
      "Línea participó en la toma de decisiones de interiorismo y equipamiento.",
    texto: "Proyecto de arquitectura: Andrés Haugh Arquitecto.",
    instagram: "https://www.instagram.com/reel/DVUF9NgEeXO/",
  },
  {
    slug: "ejemplo-oficinas-corporativas",
    ejemplo: true,
    nombre: "Oficinas corporativas",
    lugar: "Proyecto de ejemplo",
    descripcion: "Salas de reunión, despachos, puestos de trabajo y guardado",
    bajada:
      "Así se vería una obra terminada: una galería de fotos con todo el mobiliario del proyecto.",
    img: "proy-bcrlabs-1.webp",
    fotos: [
      { src: "proy-bcrlabs-1.webp", ancho: 1100, alto: 1100 },
      { src: "proy-bcrlabs-2.webp", ancho: 1100, alto: 1100 },
      { src: "proy-bcrlabs-3.webp", ancho: 1100, alto: 1100 },
      { src: "proy-bcrlabs-4.webp", ancho: 1100, alto: 1100 },
      { src: "proy-bcrlabs-5.webp", ancho: 1100, alto: 1100 },
      { src: "proy-bcrlabs-6.webp", ancho: 1100, alto: 1100 },
      { src: "proy-bcrlabs-7.webp", ancho: 1100, alto: 1100 },
      { src: "proy-bcrlabs-8.webp", ancho: 1100, alto: 1100 },
      { src: "proy-bcrlabs-9.webp", ancho: 1100, alto: 1100 },
    ],
  },
  {
    slug: "ejemplo-atencion-al-publico",
    ejemplo: true,
    nombre: "Espacio de atención al público",
    lugar: "Proyecto de ejemplo",
    descripcion: "Mostradores, tabiques, mesas de reunión y puestos de trabajo",
    bajada:
      "Así se vería una obra terminada: una galería de fotos con todo el mobiliario del proyecto.",
    img: "proy-banco-municipal-suc-2.webp",
    fotos: [
      { src: "proy-banco-municipal-suc-1.webp", ancho: 1100, alto: 969 },
      { src: "proy-banco-municipal-suc-2.webp", ancho: 1100, alto: 969 },
      { src: "proy-banco-municipal-suc-3.webp", ancho: 1100, alto: 968 },
      { src: "proy-banco-municipal-suc-4.webp", ancho: 1100, alto: 969 },
      { src: "proy-banco-municipal-suc-5.webp", ancho: 1100, alto: 969 },
      { src: "proy-banco-municipal-suc-6.webp", ancho: 1100, alto: 968 },
      { src: "proy-banco-municipal-suc-7.webp", ancho: 1100, alto: 968 },
      { src: "proy-banco-municipal-suc-8.webp", ancho: 1100, alto: 969 },
      { src: "proy-banco-municipal-suc-9.webp", ancho: 1100, alto: 968 },
    ],
  },
];

export const NAVEGACION = [
  { href: "/", texto: "Inicio" },
  { href: "/catalogo", texto: "Catálogo" },
  { href: "/servicios", texto: "Servicios" },
  { href: "/proyectos", texto: "Proyectos" },
  { href: "/contacto", texto: "Contacto" },
] as const;

export function contarPiezas(clave: ClaveCategoria) {
  return PRODUCTOS.filter((p) => p.categoria === clave).length;
}
