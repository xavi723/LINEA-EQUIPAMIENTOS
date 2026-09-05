/** La flecha que acompaña a los botones y enlaces de acción. */
export function Flecha({ className = "btn__flecha" }: { className?: string }) {
  return (
    <svg className={className} width="14" height="10" viewBox="0 0 14 10" fill="none" aria-hidden="true">
      <path d="M9 1l4 4-4 4M13 5H1" stroke="currentColor" strokeWidth="1.5" />
    </svg>
  );
}
