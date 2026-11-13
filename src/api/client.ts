import type { CreatePostInput, Post, User } from './types'

const BASE_URL = 'https://jsonplaceholder.typicode.com'

export class ApiError extends Error {
  readonly status: number

  constructor(message: string, status: number) {
    super(message)
    this.name = 'ApiError'
    this.status = status
  }
}

async function request<T>(path: string, init?: RequestInit): Promise<T> {
  let response: Response
  try {
    response = await fetch(`${BASE_URL}${path}`, {
      ...init,
      headers: {
        'Content-Type': 'application/json',
        ...init?.headers,
      },
    })
  } catch {
    throw new ApiError('No se pudo conectar con el servidor. Revisa tu conexión.', 0)
  }

  if (!response.ok) {
    throw new ApiError(`Error ${response.status}: ${response.statusText}`, response.status)
  }

  return response.json() as Promise<T>
}

export function getUsers(): Promise<User[]> {
  return request<User[]>('/users')
}

export function getPostsByUserId(userId: number): Promise<Post[]> {
  return request<Post[]>(`/posts?userId=${userId}`)
}

export function createPost(input: CreatePostInput): Promise<Post> {
  return request<Post>('/posts', {
    method: 'POST',
    body: JSON.stringify(input),
  })
}
