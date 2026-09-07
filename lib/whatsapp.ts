import { EMPRESA } from "@/lib/datos";

/**
 * Arma el enlace de WhatsApp con un mensaje ya escrito sobre una pieza
 * concreta.
 *
 * El mensaje lo redacta el visitante, no la empresa, así que no afirma
 * nada sobre el producto: solo lo nombra. Cualquier promesa metida acá
 * (precio, plazo, disponibilidad) llegaría al chat como si la hubiera
 * dicho Altobello.
 *
 * wa.me espera el número sin +, sin espacios y sin guiones, y el texto
 * codificado para URL. encodeURIComponent deja los saltos de línea y
 * los acentos como WhatsApp los espera.
 */
export function whatsappProducto(nombre: string) {
  const texto = `Hola, quiero consultar por: ${nombre}. Lo vi en la web.`;
  return `https://wa.me/${EMPRESA.whatsappHref}?text=${encodeURIComponent(texto)}`;
}
