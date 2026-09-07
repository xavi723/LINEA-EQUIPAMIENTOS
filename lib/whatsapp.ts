/**
 * Arma el enlace de WhatsApp con un mensaje ya escrito sobre una pieza
 * concreta.
 *
 * Va sin número a propósito: en el boceto no hay ningún teléfono real
 * (ver TELEFONO en lib/datos.ts). wa.me sin número abre WhatsApp con el
 * mensaje ya cargado y deja elegir el destinatario, así que el botón se
 * puede probar y se ve el mensaje exacto, sin escribirle a nadie.
 * Cuando la empresa confirme su número, se agrega acá y el botón pasa a
 * ir directo a su chat.
 *
 * El mensaje lo redacta el visitante, no la empresa, así que no afirma
 * nada sobre el producto: solo lo nombra. Cualquier promesa metida acá
 * (precio, plazo, disponibilidad) llegaría al chat como si la hubiera
 * dicho Altobello.
 */
export function whatsappProducto(nombre: string) {
  const texto = `Hola, quiero consultar por: ${nombre}. Lo vi en la web.`;
  return `https://wa.me/?text=${encodeURIComponent(texto)}`;
}
