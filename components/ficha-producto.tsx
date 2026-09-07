"use client";

import Image from "next/image";

import type { Producto } from "@/lib/datos";
import { img } from "@/lib/rutas";
import { whatsappProducto } from "@/lib/whatsapp";
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
      <div className="prod__acciones">
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

        {/* Consulta directa por esta pieza. target y rel van juntos:
            sin noopener la pestaña de WhatsApp puede tocar la nuestra. */}
        <a
          className="btn-wsp"
          href={whatsappProducto(producto.nombre)}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`Consultar por ${producto.nombre} por WhatsApp`}
          title={`Consultar por ${producto.nombre} por WhatsApp`}
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
            <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.45 1.32 4.95L2 22l5.25-1.38a9.9 9.9 0 0 0 4.79 1.22h.01c5.46 0 9.9-4.45 9.91-9.91a9.86 9.86 0 0 0-2.9-7.01A9.82 9.82 0 0 0 12.04 2Zm0 18.15h-.01a8.23 8.23 0 0 1-4.19-1.15l-.3-.18-3.12.82.83-3.04-.2-.31a8.19 8.19 0 0 1-1.26-4.38c0-4.54 3.7-8.23 8.25-8.23a8.18 8.18 0 0 1 5.82 2.42 8.18 8.18 0 0 1 2.41 5.82c-.002 4.54-3.7 8.23-8.23 8.23Zm4.52-6.16c-.25-.12-1.47-.72-1.69-.81-.23-.08-.39-.12-.56.13-.16.24-.64.8-.79.97-.14.16-.29.18-.54.06-.25-.13-1.05-.39-1.99-1.23-.74-.66-1.24-1.47-1.38-1.72-.15-.25-.02-.38.11-.5.11-.11.25-.29.37-.44.13-.14.17-.25.25-.41.09-.17.04-.31-.02-.44-.06-.12-.56-1.35-.77-1.85-.2-.48-.4-.42-.56-.43-.14 0-.31-.01-.47-.01-.17 0-.44.06-.66.31-.23.25-.87.85-.87 2.07 0 1.22.89 2.4 1.01 2.56.13.17 1.75 2.67 4.24 3.74.59.26 1.05.41 1.41.52.59.19 1.14.16 1.56.1.48-.07 1.47-.6 1.68-1.18.21-.58.21-1.08.14-1.18-.06-.11-.22-.17-.47-.29Z" />
          </svg>
        </a>
      </div>
    </>
  );
}
