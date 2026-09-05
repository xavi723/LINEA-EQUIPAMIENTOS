import type { Metadata } from "next";
import Link from "next/link";

import { CATEGORIAS, PRODUCTOS } from "@/lib/datos";
import { CatalogoCliente } from "@/components/catalogo-cliente";

export const metadata: Metadata = {
  title: "Catálogo",
  description:
    "Escritorios, sillas, mesas de reunión y accesorios para oficina. Fabricación a medida sobre cualquier pieza.",
};

export default function Catalogo() {
  return (
    <>
      <div className="env">
        <nav className="migas" aria-label="Migas de pan">
          <Link href="/">Inicio</Link>
          <span aria-hidden="true">/</span>
          <span aria-current="page">Catálogo</span>
        </nav>
      </div>

      <section className="env" style={{ paddingBottom: "3rem" }}>
        <div className="enc-seccion" style={{ marginBottom: 0 }}>
          <div>
            <div className="etiqueta">
              {PRODUCTOS.length} piezas · {CATEGORIAS.length} familias
            </div>
            <h1 style={{ fontSize: "var(--t-2xl)" }}>Catálogo</h1>
          </div>
          <p>
            Casi todo se fabrica también a medida — si necesitás otra
            terminación o una medida distinta, preguntanos.
          </p>
        </div>
      </section>

      <hr className="regla" />

      <CatalogoCliente />
    </>
  );
}
