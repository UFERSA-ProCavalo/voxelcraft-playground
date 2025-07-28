import * as React from "react";

/**
 * LoaderSpinner - spinner centralizado simples usando shadcn/ui e Tailwind.
 *
 * @param className Classes CSS adicionais.
 * @param size Tamanho do spinner (padrão 24).
 */
export function LoaderSpinner({
  className = "",
  size = 24,
}: {
  className?: string;
  size?: number;
}) {
  return (
    <svg
      className={`animate-spin text-muted-foreground ${className}`}
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-label="Loading"
      role="status"
    >
      <circle
        className="opacity-25"
        cx="12"
        cy="12"
        r="10"
        stroke="currentColor"
        strokeWidth="4"
      />
      <path
        className="opacity-75"
        fill="currentColor"
        d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
      />
    </svg>
  );
}
