import { create } from "zustand"

interface App {
  _id: string
  name: string
  slug: string
  description: string
  status: "released" | "coming_soon" | "draft"
  version: string
  icon: string
  screenshots: string[]
  platforms: string[]
  techStack: string[]
  features: string[]
  downloadUrl?: string
  playStoreUrl?: string
  appStoreUrl?: string
  betaUrl?: string
  rating?: number
  downloads?: number
  createdAt: string
  updatedAt: string
}

interface AppStore {
  apps: App[]
  selectedApp: App | null
  isLoading: boolean
  setApps: (apps: App[]) => void
  setSelectedApp: (app: App | null) => void
  setLoading: (loading: boolean) => void
}

export const useAppStore = create<AppStore>((set) => ({
  apps: [],
  selectedApp: null,
  isLoading: false,
  setApps: (apps) => set({ apps }),
  setSelectedApp: (app) => set({ selectedApp: app }),
  setLoading: (loading) => set({ isLoading: loading }),
}))

interface ThemeStore {
  isDark: boolean
  toggleTheme: () => void
  setTheme: (dark: boolean) => void
}

export const useThemeStore = create<ThemeStore>((set) => ({
  isDark:
    typeof window !== "undefined"
      ? document.documentElement.classList.contains("dark")
      : false,
  toggleTheme: () =>
    set((state) => {
      const newDark = !state.isDark
      if (typeof window !== "undefined") {
        if (newDark) {
          document.documentElement.classList.add("dark")
          localStorage.setItem("theme", "dark")
        } else {
          document.documentElement.classList.remove("dark")
          localStorage.setItem("theme", "light")
        }
      }
      return { isDark: newDark }
    }),
  setTheme: (dark) =>
    set((state) => {
      if (typeof window !== "undefined") {
        if (dark) {
          document.documentElement.classList.add("dark")
          localStorage.setItem("theme", "dark")
        } else {
          document.documentElement.classList.remove("dark")
          localStorage.setItem("theme", "light")
        }
      }
      return { isDark: dark }
    }),
}))

interface AuthStore {
  token: string | null
  sessionToken: string | null
  isAuthenticated: boolean
  setToken: (token: string) => void
  setSessionToken: (token: string) => void
  logout: () => void
}

export const useAuthStore = create<AuthStore>((set) => ({
  token: localStorage.getItem("token"),
  sessionToken: localStorage.getItem("sessionToken"),
  isAuthenticated: !!localStorage.getItem("token"),
  setToken: (token) => {
    localStorage.setItem("token", token)
    set({ token, isAuthenticated: true })
  },
  setSessionToken: (token) => {
    localStorage.setItem("sessionToken", token)
    set({ sessionToken: token })
  },
  logout: () => {
    localStorage.removeItem("token")
    localStorage.removeItem("sessionToken")
    set({ token: null, sessionToken: null, isAuthenticated: false })
  },
}))
