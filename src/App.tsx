import { useMemo, useState } from 'react'
import { CreatePostForm } from './components/CreatePostForm'
import { PostList } from './components/PostList'
import { UserList } from './components/UserList'
import { useCreatePost } from './hooks/useCreatePost'
import { usePosts } from './hooks/usePosts'
import { useUsers } from './hooks/useUsers'

function App() {
  const [selectedUserId, setSelectedUserId] = useState<number | null>(null)
  const { users, loading: usersLoading, error: usersError, retry: retryUsers } = useUsers()
  const {
    posts,
    loading: postsLoading,
    error: postsError,
    retry: retryPosts,
    prependPost,
  } = usePosts(selectedUserId)
  const { submitting, error: createError, create, clearError } = useCreatePost()

  const selectedUser = useMemo(
    () => users.find((user) => user.id === selectedUserId) ?? null,
    [users, selectedUserId],
  )

  return (
    <div className="min-h-screen">
      <header className="border-b border-slate-200 bg-white px-4 py-6 shadow-sm sm:px-8">
        <h1 className="text-2xl font-bold tracking-tight text-slate-900">
          JSONPlaceholder — Usuarios y publicaciones
        </h1>
        <p className="mt-1 text-sm text-slate-600">
          Datos de demostración desde{' '}
          <a
            href="https://jsonplaceholder.typicode.com"
            className="text-indigo-600 underline-offset-2 hover:underline"
            target="_blank"
            rel="noreferrer"
          >
            jsonplaceholder.typicode.com
          </a>
        </p>
      </header>

      <main className="mx-auto grid max-w-6xl gap-6 p-4 sm:p-8 lg:grid-cols-[minmax(0,22rem)_1fr]">
        <aside className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm lg:min-h-[28rem]">
          <UserList
            users={users}
            loading={usersLoading}
            error={usersError}
            selectedUserId={selectedUserId}
            onSelect={setSelectedUserId}
            onRetry={retryUsers}
          />
        </aside>

        <section className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm sm:p-6">
          {selectedUser === null ? (
            <div className="flex min-h-48 flex-col items-center justify-center text-center text-slate-500">
              <p className="text-lg font-medium text-slate-700">Elige un usuario</p>
              <p className="mt-2 max-w-sm text-sm">
                Selecciona alguien de la lista para ver sus publicaciones y crear una nueva.
              </p>
            </div>
          ) : (
            <>
              <header className="mb-4 border-b border-slate-100 pb-4">
                <h2 className="text-xl font-semibold text-slate-900">{selectedUser.name}</h2>
                <p className="text-sm text-slate-500">{selectedUser.email}</p>
              </header>

              <PostList
                posts={posts}
                loading={postsLoading}
                error={postsError}
                onRetry={retryPosts}
              />

              <CreatePostForm
                userId={selectedUser.id}
                submitting={submitting}
                submitError={createError}
                onClearError={clearError}
                onSubmit={async (values) => {
                  const created = await create({
                    title: values.title.trim(),
                    body: values.body.trim(),
                    userId: selectedUser.id,
                  })
                  if (created) {
                    prependPost(created)
                  }
                }}
              />
            </>
          )}
        </section>
      </main>
    </div>
  )
}

export default App
