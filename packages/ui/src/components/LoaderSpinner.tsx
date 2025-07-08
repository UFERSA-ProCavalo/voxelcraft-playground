export function LoaderSpinner({ size = 32, className = '' }: { size?: number; className?: string }) {
  return (
    <span
      className={`inline-block animate-spin rounded-full border-4 border-solid border-[color:var(--color-border)] border-t-[color:var(--color-primary)] ${className}`}
      style={{ width: size, height: size }}
      role="status"
      aria-label="Loading"
    />
  );
}
