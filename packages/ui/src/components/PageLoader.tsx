
export function PageLoader({ className = '' }: { className?: string }) {
  return (
    <div className={`w-full h-1 overflow-hidden ${className}`}>
      <div
        className="w-full h-full animate-page-loader bg-[color:var(--color-primary)]"
      />
    </div>
  );
}
