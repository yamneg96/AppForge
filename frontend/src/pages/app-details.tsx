import { useParams } from "@tanstack/react-router"
import { motion } from "framer-motion"
import {
  Download,
  Share2,
  MoreVertical,
  ArrowRight,
  ExternalLink,
} from "lucide-react"
import { useAppBySlug } from "@/lib/queries"

export function AppDetailsPage() {
  const { slug } = useParams({ from: "/app/$slug" })
  const { data: app, isLoading, error } = useAppBySlug(slug!)

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="text-center">
          <div className="inline-block h-12 w-12 animate-spin rounded-full border-b-2 border-primary" />
          <p className="mt-4 text-primary dark:text-primary">
            Loading app details...
          </p>
        </div>
      </div>
    )
  }

  if (!app || error) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="text-center">
          <p className="text-primary dark:text-primary">App not found.</p>
        </div>
      </div>
    )
  }

  return (
    <div className="dark:bg-backgroundbackground-dark bg-backgroundwhite min-h-screen">
      <main className="mx-auto max-w-5xl px-6 py-8 lg:px-40">
        {/* App Hero Header */}
        <motion.div
          className="mb-10 flex flex-col items-start gap-6 md:flex-row md:items-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="bg-backgroundprimary/10 rounded-2xl border border-primary/20 p-1 shadow-xl shadow-primary/5">
            <div className="bg-backgroundlinear-to-br flex h-24 w-24 items-center justify-center rounded-xl from-primary to-indigo-600 text-5xl text-white md:h-32 md:w-32">
              {app.icon || "🚀"}
            </div>
          </div>
          <div className="flex-1">
            <div className="flex flex-wrap items-center gap-3">
              <h1 className="text-3xl font-bold md:text-4xl dark:text-white">
                {app.name}
              </h1>
              <span
                className={`rounded-full border px-3 py-1 text-xs font-bold tracking-wider uppercase ${
                  app.status === "released"
                    ? "bg-backgroundemerald-500/10 border-emerald-500/20 text-emerald-500"
                    : "bg-backgroundamber-500/10 border-amber-500/20 text-amber-500"
                }`}
              >
                {app.status === "released" ? "Active" : "Coming Soon"}
              </span>
            </div>
            <p className="mt-1 text-lg text-primary dark:text-primary">
              Version {app.version}
            </p>
            {(app.reviewsCount || app.rating) && (
              <div className="mt-4 flex gap-4">
                {app.reviewsCount && (
                  <div className="flex items-center gap-1 text-primary dark:text-primary">
                    <Download size={16} />
                    <span className="text-sm font-medium">
                      {app.reviewsCount}k
                    </span>
                  </div>
                )}
                {app.rating && (
                  <div className="flex items-center gap-1 text-primary dark:text-primary">
                    <span>⭐</span>
                    <span className="text-sm font-medium">{app.rating}</span>
                  </div>
                )}
              </div>
            )}
          </div>
        </motion.div>

        {/* Primary CTA Section */}
        <motion.div
          className="mb-12 grid grid-cols-1 gap-4 sm:grid-cols-2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          {app.apkUrl && (
            <a
              href={app.apkUrl}
              className="flex h-14 items-center justify-center gap-3 rounded-full border-2 border-border bg-background px-8 text-lg font-bold text-primary transition-all hover:bg-background dark:bg-background dark:text-primary dark:hover:bg-background"
            >
              <Download size={20} />
              Download APK
            </a>
          )}
          {app.ipaUrl && (
            <a
              href={app.ipaUrl}
              className="flex h-14 items-center justify-center gap-3 rounded-full border-2 border-border bg-background px-8 text-lg font-bold text-primary transition-all hover:bg-background dark:bg-background dark:text-primary dark:hover:bg-background"
            >
              <Download size={20} />
              Download iOS Beta
            </a>
          )}
        </motion.div>

        {/* Screenshots Carousel */}
        {app.screenshots && app.screenshots.length > 0 && (
          <motion.section
            className="mb-12"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <h3 className="mb-6 flex items-center gap-2 text-xl font-bold dark:text-white">
              <span>📸</span>
              Screenshots
            </h3>
            <div className="scrollbar-hide flex snap-x gap-6 overflow-x-auto pb-6">
              {app.screenshots.map((screenshot: string, idx: number) => (
                <motion.div
                  key={idx}
                  className="flex min-w-70 snap-start flex-col gap-4"
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="bg-backgroundslate-200 dark:bg-backgroundprimary/10 relative aspect-9/16 overflow-hidden rounded-2xl border border-slate-300 shadow-md dark:border-primary/20">
                    <img
                      src={screenshot}
                      alt={`Screenshot ${idx + 1}`}
                      className="h-full w-full object-cover"
                    />
                  </div>
                  <p className="text-sm font-bold dark:text-primary">
                    Screen {idx + 1}
                  </p>
                </motion.div>
              ))}
            </div>
          </motion.section>
        )}

        {/* Description & Info Grid */}
        <motion.div
          className="grid grid-cols-1 gap-12 lg:grid-cols-3"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <div className="lg:col-span-2">
            {/* Description */}
            <section className="mb-10">
              <h3 className="mb-4 text-xl font-bold dark:text-white">
                Description
              </h3>
              <p className="leading-relaxed text-primary dark:text-primary">
                {app.longDescription || app.description}
              </p>
            </section>

            {/* Tech Stack */}
            {app.techStack && app.techStack.length > 0 && (
              <section>
                <h3 className="mb-4 text-xl font-bold dark:text-white">
                  Tech Stack
                </h3>
                <div className="flex flex-wrap gap-2">
                  {app.techStack.map((tech: string, idx: number) => (
                    <span
                      key={idx}
                      className="bg-backgroundprimary/10 rounded-full border border-primary/20 px-4 py-2 text-sm font-semibold text-primary"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </section>
            )}
          </div>

          {/* Sidebar Information */}
          <motion.div
            className="bg-backgroundslate-200/50 dark:bg-backgroundprimary/5 h-fit rounded-2xl border border-slate-300 p-6 dark:border-primary/10"
            whileHover={{ y: -5 }}
            transition={{ duration: 0.3 }}
          >
            <h4 className="mb-4 font-bold dark:text-white">Information</h4>
            <div className="space-y-4">
              <div className="flex items-center justify-between border-b border-slate-300 py-2 dark:border-primary/10">
                <span className="text-sm text-primary dark:text-primary">
                  Status
                </span>
                <span className="text-sm font-semibold capitalize dark:text-white">
                  {app.status}
                </span>
              </div>
              <div className="flex items-center justify-between border-b border-slate-300 py-2 dark:border-primary/10">
                <span className="text-sm text-primary dark:text-primary">
                  Version
                </span>
                <span className="text-sm font-semibold dark:text-white">
                  {app.version}
                </span>
              </div>
              {app.rating && (
                <div className="flex items-center justify-between border-b border-slate-300 py-2 dark:border-primary/10">
                  <span className="text-sm text-primary dark:text-primary">
                    Rating
                  </span>
                  <span className="text-sm font-semibold dark:text-white">
                    {app.rating}
                  </span>
                </div>
              )}
              <div className="flex items-center justify-between py-2">
                <span className="text-sm text-primary dark:text-primary">
                  Updated
                </span>
                <span className="text-sm font-semibold dark:text-white">
                  {new Date(app.updatedAt).toLocaleDateString()}
                </span>
              </div>
            </div>
            <button className="bg-backgroundslate-200 hover:bg-backgroundslate-300 dark:bg-backgroundprimary/20 dark:hover:bg-backgroundprimary/30 mt-6 w-full rounded-lg py-3 text-sm font-bold text-primary transition-all">
              View Changelog
            </button>
          </motion.div>
        </motion.div>

        {/* Secondary CTA Section */}
        <motion.div
          className="mt-16 border-t border-slate-200 pt-12 text-center dark:border-primary/20"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <h3 className="mb-8 text-2xl font-bold dark:text-white">
            Ready to start forging?
          </h3>
          <div className="flex flex-col items-center justify-center gap-6 md:flex-row">
            <div className="bg-backgroundslate-200 dark:bg-backgroundprimary/10 flex w-full max-w-sm cursor-pointer items-center gap-4 rounded-xl border border-slate-300 p-4 transition-all hover:border-primary dark:border-primary/20">
              <div className="bg-backgroundprimary rounded-lg p-3 text-lg text-white">
                📖
              </div>
              <div className="flex-1 text-left">
                <p className="text-sm font-bold dark:text-white">
                  Documentation
                </p>
                <p className="text-xs text-primary dark:text-primary">
                  Read the guides
                </p>
              </div>
              <ArrowRight size={16} className="text-primary" />
            </div>
            <div className="bg-backgroundslate-200 dark:bg-backgroundprimary/10 flex w-full max-w-sm cursor-pointer items-center gap-4 rounded-xl border border-slate-300 p-4 transition-all hover:border-primary dark:border-primary/20">
              <div className="bg-backgroundprimary rounded-lg p-3 text-lg text-white">
                👥
              </div>
              <div className="flex-1 text-left">
                <p className="text-sm font-bold dark:text-white">Community</p>
                <p className="text-xs text-primary dark:text-primary">
                  Join Discord server
                </p>
              </div>
              <ArrowRight size={16} className="text-primary" />
            </div>
          </div>
        </motion.div>
      </main>

      {/* Footer */}
      <footer className="mt-20 border-t border-slate-200 px-6 py-10 text-center lg:px-40 dark:border-primary/20">
        <div className="mb-4 flex items-center justify-center gap-2 opacity-50">
          <span className="text-lg text-primary">▶</span>
          <span className="text-sm font-bold tracking-tight dark:text-white">
            AppForge
          </span>
        </div>
        <p className="text-xs text-primary dark:text-primary">
          © 2024 AppForge. Built for developers.
        </p>
      </footer>
    </div>
  )
}
