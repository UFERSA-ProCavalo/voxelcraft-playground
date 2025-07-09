import { LoaderSpinner } from './LoaderSpinner'
import type { ReactNode } from 'react'

export function FullPageLoader({
  description = 'Carregando...',
  className = '',
  spinner = <LoaderSpinner size={48} />,
}: {
  description?: string;
  className?: string;
  spinner?: ReactNode;
}) {
  return (
    <div
      className={`fixed inset-0 z-50 flex flex-col items-center justify-center backdrop-blur-sm ${className}`}
      style={{ backgroundColor: 'var(--background)' }}
    >
      {spinner}
      <span className="mt-4 text-base text-foreground animate-pulse">{description}</span>
    </div>
  )
}
