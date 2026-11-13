import { Link, useLocation } from 'react-router'
import { AlertBanner } from '~/core/ui/AlertBanner'
import { useAuthStore } from '~/features/auth/data/store/auth.store'

export function NotFoundPage() {
  const location = useLocation()
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated)

  return (
    <div className="flex min-h-screen flex-col">
      <header className="border-b border-line bg-paper-raised px-4 py-4 sm:px-8">
        <div className="mx-auto max-w-lg">
          <Link to="/" className="text-sm font-medium text-accent hover:underline">
            JSONPlaceholder Demo
          </Link>
        </div>
      </header>

      <main className="flex flex-1 items-center justify-center px-4 py-12">
        <div className="anim-panel-in w-full max-w-lg rounded-xl border border-line bg-paper-raised p-8 text-center shadow-sm sm:p-10">
          <p className="text-6xl font-semibold tracking-tight text-accent" aria-hidden>
            404
          </p>
          <h1 className="mt-4 text-xl font-semibold text-ink">Página no encontrada</h1>
          <div className="mt-6 text-left">
            <AlertBanner
              variant="error"
              title="Ruta no válida"
              message={`No hay contenido en ${location.pathname}. Revisa el enlace o vuelve al inicio o al panel.`}
            />
          </div>

          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <Link
              to="/"
              className="rounded-lg bg-accent px-4 py-2 text-sm font-medium text-white hover:bg-accent-hover"
            >
              Ir al inicio
            </Link>
            {isAuthenticated ? (
              <Link
                to="/app"
                className="rounded-lg border border-line-strong px-4 py-2 text-sm font-medium text-ink hover:border-accent hover:text-accent"
              >
                Ir al panel
              </Link>
            ) : (
              <Link
                to="/login"
                className="rounded-lg border border-line-strong px-4 py-2 text-sm font-medium text-ink hover:border-accent hover:text-accent"
              >
                Iniciar sesión
              </Link>
            )}
          </div>
        </div>
      </main>
    </div>
  )
}
