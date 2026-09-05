import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Exportación estática: el build escupe HTML suelto, sin servidor.
  // Sirve igual en Vercel, en GitHub Pages, en Cloudflare o en cualquier
  // hosting de archivos. El sitio no usa nada que necesite un servidor.
  output: "export",

  // GitHub Pages sirve el proyecto bajo /<repo>, no en la raíz. La
  // variable la pone el workflow; en local y en Vercel queda vacía y el
  // sitio vive en la raíz.
  basePath: process.env.NEXT_PUBLIC_BASE_PATH || "",

  // Con esto cada ruta sale como carpeta/index.html, que es lo que
  // GitHub Pages sabe servir sin reescrituras.
  trailingSlash: true,

  reactStrictMode: true,

  // Next escribe AGENTS.md y CLAUDE.md en la raíz cada vez que arranca.
  // El proyecto no los usa y ensucian el árbol de trabajo en cada
  // `npm run dev`, así que se apagan.
  agentRules: false,

  // Las imágenes ya salen optimizadas de procesar_fotos.py: webp, al
  // tamaño en que se muestran, ninguna pasa de 330 KB. Volver a
  // procesarlas en el servidor no mejora nada, consume cuota en los
  // planes gratuitos y es incompatible con la exportación estática.
  images: { unoptimized: true },
};

export default nextConfig;
