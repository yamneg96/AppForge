import { Outlet } from "@tanstack/react-router"
import { Navbar } from "./navbar"
import { Footer } from "./footer"

export function RootLayout() {
  return (
    <div className="bg-background-light dark:bg-background-dark flex min-h-screen flex-col text-slate-900 dark:text-slate-100">
      <Navbar />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
    </div>
  )
}
