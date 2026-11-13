import { useEffect, useMemo, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router'
import { LoadingSpinner } from '~/core/ui/LoadingSpinner'
import { StatusMessage } from '~/core/ui/StatusMessage'
import { UserAvatar } from '~/core/ui/UserAvatar'
import { assertAllowedUserId } from '~/core/security/validation'
import { fetchUserById } from '~/features/users/data/api/users.api'
import { usePostsUiStore } from '~/features/posts/data/store/postsUi.store'
import { useCreatePost } from '~/features/posts/data/hooks/useCreatePost'
import { usePosts } from '~/features/posts/data/hooks/usePosts'
import type { User } from '~/features/users/domain/types'
import { CreatePostForm } from '~/features/posts/ui/components/CreatePostForm'
import { PostList } from '~/features/posts/ui/components/PostList'
import { toast } from 'sonner'

function parseRouteUserId(raw: string | undefined): number | null {
  if (!raw) return null
  const id = Number(raw)
  if (!Number.isInteger(id)) return null
  try {
    assertAllowedUserId(id)
    return id
  } catch {
    return null
  }
}

export function UserPostsPage() {
  const { userId: userIdParam } = useParams()
  const navigate = useNavigate()
  const userId = useMemo(() => parseRouteUserId(userIdParam), [userIdParam])

  const highlightPostId = usePostsUiStore((s) => s.highlightPostId)
  const setHighlightPostId = usePostsUiStore((s) => s.setHighlightPostId)

  const [user, setUser] = useState<User | null>(null)
  const [userLoading, setUserLoading] = useState(true)
  const [userError, setUserError] = useState<string | null>(null)
  const [userRetry, setUserRetry] = useState(0)

  const {
    posts,
    loading: postsLoading,
    error: postsError,
    retry: retryPosts,
    prependPost,
  } = usePosts(userId)
  const { submitting, error: createError, create, clearError } = useCreatePost()

  useEffect(() => {
    if (userId === null) {
      navigate('/', { replace: true })
      return
    }

    let cancelled = false
    setUserLoading(true)
    setUserError(null)

    fetchUserById(userId)
      .then((data) => {
        if (!cancelled) setUser(data)
      })
      .catch((err: Error) => {
        if (!cancelled) {
          setUserError(err.message)
          setUser(null)
        }
      })
      .finally(() => {
        if (!cancelled) setUserLoading(false)
      })

    return () => {
      cancelled = true
    }
  }, [userId, navigate, userRetry])

  useEffect(() => {
    if (!postsError) return
    toast.error('Error al cargar publicaciones', { description: postsError })
  }, [postsError])

  useEffect(() => {
    if (highlightPostId === null) return
    const timer = window.setTimeout(() => setHighlightPostId(null), 800)
    return () => window.clearTimeout(timer)
  }, [highlightPostId, setHighlightPostId])

  if (userId === null) {
    return null
  }

  return (
    <div className="space-y-6 rounded-lg border border-line bg-paper-raised p-4 shadow-sm sm:p-6">
      <nav className="lg:hidden">
        <Link to="/" className="text-sm font-medium text-accent hover:underline">
          ← Volver a usuarios
        </Link>
      </nav>

      {userLoading ? (
        <LoadingSpinner label="Cargando usuario…" />
      ) : userError ? (
        <StatusMessage message={userError} onRetry={() => setUserRetry((n) => n + 1)} />
      ) : user ? (
        <>
          <header className="flex items-center gap-3 border-b border-line pb-5">
            <UserAvatar user={user} size="md" />
            <div className="min-w-0">
              <h1 className="truncate text-lg font-semibold text-ink">{user.name}</h1>
              <p className="truncate text-sm text-ink-muted">{user.email}</p>
            </div>
          </header>

          <PostList
            posts={posts}
            loading={postsLoading}
            error={postsError}
            onRetry={retryPosts}
            highlightPostId={highlightPostId}
          />

          <CreatePostForm
            userId={user.id}
            submitting={submitting}
            submitError={createError}
            onClearError={clearError}
            onSubmit={async (values) => {
              const created = await create({
                title: values.title,
                body: values.body,
                userId: user.id,
              })
              if (created) {
                prependPost(created)
                setHighlightPostId(created.id)
                toast.success('Publicación creada', {
                  description:
                    'Aparece arriba en la lista. JSONPlaceholder no persiste el POST en el servidor.',
                })
              } else {
                toast.error('No se pudo crear la publicación', {
                  description: 'Revisa la conexión o inténtalo de nuevo.',
                })
              }
            }}
          />
        </>
      ) : null}
    </div>
  )
}
