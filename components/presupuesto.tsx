"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from "react";

/**
 * La lista de presupuesto: el equivalente B2B del carrito.
 *
 * En muebles de oficina el precio depende del volumen, el tapizado y el
 * proyecto, así que no hay checkout. El visitante junta piezas, la lista
 * sobrevive entre visitas en localStorage y llega resumida al formulario
 * de contacto.
 */

export interface Pieza {
  codigo: string;
  nombre: string;
  img: string;
}

interface Contexto {
  lista: Pieza[];
  alternar: (pieza: Pieza) => void;
  quitar: (codigo: string) => void;
  tiene: (codigo: string) => boolean;
  panelAbierto: boolean;
  abrirPanel: () => void;
  cerrarPanel: () => void;
  aviso: string | null;
}

const CLAVE = "av_presupuesto";
const PresupuestoContext = createContext<Contexto | null>(null);

export function PresupuestoProvider({ children }: { children: ReactNode }) {
  const [lista, setLista] = useState<Pieza[]>([]);
  const [panelAbierto, setPanelAbierto] = useState(false);
  const [aviso, setAviso] = useState<string | null>(null);
  const temporizador = useRef<ReturnType<typeof setTimeout> | null>(null);

  // La lista se lee después de montar, no durante el render: el servidor
  // no tiene localStorage y leerlo antes rompería la hidratación.
  useEffect(() => {
    try {
      const crudo = window.localStorage.getItem(CLAVE);
      const datos: unknown = crudo ? JSON.parse(crudo) : [];
      if (Array.isArray(datos)) setLista(datos as Pieza[]);
    } catch {
      // Navegación privada o almacenamiento bloqueado: la lista sigue
      // funcionando en memoria durante la visita.
    }
  }, []);

  const guardar = useCallback((siguiente: Pieza[]) => {
    setLista(siguiente);
    try {
      window.localStorage.setItem(CLAVE, JSON.stringify(siguiente));
    } catch {
      /* ver arriba */
    }
  }, []);

  const mostrarAviso = useCallback((texto: string) => {
    setAviso(texto);
    if (temporizador.current) clearTimeout(temporizador.current);
    temporizador.current = setTimeout(() => setAviso(null), 2600);
  }, []);

  useEffect(
    () => () => {
      if (temporizador.current) clearTimeout(temporizador.current);
    },
    [],
  );

  const alternar = useCallback(
    (pieza: Pieza) => {
      const dentro = lista.some((p) => p.codigo === pieza.codigo);
      if (dentro) {
        guardar(lista.filter((p) => p.codigo !== pieza.codigo));
        mostrarAviso("Se quitó de la lista.");
      } else {
        guardar([...lista, pieza]);
        mostrarAviso(`${pieza.nombre} se sumó al presupuesto.`);
      }
    },
    [lista, guardar, mostrarAviso],
  );

  const quitar = useCallback(
    (codigo: string) => {
      const pieza = lista.find((p) => p.codigo === codigo);
      guardar(lista.filter((p) => p.codigo !== codigo));
      if (pieza) mostrarAviso(`Se quitó ${pieza.nombre}.`);
    },
    [lista, guardar, mostrarAviso],
  );

  const valor = useMemo<Contexto>(
    () => ({
      lista,
      alternar,
      quitar,
      tiene: (codigo) => lista.some((p) => p.codigo === codigo),
      panelAbierto,
      abrirPanel: () => setPanelAbierto(true),
      cerrarPanel: () => setPanelAbierto(false),
      aviso,
    }),
    [lista, alternar, quitar, panelAbierto, aviso],
  );

  return (
    <PresupuestoContext.Provider value={valor}>
      {children}
    </PresupuestoContext.Provider>
  );
}

export function usePresupuesto() {
  const ctx = useContext(PresupuestoContext);
  if (!ctx) {
    throw new Error("usePresupuesto necesita estar dentro de PresupuestoProvider");
  }
  return ctx;
}
