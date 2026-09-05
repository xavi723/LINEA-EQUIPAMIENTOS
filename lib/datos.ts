/**
 * Datos del sitio de Altobello Victorio.
 *
 * Los de contacto están verificados contra la página de contacto de la
 * empresa. Los productos y sus familias salen de los nombres de archivo
 * de las fotos que mandaron, así que son reales; las medidas todavía no
 * las tenemos y por eso las fichas dicen "a consultar" en vez de
 * inventar milímetros.
 */

export const EMPRESA = {
  nombre: "Altobello Victorio",
  bajada: "Muebles para oficina",
  desde: 1959,
  ciudad: "Rosario, Santa Fe",

  showroom: {
    calle: "Bv. Rondeau 3042",
    horario: "Lunes a viernes de 9 a 18 h",
    tel: "(0341) 455-5606",
    telHref: "+543414555606",
    cel: "(0341) 15-532-1776",
    mail: "presupuestos@altobellovictorio.com.ar",
  },

  fabrica: {
    calle: "Pedro Goyena 1023",
    horario: "Lunes a jueves de 8 a 12 y de 13 a 17 h · Viernes hasta las 16 h",
    tel: "(0341) 453-0775",
    telHref: "+543414530775",
    mail: "administracion@altobellovictorio.com.ar",
  },

  whatsapp: "(0341) 15-601-6491",
  whatsappHref: "5493416016491",
} as const;

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
    descripcion: "Ejecutivos, operativos y con rack",
    portada: "cat-escritorios.webp",
  },
  {
    clave: "sillas",
    nombre: "Sillas",
    descripcion: "Ergonómicas, operativas y de dirección",
    portada: "cat-sillas.webp",
  },
  {
    clave: "reunion",
    nombre: "Salas de reunión",
    descripcion: "Mesas de directorio y colaborativas",
    portada: "cat-reunion.webp",
  },
  {
    clave: "accesorios",
    nombre: "Accesorios",
    descripcion: "Percheros y complementos",
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

export const PRODUCTOS: Producto[] = [
  { codigo: "escritorio-prisma", nombre: "Escritorio Prisma", linea: "Ejecutivos", categoria: "escritorios", img: "escritorio-prisma.webp" },
  { codigo: "escritorio-strada", nombre: "Escritorio Strada", linea: "Con rack", categoria: "escritorios", img: "escritorio-strada.webp" },
  { codigo: "escritorio-tetra", nombre: "Escritorio Tetra", linea: "Con rack", categoria: "escritorios", img: "escritorio-tetra.webp" },
  { codigo: "escritorio-ergonomico", nombre: "Escritorio Ergonómico", linea: "Operativos", categoria: "escritorios", img: "escritorio-ergonomico.webp" },
  { codigo: "escritorio-recto", nombre: "Escritorio Recto", linea: "Operativos", categoria: "escritorios", img: "escritorio-recto.webp" },

  { codigo: "silla-cool", nombre: "Silla Cool", linea: "Ergonómicas", categoria: "sillas", img: "silla-cool.webp" },
  { codigo: "silla-cool-jazz", nombre: "Silla Cool Jazz", linea: "Dirección", categoria: "sillas", img: "silla-cool-jazz.webp" },
  { codigo: "silla-equis", nombre: "Silla Equis", linea: "Operativas", categoria: "sillas", img: "silla-equis.webp" },
  { codigo: "butaca-paulin", nombre: "Butaca Paulín", linea: "Recepción", categoria: "sillas", img: "butaca-paulin.webp" },

  { codigo: "mesa-bote", nombre: "Mesa Bote", linea: "Directorio", categoria: "reunion", img: "mesa-bote.webp" },
  { codigo: "mesa-redonda", nombre: "Mesa Redonda", linea: "Colaborativas", categoria: "reunion", img: "mesa-redonda.webp" },

  { codigo: "perchero", nombre: "Perchero", linea: "Complementos", categoria: "accesorios", img: "perchero.webp" },
];

export interface Proyecto {
  nombre: string;
  lugar: string;
  descripcion: string;
  img: string;
}

/**
 * Solo proyectos reales y con foto. Hubo tres más, de muestra; ponerles
 * una foto verdadera habría convertido un hueco evidente en una
 * atribución falsa, que de cara a la empresa es peor.
 */
export const PROYECTOS: Proyecto[] = [
  {
    nombre: "Colegio de Arquitectos",
    lugar: "Rosario, Santa Fe",
    descripcion: "Biblioteca, sala de reunión y puestos de trabajo",
    img: "amb-atrio.webp",
  },
  {
    nombre: "BEI Desarrollos",
    lugar: "Rosario, Santa Fe",
    descripcion: "Oficinas con Línea Strada",
    img: "amb-lounge.webp",
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
