import type { Post } from '../api/types'
import { LoadingSpinner } from './LoadingSpinner'
import { StatusMessage } from './StatusMessage'

type PostListProps = {
  posts: Post[]
  loading: boolean
  error: string | null
  onRetry: () => void
}

export function PostList({ posts, loading, error, onRetry }: PostListProps) {
  if (loading) {
    return <LoadingSpinner label="Cargando publicaciones…" />
  }

  if (error) {
    return <StatusMessage message={error} onRetry={onRetry} />
  }

  if (posts.length === 0) {
    return (
      <p className="rounded-lg border border-dashed border-slate-200 px-4 py-8 text-center text-sm text-slate-500">
        Este usuario no tiene publicaciones en la API de prueba.
      </p>
    )
  }

  return (
    <ul className="max-h-80 space-y-3 overflow-y-auto pr-1" aria-label="Publicaciones">
      {posts.map((post) => (
        <li
          key={post.id}
          className="rounded-lg border border-slate-200 bg-white px-4 py-3 shadow-sm"
        >
          <h3 className="font-medium text-slate-900">{post.title}</h3>
          <p className="mt-1 line-clamp-3 text-sm text-slate-600">{post.body}</p>
        </li>
      ))}
    </ul>
  )
}
