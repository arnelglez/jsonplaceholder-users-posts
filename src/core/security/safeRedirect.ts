import { MAX_USER_ID, MIN_USER_ID } from './limits'

const APP_HOME = '/app'
const USER_POSTS_PATH = /^\/app\/users\/(\d+)\/posts$/

/** Blocks open redirects via React Router location.state after login. */
export function safeAppRedirectPath(pathname: string | undefined): string {
  if (!pathname) return APP_HOME
  if (pathname === APP_HOME) return APP_HOME
  const match = USER_POSTS_PATH.exec(pathname)
  if (!match) return APP_HOME
  const id = Number(match[1])
  if (!Number.isInteger(id) || id < MIN_USER_ID || id > MAX_USER_ID) {
    return APP_HOME
  }
  return pathname
}
