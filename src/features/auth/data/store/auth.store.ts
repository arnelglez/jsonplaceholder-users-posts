import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { verifyDemoLogin } from '~/features/auth/domain/credentials'

const MAX_FAILED_LOGINS = 5
const LOCKOUT_MS = 30_000

type AuthState = {
  isAuthenticated: boolean
  failedAttempts: number
  lockedUntil: number | null
  login: (username: string, password: string) => boolean
  logout: () => void
  isLockedOut: () => boolean
  lockoutRemainingMs: () => number
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      isAuthenticated: false,
      failedAttempts: 0,
      lockedUntil: null,
      isLockedOut: () => {
        const until = get().lockedUntil
        return until !== null && Date.now() < until
      },
      lockoutRemainingMs: () => {
        const until = get().lockedUntil
        if (until === null) return 0
        return Math.max(0, until - Date.now())
      },
      login: (username, password) => {
        if (get().isLockedOut()) return false
        const ok = verifyDemoLogin(username, password)
        if (ok) {
          set({ isAuthenticated: true, failedAttempts: 0, lockedUntil: null })
          return true
        }
        const failedAttempts = get().failedAttempts + 1
        const lockedUntil =
          failedAttempts >= MAX_FAILED_LOGINS ? Date.now() + LOCKOUT_MS : null
        set({ isAuthenticated: false, failedAttempts, lockedUntil })
        return false
      },
      logout: () => {
        set({ isAuthenticated: false })
      },
    }),
    {
      name: 'jsonplaceholder-demo-auth',
      partialize: (state) => ({
        isAuthenticated: state.isAuthenticated,
        failedAttempts: state.failedAttempts,
        lockedUntil: state.lockedUntil,
      }),
      onRehydrateStorage: () => (state) => {
        if (!state) return
        if (state.lockedUntil !== null && Date.now() >= state.lockedUntil) {
          state.lockedUntil = null
          state.failedAttempts = 0
        }
      },
    },
  ),
)
