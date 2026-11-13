import { createBrowserRouter } from 'react-router'
import { AppLayout } from '~/app/layout/AppLayout'
import { UserPostsPage } from '~/features/posts/ui/pages/UserPostsPage'
import { UsersPage } from '~/features/users/ui/pages/UsersPage'

export const router = createBrowserRouter([
  {
    path: '/',
    element: <AppLayout />,
    children: [
      { index: true, element: <UsersPage /> },
      { path: 'users/:userId/posts', element: <UserPostsPage /> },
    ],
  },
])
