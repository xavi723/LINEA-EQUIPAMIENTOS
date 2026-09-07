import type { Metadata } from "next";
import { Archivo, Fira_Sans, IBM_Plex_Mono } from "next/font/google";

import "./globals.css";
import { EMPRESA } from "@/lib/datos";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { PresupuestoProvider } from "@/components/presupuesto";
import { PanelPresupuesto } from "@/components/panel-presupuesto";

// Los tres roles tipográficos del sistema: títulos, texto y datos.
// next/font los sirve desde el propio dominio, así que no hay pedido a
// Google en tiempo de carga ni salto de fuente.
const archivo = Archivo({
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  variable: "--fuente-display",
  display: "swap",
});

const fira = Fira_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--fuente-texto",
  display: "swap",
});

const plex = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--fuente-dato",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://altobellovictorio.vercel.app"),
  title: {
    default: `${EMPRESA.nombre} · ${EMPRESA.bajada} en Rosario`,
    template: `%s · ${EMPRESA.nombre}`,
  },
  description:
    "Equipamiento para empresas en Rosario desde 1959. Departamento de Arquitectura, software de diseño e instalación de mobiliario.",
  openGraph: {
    type: "website",
    locale: "es_AR",
    siteName: EMPRESA.nombre,
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="es-AR"
      className={`${archivo.variable} ${fira.variable} ${plex.variable}`}
    >
      <body>
        <PresupuestoProvider>
          <Header />
          <main id="principal">{children}</main>
          <Footer />
          <PanelPresupuesto />
        </PresupuestoProvider>
      </body>
    </html>
  );
}
