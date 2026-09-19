/**
 * Datos del sitio de Altobello Victorio.
 *
 * REGLA: acá solo entra información que se pudo verificar contra
 * fuentes de la propia empresa (su web, su ficha de LinkedIn, los
 * directorios donde ella misma se publica). Lo que no se pudo
 * verificar no se completa con algo verosímil: se deja marcado como
 * pendiente para que lo confirmen ellos.
 *
 * Los nombres de producto salen de los archivos de foto que mandó el
 * cliente, así que son reales. Las medidas no las tenemos y por eso
 * las fichas dicen "a consultar" en vez de inventar milímetros.
 */

export const EMPRESA = {
  nombre: "Altobello Victorio",

  // Verificado: la empresa se presenta como "equipamiento para
  // empresas" y como fabricante de muebles para oficina.
  bajada: "Equipamiento para empresas",

  // Verificado: "desde sus inicios en 1959".
  desde: 1959,
  ciudad: "Rosario, Santa Fe",

  showroom: {
    calle: "Bv. Rondeau 3042",
    horario: "Lunes a viernes de 9 a 18 h",
    mail: "presupuestos@altobellovictorio.com.ar",
  },

  fabrica: {
    calle: "Pedro Goyena 1023",
    horario: "Lunes a viernes de 8 a 12 y de 13 a 17 h · Viernes hasta las 16 h",
    mail: "administracion@altobellovictorio.com.ar",
  },
} as const;

/**
 * Ningún número real en el boceto.
 *
 * Un teléfono es el dato que más caro sale equivocado: si me confundo de
 * bloque, alguien llama a la fábrica creyendo que llama al showroom, o
 * peor, a un número que no es de la empresa. Y a diferencia de un texto
 * mal puesto, un botón que marca se usa sin pensarlo.
 *
 * Así que hasta que la empresa confirme cada número y a qué dirección
 * corresponde, en pantalla va este relleno y no se enlaza a ningún lado:
 * un tel: a un número inventado es peor que no tener el enlace.
 */
export const TELEFONO = "000 000-0000" as const;

export type ClaveCategoria = "escritorios" | "sillas" | "reunion" | "accesorios";

export interface Categoria {
  clave: ClaveCategoria;
  nombre: string;
  descripcion: string;
  portada: string;
}

/**
 * Las descripciones quedan pendientes salvo la de escritorios, que sale
 * de las propias secciones del catálogo de la empresa (escritorios
 * ejecutivos y escritorios operativos).
 */
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
    descripcion: "",
    portada: "cat-sillas.webp",
  },
  {
    clave: "reunion",
    nombre: "Salas de reunión",
    descripcion: "",
    portada: "cat-reunion.webp",
  },
  {
    clave: "accesorios",
    nombre: "Accesorios",
    descripcion: "",
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
 * Los nombres son los reales. La "línea" solo se completa cuando la
 * empresa la publica: Prisma, Strada, Tetra, Cool y Equis están
 * verificadas. El resto queda vacío hasta que nos lo confirmen; la
 * ficha muestra un hueco en lugar de una familia inventada.
 */
export const PRODUCTOS: Producto[] = [
  { codigo: "escritorio-prisma", nombre: "Escritorio Prisma", linea: "Línea Prisma", categoria: "escritorios", img: "escritorio-prisma.webp" },
  { codigo: "escritorio-strada", nombre: "Escritorio Strada", linea: "Línea Strada", categoria: "escritorios", img: "escritorio-strada.webp" },
  { codigo: "escritorio-tetra", nombre: "Escritorio Tetra", linea: "Línea Tetra", categoria: "escritorios", img: "escritorio-tetra.webp" },
  { codigo: "escritorio-ergonomico", nombre: "Escritorio Ergonómico", linea: "", categoria: "escritorios", img: "escritorio-ergonomico.webp" },
  { codigo: "escritorio-recto", nombre: "Escritorio Recto", linea: "", categoria: "escritorios", img: "escritorio-recto.webp" },

  { codigo: "silla-cool", nombre: "Silla Cool", linea: "Línea Cool", categoria: "sillas", img: "silla-cool.webp" },
  { codigo: "silla-cool-jazz", nombre: "Silla Cool Jazz", linea: "Línea Cool", categoria: "sillas", img: "silla-cool-jazz.webp" },
  { codigo: "silla-equis", nombre: "Silla Equis", linea: "Línea Equis", categoria: "sillas", img: "silla-equis.webp" },
  { codigo: "butaca-paulin", nombre: "Butaca Paulín", linea: "", categoria: "sillas", img: "butaca-paulin.webp" },

  { codigo: "mesa-bote", nombre: "Mesa Bote", linea: "", categoria: "reunion", img: "mesa-bote.webp" },
  { codigo: "mesa-redonda", nombre: "Mesa Redonda", linea: "", categoria: "reunion", img: "mesa-redonda.webp" },

  { codigo: "perchero", nombre: "Perchero", linea: "", categoria: "accesorios", img: "perchero.webp" },
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
  /** Foto de la tarjeta en el listado. */
  img: string;
  /**
   * Qué parte de la foto se ve en la tarjeta apaisada (background-position).
   * Hace falta con fotos verticales: por defecto solo queda la franja del medio.
   */
  encuadre?: string;
  /**
   * Solo los proyectos identificados tienen página propia, en
   * /proyectos/<slug>. Los de nombre pendiente quedan como tarjeta.
   */
  slug?: string;
  bajada?: string;
  texto?: string;
  linea?: string;
  /** Galería de la página del proyecto, en orden. */
  fotos?: FotoProyecto[];
}

/**
 * La empresa sí publica proyectos entregados (COFCO International en la
 * Bolsa de Comercio, Núcleo Servicios, la Asociación Rosarina de
 * Fútbol, Óptica Contini, la Cooperativa de Trabajo Paraná y la
 * Municipalidad de Puerto San Martín), pero no sabemos cuál de esas
 * obras muestra cada una de las fotos de ambiente que tenemos. Poner un
 * nombre real debajo de una foto que quizá sea de otra obra es una
 * atribución falsa.
 *
 * Mientras el listado eran solo esas fotos, iban como tarjetas con el
 * nombre pendiente. Ahora que hay cuatro obras identificadas, dos
 * tarjetas anónimas al lado se leen como un error y no como un hueco,
 * así que salieron. Sus fotos siguen en uso en la portada y en
 * servicios.
 *
 * Las que sí tienen nombre salen de posteos de Instagram donde la obra
 * está identificada junto a sus fotos.
 */
export const PROYECTOS: Proyecto[] = [
  {
    slug: "coworking-banco-municipal",
    nombre: "Coworking Banco Municipal",
    lugar: "La Favorita",
    descripcion: "Línea Strada: base metálica y tapas de melamina",
    bajada: "Soluciones para coworking con diseño liviano y estructura sólida.",
    texto:
      "Base metálica y tapas de melamina, pensadas para optimizar espacios de trabajo.",
    linea: "Línea Strada",
    img: "proy-banco-municipal-1.webp",
    fotos: [
      { src: "proy-banco-municipal-1.webp", ancho: 1067, alto: 712 },
      { src: "proy-banco-municipal-2.webp", ancho: 1070, alto: 716 },
    ],
  },
  {
    slug: "don-palacios-construcciones",
    nombre: "Don Palacios Construcciones",
    lugar: "",
    descripcion: "Equipamiento para Don Palacios Construcciones.",
    texto: "Equipamiento para Don Palacios Construcciones.",
    img: "proy-don-palacios-3.webp",
    encuadre: "center 30%",
    fotos: [
      { src: "proy-don-palacios-1.webp", ancho: 720, alto: 960 },
      { src: "proy-don-palacios-2.webp", ancho: 900, alto: 1200 },
      { src: "proy-don-palacios-3.webp", ancho: 900, alto: 1200 },
      { src: "proy-don-palacios-4.webp", ancho: 900, alto: 1200 },
      { src: "proy-don-palacios-5.webp", ancho: 720, alto: 960 },
    ],
  },
  {
    slug: "banco-municipal",
    nombre: "Banco Municipal",
    lugar: "",
    descripcion: "Mostradores, tabiques, mesas de reunión y puestos de trabajo",
    bajada: "Proyecto realizado para el Banco Municipal.",
    texto:
      "Mostradores, tabiques especiales, mesas de reunión y puestos de trabajo, desarrollados como una solución completa y funcional.",
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
  {
    slug: "bcrlabs",
    nombre: "BCRlabs",
    lugar: "Bolsa de Comercio de Rosario",
    descripcion: "Mobiliario a medida para un espacio de innovación",
    bajada:
      "Un proyecto integral de mobiliario diseñado a medida para acompañar un espacio de innovación y trabajo colaborativo.",
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
