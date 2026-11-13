import { Link, Outlet, useNavigate } from 'react-router'
import { AlertBanner } from '~/core/ui/AlertBanner'
import { notifyGoodbye } from '~/core/ui/apiToast'
import { useAuthStore } from '~/features/auth/data/store/auth.store'
import { UserDirectoryPanel } from '~/features/users/ui/components/UserDirectoryPanel'

export function AppLayout() {
  const navigate = useNavigate()
  const logout = useAuthStore((s) => s.logout)

  function handleLogout() {
    logout()
    notifyGoodbye()
    navigate('/login', { replace: true })
  }

  return (
    <div className="min-h-screen">
      <header className="border-b border-line bg-paper-raised px-4 py-5 sm:px-8">
        <div className="mx-auto flex max-w-6xl flex-wrap items-start justify-between gap-3">
          <div>
          <Link to="/app" className="text-xl font-semibold tracking-tight text-ink sm:text-2xl hover:text-accent">
            Usuarios y publicaciones
          </Link>
          <p className="mt-1 text-sm text-ink-muted">
            Prueba técnica con la API{' '}
            <a
              href="https://jsonplaceholder.typicode.com"
              className="text-accent underline-offset-2 hover:underline"
              target="_blank"
              rel="noopener noreferrer"
            >
              JSONPlaceholder
            </a>
          </p>
          </div>
          <button
            type="button"
            onClick={handleLogout}
            className="rounded-lg border border-line-strong px-3 py-1.5 text-sm font-medium text-ink-muted hover:border-line hover:text-ink"
          >
            Cerrar sesión
          </button>
        </div>
      </header>

      <main className="mx-auto flex max-w-6xl flex-col gap-6 p-4 sm:p-8">
        <AlertBanner
          variant="info"
          message="Sesión de demostración: los POST a JSONPlaceholder no persisten; las publicaciones nuevas solo se reflejan en esta sesión."
        />
        <div className="flex flex-col gap-6 lg:grid lg:grid-cols-[minmax(0,21rem)_1fr] lg:items-start lg:gap-5">
        <div className="w-full lg:sticky lg:top-6 lg:max-h-[calc(100vh-7rem)] lg:overflow-y-auto">
          <UserDirectoryPanel />
        </div>

        <div className="min-h-[12rem] w-full lg:min-h-[28rem]">
          <Outlet />
        </div>
        </div>
      </main>
    </div>
  )
}
