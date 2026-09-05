import { cn } from "@/lib/utils";

/**
 * Hueco de imagen. Si el archivo todavía no está, queda un bloque de
 * color sobrio con el nombre del que falta — nunca un ícono roto — así
 * el sitio se puede mostrar igual.
 */
export function Foto({
  src,
  alt,
  pie,
  className,
  style,
}: {
  src: string;
  alt: string;
  pie?: string;
  className?: string;
  style?: React.CSSProperties;
}) {
  return (
    <div
      className={cn("foto", className)}
      role="img"
      aria-label={alt}
      style={{ backgroundImage: `url(/img/${src})`, ...style }}
    >
      {pie ? <div className="foto__pie">{pie}</div> : null}
    </div>
  );
}
