import { NumberTicker } from "@/components/ui/number-ticker";
import { EMPRESA, RUBROS } from "@/lib/datos";

/**
 * Las cifras de la portada. Cuentan al entrar en pantalla, escalonadas.
 *
 * La empresa dice "más de 50 años" y no publica año de fundación, así
 * que la cifra es esa, con el "+" delante, y no una cuenta desde un año.
 */
export function Cifras() {
  return (
    <div className="cifras entra" style={{ ["--paso" as string]: "300ms" }}>
      <div className="cifras__item">
        <span className="cifras__n">
          +<NumberTicker value={EMPRESA.anios} delay={0.4} />
        </span>
        <span className="cifras__p">Años de trayectoria</span>
      </div>

      <div className="cifras__item">
        <span className="cifras__n">
          <NumberTicker value={RUBROS.length} delay={0.55} />
        </span>
        <span className="cifras__p">Tipos de espacios que equipamos</span>
      </div>

      <div className="cifras__item">
        <span className="cifras__n">
          <NumberTicker value={3} delay={0.65} />
        </span>
        <span className="cifras__p">Etapas: diseño, fabricación e instalación</span>
      </div>
    </div>
  );
}
