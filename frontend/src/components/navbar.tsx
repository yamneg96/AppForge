import { useState } from "react"
import { Link } from "@tanstack/react-router"
import { motion, AnimatePresence } from "framer-motion"
import { Menu, X, Moon, Sun, Rocket } from "lucide-react"
import { useThemeStore } from "@/lib/store"

export function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const { isDark, toggleTheme } = useThemeStore()

  const menuVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { type: "spring", damping: 25, stiffness: 300 },
    },
    exit: { opacity: 0, scale: 0.8, transition: { duration: 0.2 } },
  }

  return (
    <nav className="bg-background-light/80 dark:bg-background-dark/80 sticky top-0 z-50 border-b border-slate-200 backdrop-blur-md dark:border-primary/10">
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-6">
        {/* Logo */}
        <Link
          to="/"
          className="group flex cursor-pointer items-center gap-2 transition-opacity hover:opacity-80"
        >
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary text-white shadow-lg shadow-primary/20">
            <Rocket size={20} />
          </div>
          <span className="text-xl font-black tracking-tight text-slate-900 uppercase dark:text-white">
            AppForge
          </span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden items-center gap-10 md:flex">
          <Link
            to="/"
            className="text-sm font-semibold text-slate-900 transition-colors hover:text-primary dark:text-slate-300"
          >
            Home
          </Link>
          <Link
            to="/explore"
            className="text-sm font-semibold text-slate-900 transition-colors hover:text-primary dark:text-slate-300"
          >
            Explore
          </Link>
          <Link
            to="/about"
            className="text-sm font-semibold text-slate-900 transition-colors hover:text-primary dark:text-slate-300"
          >
            About
          </Link>
          <Link
            to="/contact"
            className="rounded-lg bg-primary px-5 py-2.5 text-sm font-bold text-white transition-all hover:opacity-90"
          >
            Contact
          </Link>
        </div>

        {/* Right Actions */}
        <div className="flex items-center gap-4">
          {/* Theme Toggle */}
          <button
            onClick={toggleTheme}
            className="rounded-lg p-2 transition-colors hover:bg-slate-100 dark:hover:bg-slate-800"
            aria-label="Toggle theme"
          >
            {isDark ? (
              <Sun size={20} className="text-yellow-400" />
            ) : (
              <Moon size={20} className="text-slate-600" />
            )}
          </button>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="rounded-lg p-2 transition-colors hover:bg-slate-100 md:hidden dark:hover:bg-slate-800"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            variants={menuVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="absolute top-20 left-1/2 w-[90%] max-w-xs -translate-x-1/2 rounded-2xl border border-slate-200 bg-white p-6 shadow-2xl md:hidden dark:border-slate-800 dark:bg-slate-900"
          >
            <div className="flex flex-col gap-4">
              <Link
                to="/"
                onClick={() => setMobileMenuOpen(false)}
                className="px-4 py-2 text-sm font-semibold text-slate-900 transition-colors hover:text-primary dark:text-white"
              >
                Home
              </Link>
              <Link
                to="/explore"
                onClick={() => setMobileMenuOpen(false)}
                className="px-4 py-2 text-sm font-semibold text-slate-900 transition-colors hover:text-primary dark:text-white"
              >
                Explore Apps
              </Link>
              <Link
                to="/about"
                onClick={() => setMobileMenuOpen(false)}
                className="px-4 py-2 text-sm font-semibold text-slate-900 transition-colors hover:text-primary dark:text-white"
              >
                About
              </Link>
              <Link
                to="/contact"
                onClick={() => setMobileMenuOpen(false)}
                className="w-full rounded-lg bg-primary px-4 py-2 text-center text-sm font-bold text-white transition-all hover:opacity-90"
              >
                Contact
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  )
}
