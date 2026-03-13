import { useState } from "react"
import { motion } from "framer-motion"
import { Link } from "@tanstack/react-router"
import { Search, Smartphone } from "lucide-react"
import { useApps } from "@/lib/queries"
import { useAppStore } from "@/lib/store"

export function ExploreAppsPage() {
  const { data: apps = [], isLoading } = useApps()
  const { setSelectedApp } = useAppStore()
  const [selectedFilter, setSelectedFilter] = useState("all")
  const [searchQuery, setSearchQuery] = useState("")

  const filters = [
    { label: "All Apps", value: "all" },
    { label: "Android", value: "android" },
    { label: "iOS", value: "ios" },
    { label: "Coming Soon", value: "coming_soon" },
    { label: "Released", value: "released" },
  ]

  const filteredApps = apps.filter((app: any) => {
    const matchesFilter =
      selectedFilter === "all" ||
      selectedFilter === app.status ||
      (selectedFilter === "android" && app.apkUrl) ||
      (selectedFilter === "ios" && app.ipaUrl)

    const matchesSearch =
      app.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      app.description?.toLowerCase().includes(searchQuery.toLowerCase())

    return matchesFilter && matchesSearch
  })

  return (
    <div className="min-h-screen">
      {/* Header */}
      <section className="border-b border-slate-200 bg-slate-50 px-6 py-10 dark:border-primary/10 dark:bg-white/[0.02]">
        <div className="mx-auto max-w-7xl">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-10"
          >
            <h1 className="mb-4 text-4xl font-black tracking-tight text-slate-900 lg:text-5xl dark:text-white">
              Explore Apps
            </h1>
            <p className="max-w-2xl text-lg text-slate-600 dark:text-slate-400">
              Discover the next generation of digital experiences. From
              productivity tools to eco-trackers, explore everything built with
              the AppForge ecosystem.
            </p>
          </motion.div>

          {/* Search Bar */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="relative mb-8"
          >
            <Search
              className="absolute top-1/2 left-3 -translate-y-1/2 text-slate-400"
              size={20}
            />
            <input
              type="text"
              placeholder="Search apps..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full rounded-lg border border-slate-200 bg-white py-3 pr-4 pl-10 focus:ring-2 focus:ring-primary focus:outline-none dark:border-primary/10 dark:bg-primary/5 dark:text-white"
            />
          </motion.div>

          {/* Filters */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="flex flex-wrap gap-2"
          >
            {filters.map((filter) => (
              <button
                key={filter.value}
                onClick={() => setSelectedFilter(filter.value)}
                className={`rounded-full px-6 py-2.5 text-sm font-semibold transition-all ${
                  selectedFilter === filter.value
                    ? "bg-primary text-white shadow-lg shadow-primary/20"
                    : "bg-slate-200 text-slate-900 hover:bg-primary/20 dark:bg-primary/10 dark:text-white"
                }`}
              >
                {filter.label}
              </button>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Apps Grid */}
      <section className="px-6 py-12">
        <div className="mx-auto max-w-7xl">
          {isLoading ? (
            <div className="py-20 text-center">
              <div className="inline-block h-12 w-12 animate-spin rounded-full border-b-2 border-primary" />
              <p className="mt-4 text-slate-600 dark:text-slate-400">
                Loading apps...
              </p>
            </div>
          ) : filteredApps.length === 0 ? (
            <div className="py-20 text-center">
              <p className="text-slate-600 dark:text-slate-400">
                No apps found matching your criteria.
              </p>
            </div>
          ) : (
            <motion.div
              className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ staggerChildren: 0.1 }}
            >
              {filteredApps.map((app: any, idx: number) => (
                <motion.div
                  key={app._id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.05 }}
                  onClick={() => setSelectedApp(app)}
                >
                  <Link to={`/app/${app.slug}`} className="block">
                    <div className="group relative flex cursor-pointer flex-col rounded-xl border border-slate-200 bg-white p-5 transition-all hover:shadow-xl hover:shadow-primary/10 dark:border-primary/20 dark:bg-primary/5">
                      {/* Icon/Thumbnail */}
                      <div className="mb-5 flex items-start justify-between">
                        <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-500 to-primary text-white shadow-lg">
                          <Smartphone size={24} />
                        </div>
                        <span
                          className={`rounded-full px-3 py-1 text-xs font-bold uppercase ${
                            app.status === "released"
                              ? "bg-green-500/10 text-green-500"
                              : app.status === "coming_soon"
                                ? "bg-amber-500/10 text-amber-500"
                                : "bg-slate-500/10 text-slate-500"
                          }`}
                        >
                          {app.status === "coming_soon"
                            ? "Coming Soon"
                            : app.status}
                        </span>
                      </div>

                      {/* Content */}
                      <h3 className="mb-2 text-xl font-bold transition-colors group-hover:text-primary">
                        {app.name}
                      </h3>
                      <p className="mb-6 flex-grow text-sm text-slate-600 dark:text-slate-400">
                        {app.description}
                      </p>

                      {/* Footer */}
                      <div className="flex items-center justify-between border-t border-slate-100 pt-4 dark:border-primary/10">
                        <div className="flex gap-2">
                          {app.apkUrl && (
                            <Smartphone
                              size={16}
                              className="text-slate-400"
                              title="Android"
                            />
                          )}
                          {app.ipaUrl && (
                            <Smartphone
                              size={16}
                              className="text-slate-400"
                              title="iOS"
                            />
                          )}
                        </div>
                        <span className="text-sm font-bold text-primary hover:underline">
                          View Details
                        </span>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </motion.div>
          )}
        </div>
      </section>
    </div>
  )
}
