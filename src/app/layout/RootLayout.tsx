import { Outlet } from 'react-router'
import { AppToaster } from '~/core/ui/AppToaster'

export function RootLayout() {
  return (
    <>
      <AppToaster />
      <Outlet />
    </>
  )
}
