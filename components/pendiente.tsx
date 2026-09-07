/**
 * Marca un hueco de contenido: texto que todavía no tenemos de la
 * empresa y que por lo tanto no se inventa.
 *
 * Se ve distinto a propósito. En un boceto, un hueco señalado vale más
 * que un párrafo verosímil: muestra la maqueta y a la vez le dice a la
 * empresa exactamente qué texto falta que nos pasen.
 */
export function Pendiente({
  children,
  como: Como = "span",
}: {
  children: React.ReactNode;
  como?: "span" | "p" | "h1" | "h2" | "h3" | "div";
}) {
  return (
    <Como className="pendiente" data-pendiente="si">
      {children}
    </Como>
  );
}
