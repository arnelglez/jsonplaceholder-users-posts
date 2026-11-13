/** Demo-only gate for the technical test; not server-side auth. */
export const DEMO_USERNAME = 'admin'
export const DEMO_PASSWORD = 'admin'

export function verifyDemoLogin(username: string, password: string): boolean {
  return username.trim() === DEMO_USERNAME && password === DEMO_PASSWORD
}
