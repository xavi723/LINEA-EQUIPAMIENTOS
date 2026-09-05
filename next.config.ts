import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,

  // Next escribe AGENTS.md y CLAUDE.md en la raíz cada vez que arranca.
  // El proyecto no los usa y ensucian el árbol de trabajo en cada
  // `npm run dev`, así que se apagan.
  agentRules: false,
};

export default nextConfig;
