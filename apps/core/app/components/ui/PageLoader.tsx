/**
 * PageLoader - barra de carregamento exibida abaixo do cabeçalho.
 *
 * @param loading Indica se o loader deve ser exibido.
 * @param className Classes CSS adicionais.
 */
export function PageLoader({
  loading = true,
  className = "",
}: {
  loading?: boolean;
  className?: string;
}) {
  if (!loading) return null;
  return (
    <div
      className={`w-full h-1 bg-gradient-to-r from-primary to-accent animate-pulse ${className}`}
    />
  );
}
