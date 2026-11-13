import { createBrowserRouter } from 'react-router'
import { AppLayout } from '~/app/layout/AppLayout'
import { RootLayout } from '~/app/layout/RootLayout'
import { RequireAuth } from '~/features/auth/ui/components/RequireAuth'
import { LoginPage } from '~/features/auth/ui/pages/LoginPage'
import { LandingPage } from '~/features/landing/ui/pages/LandingPage'
import { UserPostsPage } from '~/features/posts/ui/pages/UserPostsPage'
import { UsersPage } from '~/features/users/ui/pages/UsersPage'
import { NotFoundPage } from '~/app/pages/NotFoundPage'

export const router = createBrowserRouter([
  {
    element: <RootLayout />,
    children: [
      { path: '/', element: <LandingPage /> },
      { path: '/login', element: <LoginPage /> },
      {
        path: '/app',
        element: (
          <RequireAuth>
            <AppLayout />
          </RequireAuth>
        ),
        children: [
          { index: true, element: <UsersPage /> },
          { path: 'users/:userId/posts', element: <UserPostsPage /> },
        ],
      },
      { path: '*', element: <NotFoundPage /> },
    ],
  },
])
