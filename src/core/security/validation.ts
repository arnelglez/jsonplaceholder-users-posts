import { HttpRequestError } from '~/core/network/errors'
import type { CreatePostInput, Post } from '~/features/posts/domain/types'
import type { User } from '~/features/users/domain/types'
import {
  MAX_DISPLAY_FIELD_LENGTH,
  MAX_POST_BODY_LENGTH,
  MAX_POSTS_LIST,
  MAX_POST_TITLE_LENGTH,
  MAX_USER_ID,
  MAX_USER_NAME_LENGTH,
  MAX_USERS_LIST,
  MIN_USER_ID,
} from './limits'
import { sanitizeDisplayText } from './sanitize'

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null && !Array.isArray(value)
}

function readString(
  value: unknown,
  maxLength: number,
  field: string,
  allowNewlines = false,
): string {
  if (typeof value !== 'string') {
    throw new HttpRequestError(`Respuesta inválida: ${field} no es texto`, 0)
  }
  const cleaned = sanitizeDisplayText(value, allowNewlines)
  if (cleaned.length > maxLength) {
    return cleaned.slice(0, maxLength)
  }
  return cleaned
}

function readPositiveInt(value: unknown, field: string, max = Number.MAX_SAFE_INTEGER): number {
  if (
    typeof value !== 'number' ||
    !Number.isFinite(value) ||
    !Number.isInteger(value) ||
    value < 1 ||
    value > max
  ) {
    throw new HttpRequestError(`Respuesta inválida: ${field}`, 0)
  }
  return value
}

export function assertAllowedUserId(userId: number): void {
  if (!Number.isInteger(userId) || userId < MIN_USER_ID || userId > MAX_USER_ID) {
    throw new HttpRequestError('Identificador de usuario no permitido', 0)
  }
}

export function parseUser(raw: unknown): User {
  if (!isRecord(raw)) {
    throw new HttpRequestError('Respuesta de usuario inválida', 0)
  }
  const id = readPositiveInt(raw.id, 'id', MAX_USER_ID)
  assertAllowedUserId(id)
  return {
    id,
    name: readString(raw.name, MAX_USER_NAME_LENGTH, 'name'),
    username: readString(raw.username, 80, 'username'),
    email: readString(raw.email, 254, 'email'),
  }
}

export function parseUsers(raw: unknown): User[] {
  if (!Array.isArray(raw)) {
    throw new HttpRequestError('La lista de usuarios no es válida', 0)
  }
  if (raw.length > MAX_USERS_LIST) {
    throw new HttpRequestError('La lista de usuarios excede el límite permitido', 0)
  }
  return raw.map(parseUser)
}

export function parsePost(raw: unknown, expectedUserId?: number): Post {
  if (!isRecord(raw)) {
    throw new HttpRequestError('Respuesta de publicación inválida', 0)
  }
  const userId = readPositiveInt(raw.userId, 'userId', MAX_USER_ID)
  assertAllowedUserId(userId)
  if (expectedUserId !== undefined && userId !== expectedUserId) {
    throw new HttpRequestError('La publicación no corresponde al usuario solicitado', 0)
  }
  return {
    id: readPositiveInt(raw.id, 'id'),
    userId,
    title: readString(raw.title, MAX_POST_TITLE_LENGTH, 'title'),
    body: readString(raw.body, MAX_DISPLAY_FIELD_LENGTH, 'body', true),
  }
}

export function parsePosts(raw: unknown, scopedUserId?: number): Post[] {
  if (!Array.isArray(raw)) {
    throw new HttpRequestError('La lista de publicaciones no es válida', 0)
  }
  if (raw.length > MAX_POSTS_LIST) {
    throw new HttpRequestError('La lista de publicaciones excede el límite permitido', 0)
  }
  const posts = raw.map((item) => parsePost(item))
  if (scopedUserId !== undefined) {
    return posts.filter((post) => post.userId === scopedUserId)
  }
  return posts
}

export type CreatePostFieldErrors = {
  title?: string
  body?: string
  userId?: string
}

export function validateCreatePostInput(
  input: CreatePostInput,
): { ok: true; data: CreatePostInput } | { ok: false; errors: CreatePostFieldErrors } {
  const errors: CreatePostFieldErrors = {}
  const title = sanitizeDisplayText(input.title)
  const body = sanitizeDisplayText(input.body, true)

  if (!title) errors.title = 'El título es obligatorio.'
  else if (title.length > MAX_POST_TITLE_LENGTH) {
    errors.title = `Máximo ${MAX_POST_TITLE_LENGTH} caracteres.`
  }

  if (!body) errors.body = 'El texto es obligatorio.'
  else if (body.length > MAX_POST_BODY_LENGTH) {
    errors.body = `Máximo ${MAX_POST_BODY_LENGTH} caracteres.`
  }

  try {
    assertAllowedUserId(input.userId)
  } catch {
    errors.userId = 'Usuario no válido.'
  }

  if (Object.keys(errors).length > 0) {
    return { ok: false, errors }
  }

  return {
    ok: true,
    data: { title, body, userId: input.userId },
  }
}

/** Blocks path injection / open redirects in outbound API calls. */
export function assertSafeApiPath(path: string): void {
  if (
    !path.startsWith('/') ||
    path.includes('//') ||
    path.includes('..') ||
    path.includes('%') ||
    /[\r\n\u0000\t]/.test(path) ||
    /[^\w\-/?=.&]/.test(path)
  ) {
    throw new HttpRequestError('Ruta de API no permitida', 0)
  }
  const allowed =
    path === '/users' ||
    /^\/users\/\d+$/.test(path) ||
    path === '/posts' ||
    /^\/posts\?userId=\d+$/.test(path)
  if (!allowed) {
    throw new HttpRequestError('Ruta de API no permitida', 0)
  }
}

export function assertTrustedApiUrl(responseUrl: string, baseUrl: string): void {
  let expected: URL
  let actual: URL
  try {
    expected = new URL(baseUrl)
    actual = new URL(responseUrl)
  } catch {
    throw new HttpRequestError('Respuesta de origen no confiable', 0)
  }
  if (actual.origin !== expected.origin) {
    throw new HttpRequestError('Respuesta de origen no confiable', 0)
  }
}
