import { Toaster } from 'sonner'

/** Sonner — mismo stack que 7Seconds / Vendix. */
export function AppToaster() {
  return (
    <Toaster
      position="top-center"
      richColors
      closeButton
      duration={4500}
      toastOptions={{
        classNames: {
          toast: 'font-sans',
        },
      }}
    />
  )
}
