import { useEffect, useMemo } from 'react'
import { Link, useNavigate, useParams } from 'react-router'
import { AlertBanner } from '~/core/ui/AlertBanner'
import { notifyPostCreated } from '~/core/ui/apiToast'
import { LoadingSpinner } from '~/core/ui/LoadingSpinner'
import { StatusMessage } from '~/core/ui/StatusMessage'
import { UserAvatar } from '~/core/ui/UserAvatar'
import { assertAllowedUserId } from '~/core/security/validation'
import { usePostsUiStore } from '~/features/posts/data/store/postsUi.store'
import { useCreatePost } from '~/features/posts/data/hooks/useCreatePost'
import { usePosts } from '~/features/posts/data/hooks/usePosts'
import { useUserById } from '~/features/users/data/hooks/useUserById'
import { CreatePostForm } from '~/features/posts/ui/components/CreatePostForm'
import { PostList } from '~/features/posts/ui/components/PostList'

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

  const { user, loading: userLoading, error: userError, retry: retryUser } = useUserById(userId)

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
      navigate('/app', { replace: true })
    }
  }, [userId, navigate])

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
      <AlertBanner
        variant="info"
        title="Publicaciones"
        message="GET /posts?userId=… y POST /posts simulado. Los errores de red se muestran aquí; solo el POST exitoso lanza un toast arriba a la derecha."
      />
      <nav className="lg:hidden">
        <Link to="/app" className="text-sm font-medium text-accent hover:underline">
          ← Volver a usuarios
        </Link>
      </nav>

      {userLoading ? (
        <LoadingSpinner label="Cargando usuario…" />
      ) : userError ? (
        <StatusMessage message={userError} onRetry={retryUser} />
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
                notifyPostCreated()
              }
            }}
          />
        </>
      ) : null}
    </div>
  )
}
