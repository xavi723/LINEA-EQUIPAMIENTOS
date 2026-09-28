import Image from "next/image";

import { img } from "@/lib/rutas";

/**
 * La marca: el isotipo "Le" y el nombre al lado, en texto.
 *
 * El único logo que hay de la empresa es el isotipo a 150 px, así que el
 * nombre va en texto en vez de en imagen: se ve nítido a cualquier
 * tamaño. Cuando llegue el logo completo en alta calidad, se reemplaza
 * todo este bloque por la imagen.
 */
export function Marca({ variante = "oscuro" }: { variante?: "oscuro" | "claro" }) {
  return (
    <span className={`marca marca--${variante}`}>
      <Image
        src={img("linea-isotipo.webp")}
        alt=""
        width={150}
        height={150}
        priority={variante === "oscuro"}
        className="marca__iso"
      />
      <span className="marca__texto">
        <span className="marca__nombre">Línea</span>
        <span className="marca__bajada">equipamiento</span>
      </span>
    </span>
  );
}
