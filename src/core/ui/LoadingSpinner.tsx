type LoadingSpinnerProps = {
  label?: string
}

export function LoadingSpinner({ label = 'Cargando…' }: LoadingSpinnerProps) {
  return (
    <div className="flex items-center gap-3 text-ink-muted" role="status" aria-live="polite">
      <span
        className="anim-spin size-5 rounded-full border-2 border-line border-t-accent"
        aria-hidden
      />
      <span className="text-sm">{label}</span>
    </div>
  )
}
