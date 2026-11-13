import { toast } from 'sonner'

/** Allowlisted JSONPlaceholder operations (reference for reviewers). */
export const API_OPERATIONS = {
  usersList: { method: 'GET', path: '/users' },
  userById: { method: 'GET', path: '/users/:id' },
  postsByUser: { method: 'GET', path: '/posts?userId=' },
  createPost: { method: 'POST', path: '/posts' },
} as const

export function notifyWelcome() {
  toast.success('Bienvenido', {
    description: 'Sesión iniciada. Ya puedes explorar usuarios y publicaciones.',
  })
}

export function notifyGoodbye() {
  toast.info('Hasta pronto', {
    description: 'Has cerrado sesión. Vuelve cuando quieras.',
  })
}

/** Sonner success: POST /posts accepted in UI. */
export function notifyPostCreated() {
  toast.success('Publicación creada', {
    description: 'Aparece arriba en la lista. JSONPlaceholder no persiste el POST.',
  })
}
