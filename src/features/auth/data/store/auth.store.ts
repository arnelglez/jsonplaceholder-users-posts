import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { verifyDemoLogin } from '~/features/auth/domain/credentials'

type AuthState = {
  isAuthenticated: boolean
  login: (username: string, password: string) => boolean
  logout: () => void
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      isAuthenticated: false,
      login: (username, password) => {
        const ok = verifyDemoLogin(username, password)
        if (ok) set({ isAuthenticated: true })
        return ok
      },
      logout: () => set({ isAuthenticated: false }),
    }),
    {
      name: 'jsonplaceholder-demo-auth',
      partialize: (state) => ({ isAuthenticated: state.isAuthenticated }),
    },
  ),
)
