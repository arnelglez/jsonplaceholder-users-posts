import { userTintStyle } from '~/core/lib/userHue'
import type { User } from '~/features/users/domain/types'

type UserAvatarProps = {
  user: Pick<User, 'id' | 'name'>
  size?: 'sm' | 'md' | 'lg'
}

function initials(name: string): string {
  const parts = name.trim().split(/\s+/).filter(Boolean)
  if (parts.length === 0) return '?'
  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase()
  return `${parts[0][0]}${parts[parts.length - 1][0]}`.toUpperCase()
}

export function UserAvatar({ user, size = 'sm' }: UserAvatarProps) {
  const dims =
    size === 'lg' ? 'size-16 text-lg' : size === 'md' ? 'size-10 text-sm' : 'size-8 text-xs'
  return (
    <span
      className={`inline-flex shrink-0 items-center justify-center rounded-full text-xs font-semibold ${dims}`}
      style={userTintStyle(user.id)}
      aria-hidden
    >
      {initials(user.name)}
    </span>
  )
}
