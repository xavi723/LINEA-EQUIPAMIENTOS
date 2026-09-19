import { TELEFONO_CRUDO } from "@/lib/datos";

/**
 * Arma el enlace de WhatsApp con un mensaje ya escrito sobre una pieza
 * concreta.
 *
 * Va al número que la empresa publica en su web (ver TELEFONO en
 * lib/datos.ts).
 *
 * El mensaje lo redacta el visitante, no la empresa, así que no afirma
 * nada sobre el producto: solo lo nombra. Cualquier promesa metida acá
 * (precio, plazo, disponibilidad) llegaría al chat como si la hubiera
 * dicho Altobello.
 */
export function whatsappProducto(nombre: string) {
  const texto = `Hola, quiero consultar por: ${nombre}. Lo vi en la web.`;
  return `https://wa.me/${TELEFONO_CRUDO}?text=${encodeURIComponent(texto)}`;
}
