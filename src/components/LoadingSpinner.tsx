type LoadingSpinnerProps = {
  label?: string
}

export function LoadingSpinner({ label = 'Cargando…' }: LoadingSpinnerProps) {
  return (
    <div className="flex items-center gap-3 text-slate-600" role="status" aria-live="polite">
      <span
        className="size-5 animate-spin rounded-full border-2 border-slate-300 border-t-indigo-600"
        aria-hidden
      />
      <span>{label}</span>
    </div>
  )
}
