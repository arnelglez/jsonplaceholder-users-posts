import { AlertBanner } from '~/core/ui/AlertBanner'

type StatusMessageProps = {
  message: string
  onRetry?: () => void
}

export function StatusMessage({ message, onRetry }: StatusMessageProps) {
  return <AlertBanner variant="error" message={message} onRetry={onRetry} />
}
