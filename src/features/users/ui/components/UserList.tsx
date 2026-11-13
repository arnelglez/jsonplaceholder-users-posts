import { useMemo, useState } from 'react'
import { AlertBanner } from '~/core/ui/AlertBanner'
import { LoadingSpinner } from '~/core/ui/LoadingSpinner'
import { StatusMessage } from '~/core/ui/StatusMessage'
import { UserAvatar } from '~/core/ui/UserAvatar'
import type { User } from '~/features/users/domain/types'

type UserListProps = {
  users: User[]
  loading: boolean
  error: string | null
  selectedUserId?: number | null
  onUserChoose: (user: User) => void
  onRetry: () => void
}

export function UserList({
  users,
  loading,
  error,
  selectedUserId = null,
  onUserChoose,
  onRetry,
}: UserListProps) {
  const [query, setQuery] = useState('')

  const filtered = useMemo(() => {
    const normalized = query.trim().toLowerCase()
    if (!normalized) return users
    return users.filter((user) => user.name.toLowerCase().includes(normalized))
  }, [users, query])

  return (
    <section aria-label="Usuarios" className="flex flex-col gap-4">
      <div>
        <h2 className="text-base font-semibold text-ink">Usuarios</h2>
        <label htmlFor="user-search" className="mt-3 block text-sm font-medium text-ink-muted">
          Buscar por nombre
        </label>
        <input
          id="user-search"
          type="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Ej. Leanne"
          className="field-focus mt-1.5 w-full rounded-lg border border-line bg-paper px-3 py-2 text-sm text-ink placeholder:text-ink-faint"
        />
        {!loading && !error ? (
          <p className="mt-1.5 text-xs text-ink-faint">
            {filtered.length} de {users.length} mostrados
          </p>
        ) : null}
      </div>

      {loading ? <LoadingSpinner label="Cargando usuarios…" /> : null}
      {error ? <StatusMessage message={error} onRetry={onRetry} /> : null}

      {!loading && !error ? (
        <ul className="space-y-1">
          {filtered.length === 0 ? (
            <li>
              <AlertBanner
                variant="info"
                title="Sin resultados"
                message="Ningún usuario coincide con la búsqueda. Prueba con otro nombre o borra el texto del campo."
              />
            </li>
          ) : (
            filtered.map((user) => {
              const selected = user.id === selectedUserId
              return (
              <li key={user.id}>
                <button
                  type="button"
                  onClick={() => onUserChoose(user)}
                  aria-selected={selected}
                  className={`interactive-row flex w-full items-center gap-2.5 rounded-lg border px-2.5 py-2 text-left text-sm ${
                    selected
                      ? 'border-accent bg-accent-soft text-ink'
                      : 'border-transparent text-ink hover:border-line hover:bg-paper'
                  }`}
                >
                  <UserAvatar user={user} />
                  <span className="min-w-0 flex-1">
                    <span className="block truncate font-medium">{user.name}</span>
                    <span className="block truncate text-xs text-ink-faint">{user.email}</span>
                  </span>
                </button>
              </li>
            )})
          )}
        </ul>
      ) : null}
    </section>
  )
}
