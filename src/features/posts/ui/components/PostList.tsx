import { AlertBanner } from '~/core/ui/AlertBanner'
import { LoadingSpinner } from '~/core/ui/LoadingSpinner'
import { StatusMessage } from '~/core/ui/StatusMessage'
import type { Post } from '~/features/posts/domain/types'

type PostListProps = {
  posts: Post[]
  loading: boolean
  error: string | null
  onRetry: () => void
  highlightPostId?: number | null
}

export function PostList({ posts, loading, error, onRetry, highlightPostId }: PostListProps) {
  if (loading) {
    return <LoadingSpinner label="Cargando publicaciones…" />
  }

  if (error) {
    return <StatusMessage message={error} onRetry={onRetry} />
  }

  if (posts.length === 0) {
    return (
      <AlertBanner
        variant="info"
        title="Lista vacía"
        message="Este usuario no tiene publicaciones en la API de prueba. Puedes crear la primera con el formulario inferior."
      />
    )
  }

  return (
    <div>
      <h3 className="mb-3 text-sm font-medium text-ink-muted">
        Publicaciones ({posts.length})
      </h3>
      <ul className="max-h-80 space-y-2 overflow-y-auto" aria-label="Publicaciones">
        {posts.map((post) => {
          const isNew = highlightPostId === post.id
          return (
            <li
              key={post.id}
              className={`relative rounded-lg border border-line bg-paper px-4 py-3 ${isNew ? 'post-card-new' : ''}`}
            >
              <h4 className="font-medium text-ink">{post.title}</h4>
              <p className="mt-1.5 line-clamp-3 text-sm text-ink-muted">{post.body}</p>
            </li>
          )
        })}
      </ul>
    </div>
  )
}
