import { LoaderSpinner } from './LoaderSpinner'

export function FullPageLoader({ description = 'Carregando...', className = '' }: { description?: string; className?: string }) {
  return (
    <div
      className={`fixed inset-0 z-50 flex flex-col items-center justify-center backdrop-blur-sm ${className}`}
      style={{ backgroundColor: 'var(--background)' }}
    >
      <LoaderSpinner size={48} />
      <span className="mt-4 text-base text-foreground animate-pulse">{description}</span>
    </div>
  )
}
