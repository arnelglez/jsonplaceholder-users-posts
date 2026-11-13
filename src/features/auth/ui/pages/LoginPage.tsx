import { useEffect, useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router'
import { DEMO_PASSWORD, DEMO_USERNAME } from '~/features/auth/domain/credentials'
import { AlertBanner } from '~/core/ui/AlertBanner'
import { notifyWelcome } from '~/core/ui/apiToast'
import { useAuthStore } from '~/features/auth/data/store/auth.store'

function getRedirectPath(state: unknown): string {
  const from = (state as { from?: { pathname?: string } } | null)?.from?.pathname
  return from?.startsWith('/app') ? from : '/app'
}

export function LoginPage() {
  const navigate = useNavigate()
  const location = useLocation()
  const login = useAuthStore((s) => s.login)
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated)

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (!isAuthenticated) return
    navigate(getRedirectPath(location.state), { replace: true })
  }, [isAuthenticated, location.state, navigate])

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setError(null)
    const ok = login(username, password)
    if (ok) {
      notifyWelcome()
      navigate(getRedirectPath(location.state), { replace: true })
      return
    }
    setError('Usuario o contraseña incorrectos.')
  }

  return (
    <div className="flex min-h-screen flex-col">
      <header className="border-b border-line bg-paper-raised px-4 py-4 sm:px-8">
        <div className="mx-auto max-w-md">
          <Link to="/" className="text-sm font-medium text-accent hover:underline">
            ← Volver al inicio
          </Link>
        </div>
      </header>

      <main className="flex flex-1 items-center justify-center px-4 py-10">
        <div className="anim-panel-in w-full max-w-md rounded-xl border border-line bg-paper-raised p-6 shadow-sm sm:p-8">
          <h1 className="text-xl font-semibold text-ink">Acceso al panel</h1>
          <p className="mt-2 text-sm text-ink-muted">
            Inicia sesión para gestionar usuarios y publicaciones de la demo.
          </p>

          <AlertBanner
            variant="info"
            title="Acceso demo"
            message={`Usa usuario ${DEMO_USERNAME} y contraseña ${DEMO_PASSWORD}. La sesión se guarda solo en este navegador.`}
          />

          <form className="mt-6 space-y-4" onSubmit={handleSubmit} noValidate>
            <div>
              <label htmlFor="login-username" className="block text-sm font-medium text-ink">
                Usuario
              </label>
              <input
                id="login-username"
                name="username"
                type="text"
                autoComplete="username"
                required
                className="mt-1 w-full rounded-lg border border-line-strong bg-paper px-3 py-2 text-ink outline-none focus:border-accent focus:ring-2 focus:ring-accent"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>

            <div>
              <label htmlFor="login-password" className="block text-sm font-medium text-ink">
                Contraseña
              </label>
              <input
                id="login-password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                className="mt-1 w-full rounded-lg border border-line-strong bg-paper px-3 py-2 text-ink outline-none focus:border-accent focus:ring-2 focus:ring-accent"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            {error ? <AlertBanner variant="error" title="No se pudo entrar" message={error} /> : null}

            <button
              type="submit"
              className="w-full rounded-lg bg-accent py-2.5 text-sm font-medium text-white hover:bg-accent-hover"
            >
              Entrar
            </button>
          </form>

        </div>
      </main>
    </div>
  )
}
