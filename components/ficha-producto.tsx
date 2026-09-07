"use client";

import Image from "next/image";

import type { Producto } from "@/lib/datos";
import { img } from "@/lib/rutas";
import { usePresupuesto } from "@/components/presupuesto";
import { Pendiente } from "@/components/pendiente";

export function FichaProducto({ producto }: { producto: Producto }) {
  const { alternar, tiene } = usePresupuesto();
  const dentro = tiene(producto.codigo);

  return (
    <>
      <div className="foto prod__foto">
        <Image
          src={img(producto.img)}
          alt={producto.nombre}
          fill
          sizes="(max-width: 700px) 100vw, 300px"
          style={{ objectFit: "cover" }}
        />
      </div>
      <div className="prod__codigo">
        {producto.linea || <Pendiente>Línea a confirmar</Pendiente>}
      </div>
      <h3 className="prod__nombre">{producto.nombre}</h3>
      <div className="prod__medidas">Medidas y terminaciones a consultar</div>
      <button
        className="btn-sumar"
        type="button"
        data-agregado={dentro ? "si" : "no"}
        onClick={() =>
          alternar({
            codigo: producto.codigo,
            nombre: producto.nombre,
            img: producto.img,
          })
        }
      >
        <span>{dentro ? "En la lista" : "Presupuestar"}</span>
      </button>
    </>
  );
}
