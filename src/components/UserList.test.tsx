import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it, vi } from 'vitest'
import type { User } from '../api/types'
import { UserList } from './UserList'

const users: User[] = [
  { id: 1, name: 'Leanne Graham', username: 'Bret', email: 'leanne@example.com' },
  { id: 2, name: 'Ervin Howell', username: 'Antonette', email: 'ervin@example.com' },
  { id: 3, name: 'Clementine DuBuque', username: 'Samantha', email: 'clem@example.com' },
]

describe('UserList', () => {
  it('filtra usuarios por nombre al buscar', async () => {
    const user = userEvent.setup()
    render(
      <UserList
        users={users}
        loading={false}
        error={null}
        selectedUserId={null}
        onSelect={vi.fn()}
        onRetry={vi.fn()}
      />,
    )

    expect(screen.getByText('Leanne Graham')).toBeInTheDocument()
    expect(screen.getByText('Ervin Howell')).toBeInTheDocument()

    await user.type(screen.getByRole('searchbox'), 'ervin')

    expect(screen.queryByText('Leanne Graham')).not.toBeInTheDocument()
    expect(screen.getByText('Ervin Howell')).toBeInTheDocument()
  })
})
