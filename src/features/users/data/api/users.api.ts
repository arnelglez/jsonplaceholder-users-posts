import { http } from '~/core/network/httpClient'
import { assertAllowedUserId, parseUser, parseUsers } from '~/core/security/validation'
import type { User } from '~/features/users/domain/types'

/** GET /users — listado completo (allowlist en httpClient). */
export function fetchUsers(): Promise<User[]> {
  return http('/users').then(parseUsers)
}

/** GET /users/:id — detalle; userId validado (1–10). */
export function fetchUserById(userId: number): Promise<User> {
  assertAllowedUserId(userId)
  return http(`/users/${userId}`).then(parseUser)
}
