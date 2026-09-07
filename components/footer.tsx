import Link from "next/link";

import { EMPRESA, TELEFONO } from "@/lib/datos";
import { Pendiente } from "@/components/pendiente";
import { Marca } from "@/components/marca";

export function Footer() {
  const { showroom, fabrica } = EMPRESA;

  return (
    <footer className="pie">
      <div className="env">
        <div className="pie__cols">
          <div>
            <Marca variante="claro" />
            {/* "Empresa familiar" y "desde 1959" están verificados. */}
            <p style={{ marginTop: "1rem", fontSize: "var(--t-sm)" }}>
              Empresa familiar de Rosario. Equipamiento para empresas desde{" "}
              {EMPRESA.desde}.
            </p>
          </div>

          <div>
            <div className="pie__titulo">Catálogo</div>
            <ul>
              <li><Link href="/catalogo">Escritorios</Link></li>
              <li><Link href="/catalogo">Sillas</Link></li>
              <li><Link href="/catalogo">Salas de reunión</Link></li>
              <li><Link href="/catalogo">Accesorios</Link></li>
            </ul>
          </div>

          <div>
            <div className="pie__titulo">Empresa</div>
            <ul>
              <li><Link href="/servicios">Servicios</Link></li>
              <li><Link href="/proyectos">Proyectos</Link></li>
              <li><Link href="/contacto">Contacto</Link></li>
            </ul>
          </div>

          <div>
            <div className="pie__titulo">Showroom</div>
            <ul>
              <li>{showroom.calle}, {EMPRESA.ciudad}</li>
              <li><Pendiente>Tel. {TELEFONO}</Pendiente></li>
              <li><a href={`mailto:${showroom.mail}`}>{showroom.mail}</a></li>
            </ul>

            <div className="pie__titulo" style={{ marginTop: "1.75rem" }}>Fábrica</div>
            <ul>
              <li>{fabrica.calle}, {EMPRESA.ciudad}</li>
              <li><Pendiente>Tel. {TELEFONO}</Pendiente></li>
              <li><a href={`mailto:${fabrica.mail}`}>{fabrica.mail}</a></li>
            </ul>
          </div>
        </div>

        <div className="pie__legal">
          <span>© 2026 {EMPRESA.nombre} · Desde {EMPRESA.desde}</span>
          <span>Showroom: {showroom.horario}</span>
        </div>
      </div>
    </footer>
  );
}
