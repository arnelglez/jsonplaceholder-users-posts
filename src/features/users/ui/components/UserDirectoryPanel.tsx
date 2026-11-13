import { useEffect, useMemo } from 'react'
import { useMatch, useNavigate } from 'react-router'
import { toast } from 'sonner'
import { UserList } from '~/features/users/ui/components/UserList'
import { useUsers } from '~/features/users/data/hooks/useUsers'

export function UserDirectoryPanel() {
  const navigate = useNavigate()
  const postsMatch = useMatch('/users/:userId/posts')
  const selectedUserId = useMemo(() => {
    const raw = postsMatch?.params.userId
    if (!raw) return null
    const id = Number(raw)
    return Number.isInteger(id) ? id : null
  }, [postsMatch])

  const { users, loading, error, retry } = useUsers()

  useEffect(() => {
    if (!error) return
    toast.error('Error al cargar usuarios', { description: error })
  }, [error])

  return (
    <section className="rounded-lg border border-line bg-paper-raised p-4 shadow-sm">
      <UserList
        users={users}
        loading={loading}
        error={error}
        selectedUserId={selectedUserId}
        onUserChoose={(user) => navigate(`/users/${user.id}/posts`)}
        onRetry={retry}
      />
    </section>
  )
}
