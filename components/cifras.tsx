import { NumberTicker } from "@/components/ui/number-ticker";
import { EMPRESA } from "@/lib/datos";

/**
 * Las cifras de la portada. Cuentan al entrar en pantalla, escalonadas.
 *
 * "3D" no es un número y no cuenta: queda fija. El año va sin separador
 * de miles, porque 1959 no se escribe "1.959".
 */
export function Cifras() {
  // Se calcula al compilar, no en cada visita: la página es estática y
  // se sirve entera desde el CDN, sin invocar ninguna función. El número
  // cambia una vez por año, así que se actualiza en el próximo deploy.
  const anios = new Date().getFullYear() - EMPRESA.desde;

  return (
    <div className="cifras entra" style={{ ["--paso" as string]: "300ms" }}>
      <div className="cifras__item">
        <span className="cifras__n">
          <NumberTicker
            value={EMPRESA.desde}
            useGrouping={false}
            delay={0.4}
            damping={45}
            stiffness={150}
          />
        </span>
        <span className="cifras__p">Año de fundación</span>
      </div>

      <div className="cifras__item">
        <span className="cifras__n">
          <NumberTicker value={anios} delay={0.55} />
        </span>
        <span className="cifras__p">Años fabricando acá</span>
      </div>

      <div className="cifras__item">
        <span className="cifras__n">3D</span>
        <span className="cifras__p">Tu oficina antes de comprarla</span>
      </div>

      <div className="cifras__item">
        <span className="cifras__n">
          <NumberTicker value={2} delay={0.7} />
        </span>
        <span className="cifras__p">Showroom y fábrica propios</span>
      </div>
    </div>
  );
}
