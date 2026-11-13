import { useMemo, useState } from 'react'
import type { User } from '../api/types'
import { LoadingSpinner } from './LoadingSpinner'
import { StatusMessage } from './StatusMessage'

type UserListProps = {
  users: User[]
  loading: boolean
  error: string | null
  selectedUserId: number | null
  onSelect: (userId: number) => void
  onRetry: () => void
}

export function UserList({
  users,
  loading,
  error,
  selectedUserId,
  onSelect,
  onRetry,
}: UserListProps) {
  const [query, setQuery] = useState('')

  const filtered = useMemo(() => {
    const normalized = query.trim().toLowerCase()
    if (!normalized) return users
    return users.filter((user) => user.name.toLowerCase().includes(normalized))
  }, [users, query])

  return (
    <section aria-label="Usuarios" className="flex h-full flex-col gap-4">
      <div>
        <h2 className="text-lg font-semibold text-slate-900">Usuarios</h2>
        <label htmlFor="user-search" className="mt-3 block text-sm font-medium text-slate-700">
          Buscar por nombre
        </label>
        <input
          id="user-search"
          type="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Ej. Leanne"
          className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 text-sm shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-200"
        />
        {!loading && !error ? (
          <p className="mt-2 text-xs text-slate-500">
            {filtered.length} de {users.length} usuario{users.length === 1 ? '' : 's'}
          </p>
        ) : null}
      </div>

      {loading ? <LoadingSpinner label="Cargando usuarios…" /> : null}
      {error ? <StatusMessage message={error} onRetry={onRetry} /> : null}

      {!loading && !error ? (
        <ul className="max-h-[min(60vh,32rem)] flex-1 space-y-1 overflow-y-auto pr-1">
          {filtered.length === 0 ? (
            <li className="rounded-lg border border-dashed border-slate-200 px-3 py-6 text-center text-sm text-slate-500">
              Ningún usuario coincide con la búsqueda.
            </li>
          ) : (
            filtered.map((user) => {
              const selected = user.id === selectedUserId
              return (
                <li key={user.id}>
                  <button
                    type="button"
                    onClick={() => onSelect(user.id)}
                    aria-selected={selected}
                    className={`w-full rounded-lg border px-3 py-2 text-left text-sm transition-colors ${
                      selected
                        ? 'border-indigo-600 bg-indigo-50 text-indigo-950'
                        : 'border-slate-200 bg-white text-slate-800 hover:border-slate-300 hover:bg-slate-50'
                    }`}
                  >
                    <span className="block font-medium">{user.name}</span>
                    <span className="block text-xs text-slate-500">{user.email}</span>
                  </button>
                </li>
              )
            })
          )}
        </ul>
      ) : null}
    </section>
  )
}
