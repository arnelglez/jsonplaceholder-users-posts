import { Link } from 'react-router'
import { AlertBanner } from '~/core/ui/AlertBanner'
import { LandingPreview } from '~/features/landing/ui/components/LandingPreview'

const features = [
  {
    title: 'Datos en vivo',
    description: 'Usuarios y posts desde JSONPlaceholder con estados de carga y reintento.',
  },
  {
    title: 'Validación real',
    description: 'Formulario con Zod y react-hook-form; el POST simulado aparece al inicio de la lista.',
  },
  {
    title: 'Listo para revisar',
    description: 'TypeScript, tests Vitest, arquitectura por features y rutas con React Router.',
  },
]

const steps = [
  { n: '1', label: 'Inicia sesión', detail: 'Credenciales demo en /login' },
  { n: '2', label: 'Elige un usuario', detail: 'Búsqueda por nombre en el panel' },
  { n: '3', label: 'Crea un post', detail: 'Título y texto obligatorios' },
]

export function LandingPage() {
  return (
    <div className="landing-page min-h-screen">
      <header className="sticky top-0 z-10 border-b border-line/80 bg-paper-raised/90 px-4 py-4 backdrop-blur-sm sm:px-8">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="flex size-8 items-center justify-center rounded-lg bg-accent text-sm font-bold text-white">
              JP
            </span>
            <span className="text-base font-semibold text-ink sm:text-lg">JSONPlaceholder</span>
          </div>
          <nav className="flex items-center gap-2 sm:gap-3">
            <a
              href="https://github.com/arnelglez/jsonplaceholder-users-posts"
              className="hidden rounded-lg px-3 py-2 text-sm font-medium text-ink-muted hover:text-ink sm:inline-block"
              target="_blank"
              rel="noopener noreferrer"
            >
              GitHub
            </a>
            <Link
              to="/login"
              className="rounded-lg bg-accent px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-accent-hover"
            >
              Acceder
            </Link>
          </nav>
        </div>
      </header>

      <main>
        <section className="landing-hero mx-auto max-w-6xl px-4 pb-16 pt-10 sm:px-8 sm:pb-20 sm:pt-14">
          <div className="grid items-center gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:gap-10">
            <div className="anim-rise-in max-w-xl">
              <p className="inline-flex items-center gap-2 rounded-full border border-line bg-paper-raised px-3 py-1 text-xs font-medium text-ink-muted">
                <span className="size-1.5 rounded-full bg-emerald-500" aria-hidden />
                Demo · React + TypeScript
              </p>
              <h1 className="mt-5 text-balance text-4xl font-semibold tracking-tight text-ink sm:text-5xl">
                Usuarios y publicaciones,{' '}
                <span className="text-accent">sin ruido visual</span>
              </h1>
              <p className="mt-5 text-pretty text-base leading-relaxed text-ink-muted sm:text-lg">
                Una interfaz clara para explorar la API pública de JSONPlaceholder: busca usuarios,
                lee sus posts y envía publicaciones simuladas con validación en el cliente.
              </p>

              <div className="mt-8 flex flex-wrap gap-3">
                <Link
                  to="/login"
                  className="rounded-xl bg-accent px-6 py-3 text-sm font-medium text-white shadow-[0_8px_24px_rgb(37_99_235/0.28)] transition-colors hover:bg-accent-hover"
                >
                  Entrar al panel
                </Link>
                <a
                  href="https://jsonplaceholder.typicode.com"
                  className="rounded-xl border border-line-strong bg-paper-raised px-6 py-3 text-sm font-medium text-ink transition-colors hover:border-accent hover:text-accent"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Ver API
                </a>
              </div>

              <dl className="mt-10 grid grid-cols-3 gap-4 border-t border-line pt-8">
                <div>
                  <dt className="text-xs font-medium uppercase tracking-wide text-ink-faint">
                    Usuarios
                  </dt>
                  <dd className="mt-1 text-2xl font-semibold tabular-nums text-ink">10</dd>
                </div>
                <div>
                  <dt className="text-xs font-medium uppercase tracking-wide text-ink-faint">
                    Tests
                  </dt>
                  <dd className="mt-1 text-2xl font-semibold tabular-nums text-ink">20+</dd>
                </div>
                <div>
                  <dt className="text-xs font-medium uppercase tracking-wide text-ink-faint">
                    Stack
                  </dt>
                  <dd className="mt-1 text-sm font-semibold text-ink sm:text-2xl sm:leading-8">
                    Vite · RR7
                  </dd>
                </div>
              </dl>
            </div>

            <LandingPreview />
          </div>
        </section>

        <section className="border-t border-line bg-paper-raised py-14 sm:py-16">
          <div className="mx-auto max-w-6xl px-4 sm:px-8">
            <h2 className="text-center text-sm font-semibold uppercase tracking-wide text-ink-faint">
              Qué incluye
            </h2>
            <ul className="mt-8 grid gap-5 sm:grid-cols-3">
              {features.map((f, i) => (
                <li
                  key={f.title}
                  className="anim-rise-in anim-stagger rounded-2xl border border-line bg-paper p-6"
                  style={{ '--i': i } as React.CSSProperties}
                >
                  <h3 className="text-base font-semibold text-ink">{f.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-ink-muted">{f.description}</p>
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section className="mx-auto max-w-6xl px-4 py-14 sm:px-8 sm:py-16">
          <h2 className="text-center text-xl font-semibold text-ink">Cómo funciona</h2>
          <ol className="mt-10 grid gap-6 sm:grid-cols-3">
            {steps.map((step) => (
              <li
                key={step.n}
                className="relative rounded-2xl border border-line bg-paper-raised p-6 text-center"
              >
                <span className="mx-auto flex size-9 items-center justify-center rounded-full bg-accent-soft text-sm font-semibold text-accent">
                  {step.n}
                </span>
                <p className="mt-4 font-medium text-ink">{step.label}</p>
                <p className="mt-1 text-sm text-ink-muted">{step.detail}</p>
              </li>
            ))}
          </ol>
        </section>
      </main>

      <footer className="border-t border-line px-4 py-8 sm:px-8">
        <div className="mx-auto max-w-2xl">
          <AlertBanner
            variant="info"
            title="Antes de entrar"
            message="El panel requiere login demo (admin/admin). Es validación solo en el cliente, no seguridad de producción."
          />
          <p className="mt-4 text-center text-sm text-ink-faint">
            <Link to="/login" className="font-medium text-accent hover:underline">
              Ir al login
            </Link>
          </p>
        </div>
      </footer>
    </div>
  )
}
