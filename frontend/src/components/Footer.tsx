import { Link } from "@tanstack/react-router"
import { Rocket, Mail, Github, Linkedin, Twitter } from "lucide-react"

export function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="border-t border-slate-200 bg-slate-50 px-6 py-12 dark:border-white/5 dark:bg-slate-900/50">
      <div className="mx-auto max-w-7xl">
        <div className="mb-12 grid gap-12 md:grid-cols-4">
          {/* Brand */}
          <div>
            <div className="mb-4 flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded bg-primary text-white">
                <Rocket size={16} />
              </div>
              <span className="text-lg font-black tracking-tight uppercase">
                AppForge
              </span>
            </div>
            <p className="text-sm text-slate-600 dark:text-slate-400">
              A developer portfolio platform for showcasing mobile apps and
              projects.
            </p>
          </div>

          {/* Links */}
          <div>
            <h4 className="mb-4 font-bold text-slate-900 dark:text-white">
              Navigation
            </h4>
            <div className="space-y-2">
              <Link
                to="/"
                className="text-sm text-slate-600 transition-colors hover:text-primary dark:text-slate-400"
              >
                Home
              </Link>
              <Link
                to="/explore"
                className="block text-sm text-slate-600 transition-colors hover:text-primary dark:text-slate-400"
              >
                Explore
              </Link>
              <Link
                to="/about"
                className="block text-sm text-slate-600 transition-colors hover:text-primary dark:text-slate-400"
              >
                About
              </Link>
              <Link
                to="/contact"
                className="block text-sm text-slate-600 transition-colors hover:text-primary dark:text-slate-400"
              >
                Contact
              </Link>
            </div>
          </div>

          {/* Resources */}
          <div>
            <h4 className="mb-4 font-bold text-slate-900 dark:text-white">
              Resources
            </h4>
            <div className="space-y-2">
              <a
                href="#"
                className="block text-sm text-slate-600 transition-colors hover:text-primary dark:text-slate-400"
              >
                Documentation
              </a>
              <a
                href="#"
                className="block text-sm text-slate-600 transition-colors hover:text-primary dark:text-slate-400"
              >
                API Reference
              </a>
              <a
                href="#"
                className="block text-sm text-slate-600 transition-colors hover:text-primary dark:text-slate-400"
              >
                Guides
              </a>
            </div>
          </div>

          {/* Social */}
          <div>
            <h4 className="mb-4 font-bold text-slate-900 dark:text-white">
              Connect
            </h4>
            <div className="flex gap-3">
              <a
                href="#"
                className="rounded-lg p-2 transition-colors hover:bg-slate-200 dark:hover:bg-slate-800"
              >
                <Github
                  size={16}
                  className="text-slate-600 dark:text-slate-400"
                />
              </a>
              <a
                href="#"
                className="rounded-lg p-2 transition-colors hover:bg-slate-200 dark:hover:bg-slate-800"
              >
                <Linkedin
                  size={16}
                  className="text-slate-600 dark:text-slate-400"
                />
              </a>
              <a
                href="#"
                className="rounded-lg p-2 transition-colors hover:bg-slate-200 dark:hover:bg-slate-800"
              >
                <Twitter
                  size={16}
                  className="text-slate-600 dark:text-slate-400"
                />
              </a>
              <a
                href="mailto:contact@appforge.dev"
                className="rounded-lg p-2 transition-colors hover:bg-slate-200 dark:hover:bg-slate-800"
              >
                <Mail
                  size={16}
                  className="text-slate-600 dark:text-slate-400"
                />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="flex flex-col items-center justify-between gap-4 border-t border-slate-200 pt-8 md:flex-row dark:border-white/5">
          <p className="text-sm text-slate-600 dark:text-slate-400">
            © {currentYear} AppForge. All rights reserved.
          </p>
          <div className="flex gap-6">
            <a
              href="#"
              className="text-sm text-slate-600 transition-colors hover:text-primary dark:text-slate-400"
            >
              Privacy Policy
            </a>
            <a
              href="#"
              className="text-sm text-slate-600 transition-colors hover:text-primary dark:text-slate-400"
            >
              Terms of Service
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}
