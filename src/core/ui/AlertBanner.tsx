type AlertBannerProps = {
  variant: 'info' | 'error'
  message: string
  title?: string
  onRetry?: () => void
}

const variantClass: Record<AlertBannerProps['variant'], string> = {
  info: 'border-accent/25 bg-accent-soft text-ink-muted',
  error: 'border-danger/25 bg-danger-soft text-danger',
}

export function AlertBanner({ variant, message, title, onRetry }: AlertBannerProps) {
  const isError = variant === 'error'

  return (
    <div
      className={`rounded-xl border px-4 py-3 text-sm ${variantClass[variant]}`}
      role={isError ? 'alert' : 'status'}
      aria-live={isError ? 'assertive' : 'polite'}
    >
      {title ? <p className={`font-semibold ${isError ? 'text-danger' : 'text-ink'}`}>{title}</p> : null}
      <p className={title ? 'mt-1' : undefined}>{message}</p>
      {onRetry ? (
        <button
          type="button"
          onClick={onRetry}
          className={`mt-2 font-semibold underline underline-offset-2 transition-opacity hover:opacity-80 ${
            isError ? 'text-danger' : 'text-accent'
          }`}
        >
          Reintentar
        </button>
      ) : null}
    </div>
  )
}
