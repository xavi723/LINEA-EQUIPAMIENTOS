import Image from "next/image";

/** El logo real de la empresa, en su versión oscura o clara. */
export function Marca({ variante = "oscuro" }: { variante?: "oscuro" | "claro" }) {
  const archivo = variante === "claro" ? "logo-blanco.webp" : "logo.webp";
  return (
    <Image
      src={`/img/${archivo}`}
      alt="Altobello Victorio, muebles para oficina"
      width={621}
      height={120}
      priority={variante === "oscuro"}
      className="marca__logo"
    />
  );
}
