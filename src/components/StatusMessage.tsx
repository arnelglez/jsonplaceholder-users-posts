type StatusMessageProps = {
  message: string
  onRetry?: () => void
}

export function StatusMessage({ message, onRetry }: StatusMessageProps) {
  return (
    <div
      className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-800"
      role="alert"
    >
      <p>{message}</p>
      {onRetry ? (
        <button
          type="button"
          onClick={onRetry}
          className="mt-2 font-medium text-red-900 underline underline-offset-2 hover:text-red-700"
        >
          Reintentar
        </button>
      ) : null}
    </div>
  )
}
