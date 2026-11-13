type StatusMessageProps = {
  message: string
  onRetry?: () => void
}

export function StatusMessage({ message, onRetry }: StatusMessageProps) {
  return (
    <div
      className="rounded-xl border border-danger/25 bg-danger-soft px-4 py-3 text-sm text-danger"
      role="alert"
    >
      <p>{message}</p>
      {onRetry ? (
        <button
          type="button"
          onClick={onRetry}
          className="mt-2 font-semibold underline underline-offset-2 transition-opacity hover:opacity-80"
        >
          Reintentar
        </button>
      ) : null}
    </div>
  )
}
