import { AlertBanner } from '~/core/ui/AlertBanner'

export function UsersPage() {
  return (
    <div className="space-y-4">
      <AlertBanner
        variant="info"
        title="Selecciona un usuario"
        message="Elige un nombre en el panel lateral (o abajo en móvil) para cargar publicaciones y abrir el formulario de creación."
      />
      <div className="hidden rounded-lg border border-dashed border-line bg-paper px-6 py-12 text-center lg:block">
        <p className="text-lg font-medium text-ink">Nada seleccionado todavía</p>
        <p className="mt-2 text-sm text-ink-muted">
          Al hacer clic en un usuario verás sus posts y podrás crear uno nuevo con validación.
        </p>
      </div>
    </div>
  )
}
