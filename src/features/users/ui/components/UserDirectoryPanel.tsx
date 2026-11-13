import { useMemo } from 'react'
import { useMatch, useNavigate } from 'react-router'
import { AlertBanner } from '~/core/ui/AlertBanner'
import { UserList } from '~/features/users/ui/components/UserList'
import { useUsers } from '~/features/users/data/hooks/useUsers'

export function UserDirectoryPanel() {
  const navigate = useNavigate()
  const postsMatch = useMatch('/app/users/:userId/posts')
  const selectedUserId = useMemo(() => {
    const raw = postsMatch?.params.userId
    if (!raw) return null
    const id = Number(raw)
    return Number.isInteger(id) ? id : null
  }, [postsMatch])

  const { users, loading, error, retry } = useUsers()

  return (
    <section className="rounded-lg border border-line bg-paper-raised p-4 shadow-sm">
      <AlertBanner
        variant="info"
        title="Directorio"
        message="Los datos vienen de GET /users. La búsqueda filtra en el navegador; si falla la red, usa Reintentar."
      />
      <div className="mt-4">
      <UserList
        users={users}
        loading={loading}
        error={error}
        selectedUserId={selectedUserId}
        onUserChoose={(user) => navigate(`/app/users/${user.id}/posts`)}
        onRetry={retry}
      />
      </div>
    </section>
  )
}
