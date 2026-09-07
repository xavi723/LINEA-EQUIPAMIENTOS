"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

import { NAVEGACION, TELEFONO } from "@/lib/datos";
import { Marca } from "@/components/marca";
import { usePresupuesto } from "@/components/presupuesto";

export function Header() {
  const ruta = usePathname();
  const [flotando, setFlotando] = useState(false);
  const [menuAbierto, setMenuAbierto] = useState(false);
  const { lista, abrirPanel } = usePresupuesto();

  useEffect(() => {
    const alScroll = () => setFlotando(window.scrollY > 8);
    alScroll();
    window.addEventListener("scroll", alScroll, { passive: true });
    return () => window.removeEventListener("scroll", alScroll);
  }, []);

  // Al cambiar de página el menú se cierra solo.
  useEffect(() => setMenuAbierto(false), [ruta]);

  const activo = (href: string) =>
    href === "/" ? ruta === "/" : ruta.startsWith(href);

  return (
    <>
      <a className="btn btn--solido saltar" href="#principal">
        Saltar al contenido
      </a>

      <header className={`cabecera${flotando ? " cabecera--flotando" : ""}`}>
        <div className="env cabecera__barra">
          <Link href="/" aria-label="Altobello Victorio, inicio">
            <Marca />
          </Link>

          <nav className="nav nav--principal" aria-label="Principal">
            {NAVEGACION.map(({ href, texto }) => (
              <Link
                key={href}
                href={href}
                className="nav__enlace"
                aria-current={activo(href) ? "page" : undefined}
              >
                {texto}
              </Link>
            ))}
          </nav>

          <div className="cabecera__acciones">
            <span className="tel pendiente">
              <svg width="13" height="13" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                <path
                  d="M3 2h3l1.4 3.5-1.8 1.2a10 10 0 0 0 3.7 3.7l1.2-1.8L14 10v3a1 1 0 0 1-1.1 1A11.5 11.5 0 0 1 2 3.1 1 1 0 0 1 3 2Z"
                  stroke="currentColor"
                  strokeWidth="1.3"
                  strokeLinejoin="round"
                />
              </svg>
              {TELEFONO}
            </span>

            <button
              className="btn btn--linea btn--presupuesto"
              type="button"
              onClick={abrirPanel}
              aria-label="Abrir la lista de presupuesto"
            >
              <svg width="15" height="15" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                <path d="M5.5 1.5h5v2h-5zM3.5 3.5h9v11h-9z" stroke="currentColor" strokeWidth="1.2" strokeLinejoin="round" />
                <path d="M6 7.5h4M6 10.5h4" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
              </svg>
              <span className="btn__palabra">Presupuesto</span>
              <span className="contador" data-vacio={lista.length === 0 ? "si" : "no"}>
                {lista.length}
              </span>
            </button>

            <button
              className="hamburguesa"
              type="button"
              aria-expanded={menuAbierto}
              aria-controls="menu-movil"
              aria-label={menuAbierto ? "Cerrar el menú" : "Abrir el menú"}
              onClick={() => setMenuAbierto((v) => !v)}
            >
              <span /><span /><span />
            </button>
          </div>
        </div>

        <nav
          className="menu-movil"
          id="menu-movil"
          data-abierto={menuAbierto ? "si" : "no"}
          aria-label="Menú móvil"
        >
          <div>
            <div className="env">
              <ul>
                {NAVEGACION.map(({ href, texto }) => (
                  <li key={href}>
                    <Link href={href} aria-current={activo(href) ? "page" : undefined}>
                      {texto}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </nav>
      </header>
    </>
  );
}
