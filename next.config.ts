import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,

  // Next escribe AGENTS.md y CLAUDE.md en la raíz cada vez que arranca.
  // El proyecto no los usa y ensucian el árbol de trabajo en cada
  // `npm run dev`, así que se apagan.
  agentRules: false,

  // Las imágenes ya salen optimizadas de procesar_fotos.py: webp, al
  // tamaño en que se muestran, ninguna pasa de 330 KB. Dejar que el
  // servidor las vuelva a procesar no mejora nada y consume la cuota de
  // transformaciones del plan gratuito. Así viajan como archivos
  // estáticos desde el CDN.
  images: { unoptimized: true },
};

export default nextConfig;
