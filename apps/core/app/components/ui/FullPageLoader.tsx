import * as React from "react";
import { LoaderSpinner } from "./LoaderSpinner";

/**
 * FullPageLoader - carregador de tela cheia (overlay).
 *
 * @param description Texto opcional de carregamento.
 * @param className Classes CSS adicionais.
 */
export function FullPageLoader({
  description = "Carregando...",
  className = "",
}: {
  description?: string;
  className?: string;
}) {
  return (
    <div
      className={`fixed inset-0 z-50 flex flex-col items-center justify-center bg-background/80 backdrop-blur-sm ${className}`}
      role="status"
      aria-live="polite"
    >
      <LoaderSpinner size={48} className="mb-4" />
      <span className="text-lg text-muted-foreground">{description}</span>
    </div>
  );
}
