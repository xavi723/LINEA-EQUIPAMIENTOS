/**
 * Rutas de archivos estáticos.
 *
 * Cuando el sitio se sirve bajo un subdirectorio (GitHub Pages lo publica
 * en /<repo>), Next prefija solo lo que controla él: los enlaces de
 * <Link> y los bundles. Las URL que escribimos a mano — el fondo de una
 * foto, el src del logo — quedan apuntando a la raíz y dan 404.
 *
 * Todo lo que salga de /public pasa por acá.
 */
const BASE = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

export function img(archivo: string) {
  return `${BASE}/img/${archivo}`;
}
