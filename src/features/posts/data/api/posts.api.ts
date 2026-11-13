import { http } from '~/core/network/httpClient'
import { HttpRequestError } from '~/core/network/errors'
import {
  assertAllowedUserId,
  parsePost,
  parsePosts,
  validateCreatePostInput,
} from '~/core/security/validation'
import type { CreatePostInput, Post } from '~/features/posts/domain/types'

export function fetchPostsByUserId(userId: number): Promise<Post[]> {
  assertAllowedUserId(userId)
  return http(`/posts?userId=${userId}`).then((raw) => parsePosts(raw, userId))
}

export function createPostRequest(input: CreatePostInput): Promise<Post> {
  const checked = validateCreatePostInput(input)
  if (!checked.ok) {
    throw new HttpRequestError('Datos del formulario no válidos', 0)
  }
  return http('/posts', {
    method: 'POST',
    body: JSON.stringify(checked.data),
  }).then((raw) => parsePost(raw, checked.data.userId))
}
