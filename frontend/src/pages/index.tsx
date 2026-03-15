import { motion } from "framer-motion"
import { Link, useNavigate } from "@tanstack/react-router"
import { ArrowRight, Zap } from "lucide-react"
import { useApps } from "@/lib/queries"

export function LandingPage() {
  const navigate = useNavigate()

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2, delayChildren: 0.1 },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  }

  return (
    <div className="relative">
      {/* Hero Section */}
      <section className="scrollbar-hide relative overflow-hidden px-6 pt-20 pb-32">
        {/* Background effects */}
        <div className="pointer-events-none absolute inset-0 opacity-[0.03] dark:opacity-[0.05]" />
        <div className="pointer-events-none absolute top-0 left-1/2 h-full w-full -translate-x-1/2 opacity-20">
          <div className="absolute top-20 left-1/4 h-96 w-96 rounded-full bg-primary blur-[120px]" />
          <div className="absolute right-1/4 bottom-20 h-96 w-96 rounded-full bg-primary blur-[120px]" />
        </div>

        <motion.div
          className="relative mx-auto grid max-w-7xl items-center gap-16 lg:grid-cols-2"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.div className="space-y-8" variants={containerVariants}>
            <motion.div
              className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-3 py-1 text-xs font-bold tracking-wider text-primary uppercase"
              variants={itemVariants}
            >
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-primary" />
              </span>
              Available for new projects
            </motion.div>

            <motion.h1
              className="text-5xl leading-[1.1] font-black tracking-tight text-slate-900 md:text-7xl dark:text-white"
              variants={itemVariants}
            >
              I build mobile apps with{" "}
              <span className="text-primary">React Native</span>
            </motion.h1>

            <motion.p
              className="max-w-lg text-lg leading-relaxed text-slate-600 md:text-xl dark:text-slate-400"
              variants={itemVariants}
            >
              Explore the high-performance, cross-platform apps I design, build,
              and launch for startups worldwide.
            </motion.p>

            <motion.div
              className="flex flex-wrap gap-4 pt-4"
              variants={itemVariants}
            >
              <button
                onClick={() => navigate({ to: "/explore" })}
                className="group flex items-center gap-2 rounded-xl bg-primary px-8 py-4 text-lg font-bold text-white transition-all duration-300 hover:scale-105 hover:shadow-[0_0_30px_rgba(100,103,242,0.5)]"
              >
                Explore Apps
                <ArrowRight
                  size={20}
                  className="transition-transform group-hover:translate-x-1"
                />
              </button>
              <button
                onClick={() => navigate({ to: "/contact" })}
                className="glass-effect rounded-xl border border-slate-300 px-8 py-4 text-lg font-bold text-slate-900 transition-colors hover:bg-slate-200 dark:border-white/10 dark:text-white dark:hover:bg-white/10"
              >
                Contact Me
              </button>
            </motion.div>
          </motion.div>

          {/* Right side - App Preview */}
          <motion.div className="group relative" variants={itemVariants}>
            <div className="aspect-square overflow-hidden rounded-3xl border border-white/5 bg-slate-800 shadow-2xl">
              <motion.img
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuARv54KNNlaC_LdjhWj0qutihv3Z7e7AnGPSxy3qUDphtwd0MbuHmxf4S6FJHt_fm8RlK4WyiDiR0KmAXMzGcjnT_cDBKT20gmic5pzPE9J3bY-0lVi4ST-f9oH-rRF7DV6Q60l_XZ3dMX9EWu-i77HZgVqql4PVylb2TP6DLb9tYMSd8unMi172Zz3teYwN1n2yV2m18OELpkSrVn9AcoTJNk6Xi1obpHhAmmE8CClJNxBlhW8IIZQJ9QtosTcC-jlAg2kW6m71HhX"
                alt="App Preview"
                className="h-full w-full object-cover"
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.3 }}
              />
            </div>

            {/* Testimonial Card */}
            <motion.div
              className="glass-effect absolute -right-6 -bottom-6 max-w-xs rounded-2xl border border-primary/20 p-6 shadow-xl"
              whileHover={{ y: -10 }}
              transition={{ duration: 0.3 }}
            >
              <div className="flex items-center gap-4">
                <div className="flex -space-x-3">
                  <img
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuDcAiYD80zIJ8zVSwV0jYkwBzCwE8AcHx0IfAq---MfwgHqUct70FCppwjuRGb-bdi-8NTte0FOJMHEDlqBhsX9VfsXQST7gIPGnhDSxXTwsJVFWddzyzfxtKtyrigg_mqcg2qqoHyE6KD7JcND5NHhJcTVx34ACPHff-J7XTpxKOcEPZm7uTaQsDn-l3L61js-J6hIls-BEhQ2bJnKWkC8m7hyJykWZNazM8Z2h_IXKJuy0OE0JMZekaZAsefo4nSwI4E7O8UWQ_hK"
                    alt="Avatar 1"
                    className="border-background-dark h-10 w-10 overflow-hidden rounded-full border-2 bg-slate-400"
                  />
                  <img
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuDFNDdUvupXgGUVMrvtUwBGxpJpGOiQOJMqnfANHKNMmIz7my16o-dkCn37zrXv5xirhVOXiDgVUZrmdbiQhAZBF3Hozc-vu_uslRpooXMUc30XMkMIRW3W2VVcgs9rd5A2L7IN2UoKk4c605BME8HuxSw5dJi61n51kUiWg0X_or8hL5bzI1OhzU0UTY9zkFeucGgcQkrHMan8e1c4vp-XEdCwfwzfhx8c4Om5kcIEIwEKXGeQin9YJZKnyExf7a4zX0LqXr9pMmoj"
                    alt="Avatar 2"
                    className="border-background-dark h-10 w-10 overflow-hidden rounded-full border-2 bg-slate-400"
                  />
                </div>
                <div className="text-xs">
                  <p className="font-bold text-slate-900 dark:text-white">
                    Trusted by founders
                  </p>
                  <p className="text-slate-500">from Y-Combinator, Techstars</p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </motion.div>
      </section>

      {/* Featured Apps Section */}
      <section className="bg-slate-50 px-6 py-24 dark:bg-white/[0.02]">
        <motion.div className="mx-auto max-w-7xl">
          <motion.div
            className="mb-16 flex flex-col justify-between gap-6 md:flex-row md:items-end"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <div>
              <h2 className="mb-4 text-sm font-bold tracking-[0.2em] text-primary uppercase">
                Portfolio
              </h2>
              <h3 className="text-4xl font-black text-slate-900 dark:text-white">
                Featured Apps
              </h3>
            </div>
            <p className="max-w-md text-slate-600 dark:text-slate-400">
              A selection of mobile experiences focused on user interaction,
              performance, and scalability.
            </p>
          </motion.div>

          <FeaturedAppsSection />
        </motion.div>
      </section>

      {/* Trust Section */}
      <section className="dark:bg-background-dark bg-slate-900 px-6 py-24 text-white">
        <motion.div
          className="mx-auto max-w-7xl text-center"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          <h3 className="mb-6 text-3xl font-black">Ready to start forging?</h3>
          <p className="mx-auto mb-8 max-w-2xl text-slate-300">
            Get access to high-quality mobile applications that deliver results.
          </p>
          <button
            onClick={() => navigate({ to: "/explore" })}
            className="rounded-xl bg-primary px-8 py-4 font-bold text-white transition-all hover:opacity-90"
          >
            Explore All Apps
          </button>
        </motion.div>
      </section>
    </div>
  )
}

function FeaturedAppsSection() {
  const { data: apps = [], isLoading } = useApps()
  const displayApps = apps.slice(0, 3)

  if (isLoading) {
    return (
      <div className="py-20 text-center">
        <div className="inline-block h-12 w-12 animate-spin rounded-full border-b-2 border-primary" />
        <p className="mt-4 text-slate-600 dark:text-slate-400">
          Loading apps...
        </p>
      </div>
    )
  }

  return (
    <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
      {displayApps.map((app: any, idx: number) => (
        <Link key={app._id} to="/app/$slug" params={{ slug: app.slug }}>
          <motion.div
            className="group relative h-full cursor-pointer rounded-2xl border border-slate-200 bg-white p-4 transition-all hover:border-primary hover:shadow-2xl hover:shadow-primary/5 dark:border-white/5 dark:bg-background"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: idx * 0.1 }}
            viewport={{ once: true }}
            whileHover={{ y: -5 }}
          >
            <div className="mb-6 aspect-[4/3] overflow-hidden rounded-xl bg-slate-100 dark:bg-slate-800">
              {app.screenshots?.[0] ? (
                <img
                  alt={app.name}
                  src={app.screenshots[0]}
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
              ) : (
                <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-primary/20 to-primary/5 text-4xl text-primary">
                  {app.icon || "📱"}
                </div>
              )}
            </div>
            <div className="mb-2 flex items-center justify-between">
              <span
                className={`rounded px-2.5 py-1 text-[10px] font-bold uppercase ${
                  app.status === "released"
                    ? "bg-green-500/10 text-green-500"
                    : app.status === "coming_soon"
                      ? "bg-amber-500/10 text-amber-500"
                      : "bg-slate-500/10 text-slate-500"
                }`}
              >
                {app.status === "coming_soon" ? "Coming Soon" : app.status}
              </span>
              <div className="flex gap-1">
                <Zap size={14} className="text-slate-400" />
              </div>
            </div>
            <h4 className="mb-1 text-xl font-bold text-slate-900 dark:text-white">
              {app.name}
            </h4>
            <p className="mb-6 text-sm text-slate-500">{app.description}</p>
            <button className="w-full rounded-lg border border-slate-200 py-3 text-sm font-bold transition-all hover:border-primary hover:bg-primary hover:text-white dark:border-white/10">
              View Project
            </button>
          </motion.div>
        </Link>
      ))}
    </div>
  )
}
