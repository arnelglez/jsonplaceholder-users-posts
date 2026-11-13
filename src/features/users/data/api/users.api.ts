import { http } from '~/core/network/httpClient'
import { assertAllowedUserId, parseUser, parseUsers } from '~/core/security/validation'
import type { User } from '~/features/users/domain/types'

export function fetchUsers(): Promise<User[]> {
  return http('/users').then(parseUsers)
}

export function fetchUserById(userId: number): Promise<User> {
  assertAllowedUserId(userId)
  return http(`/users/${userId}`).then(parseUser)
}
