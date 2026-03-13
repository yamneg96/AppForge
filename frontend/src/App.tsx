import { useEffect } from "react"
import { QueryClientProvider, QueryClient } from "@tanstack/react-query"
import { RouterProvider } from "@tanstack/react-router"
import { router } from "@/lib/router"
import { useThemeStore } from "@/lib/store"

const queryClient = new QueryClient()

export function App() {
  const { isDark, setTheme } = useThemeStore()

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme")
    if (savedTheme) {
      setTheme(savedTheme === "dark")
    } else if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
      setTheme(true)
    }
  }, [setTheme])

  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.key === "d" && (e.ctrlKey || e.metaKey)) {
        e.preventDefault()
        useThemeStore.getState().toggleTheme()
      }
    }

    window.addEventListener("keydown", handleKeyPress)
    return () => window.removeEventListener("keydown", handleKeyPress)
  }, [])

  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  )
}

export default App
