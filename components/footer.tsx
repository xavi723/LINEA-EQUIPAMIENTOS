import Link from "next/link";

import { EMPRESA, TELEFONO, TELEFONO_CRUDO } from "@/lib/datos";
import { Marca } from "@/components/marca";

export function Footer() {
  const { showroom } = EMPRESA;

  return (
    <footer className="pie">
      <div className="env">
        <div className="pie__cols">
          <div>
            <Marca variante="claro" />
            <p style={{ marginTop: "1rem", fontSize: "var(--t-sm)" }}>
              {EMPRESA.bajada} en Rosario. {EMPRESA.trayectoria} equipando espacios.
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
              <li>
                <a href={`https://wa.me/${TELEFONO_CRUDO}`} target="_blank" rel="noopener noreferrer">
                  WhatsApp {TELEFONO}
                </a>
              </li>
            </ul>

            <div className="pie__titulo" style={{ marginTop: "1.75rem" }}>Redes</div>
            <ul>
              <li><a href={EMPRESA.instagram} target="_blank" rel="noopener noreferrer">Instagram</a></li>
              <li><a href={EMPRESA.facebook} target="_blank" rel="noopener noreferrer">Facebook</a></li>
            </ul>
          </div>
        </div>

        <div className="pie__legal">
          <span>© 2026 {EMPRESA.nombre} · {EMPRESA.trayectoria}</span>
          <span>Showroom: {showroom.horario}</span>
        </div>
      </div>
    </footer>
  );
}
