/** Demo-only gate for the technical test; not server-side auth. */
export const DEMO_USERNAME = 'admin'
export const DEMO_PASSWORD = 'admin'

const MAX_LOGIN_FIELD_LENGTH = 128

export function verifyDemoLogin(username: string, password: string): boolean {
  if (
    username.length > MAX_LOGIN_FIELD_LENGTH ||
    password.length > MAX_LOGIN_FIELD_LENGTH
  ) {
    return false
  }
  return username.trim() === DEMO_USERNAME && password === DEMO_PASSWORD
}
