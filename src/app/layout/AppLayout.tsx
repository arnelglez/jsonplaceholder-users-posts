import { Link, Outlet } from 'react-router'
import { AppToaster } from '~/core/ui/AppToaster'
import { UserDirectoryPanel } from '~/features/users/ui/components/UserDirectoryPanel'

export function AppLayout() {
  return (
    <div className="min-h-screen">
      <AppToaster />
      <header className="border-b border-line bg-paper-raised px-4 py-5 sm:px-8">
        <div className="mx-auto max-w-6xl">
          <Link to="/" className="text-xl font-semibold tracking-tight text-ink sm:text-2xl hover:text-accent">
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
      </header>

      <main className="mx-auto flex max-w-6xl flex-col gap-6 p-4 sm:p-8 lg:grid lg:grid-cols-[minmax(0,21rem)_1fr] lg:items-start lg:gap-5">
        <div className="w-full lg:sticky lg:top-6 lg:max-h-[calc(100vh-7rem)] lg:overflow-y-auto">
          <UserDirectoryPanel />
        </div>

        <div className="min-h-[12rem] w-full lg:min-h-[28rem]">
          <Outlet />
        </div>
      </main>
    </div>
  )
}
