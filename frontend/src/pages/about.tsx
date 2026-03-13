import { motion } from "framer-motion"

export function AboutPage() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2 },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  }

  return (
    <div className="min-h-screen px-6 py-20">
      <motion.div
        className="mx-auto max-w-4xl"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Header */}
        <motion.div className="mb-16 text-center" variants={itemVariants}>
          <h1 className="mb-6 text-5xl font-black text-slate-900 dark:text-white">
            About AppForge
          </h1>
          <p className="mx-auto max-w-2xl text-xl leading-relaxed text-slate-600 dark:text-slate-400">
            A platform showcasing cutting-edge mobile applications built with
            modern technologies and best practices.
          </p>
        </motion.div>

        {/* Content Sections */}
        <motion.div className="space-y-12" variants={containerVariants}>
          {/* Mission */}
          <motion.section
            variants={itemVariants}
            className="rounded-2xl border border-slate-200 bg-slate-50 p-8 dark:border-slate-800 dark:bg-slate-900/50"
          >
            <h2 className="mb-4 text-3xl font-bold text-slate-900 dark:text-white">
              Our Mission
            </h2>
            <p className="text-lg leading-relaxed text-slate-600 dark:text-slate-400">
              AppForge exists to bridge the gap between developers and users,
              creating a centralized platform where innovative mobile
              applications can be discovered, evaluated, and downloaded. We
              believe in showcasing the best of mobile app development to a
              global audience.
            </p>
          </motion.section>

          {/* Technology Stack */}
          <motion.section
            variants={itemVariants}
            className="rounded-2xl border border-slate-200 bg-slate-50 p-8 dark:border-slate-800 dark:bg-slate-900/50"
          >
            <h2 className="mb-4 text-3xl font-bold text-slate-900 dark:text-white">
              Technology Stack
            </h2>
            <div className="grid gap-8 md:grid-cols-2">
              <div>
                <h3 className="mb-3 font-bold text-slate-900 dark:text-white">
                  Frontend
                </h3>
                <ul className="space-y-2 text-slate-600 dark:text-slate-400">
                  <li>• React 19</li>
                  <li>• TanStack Router</li>
                  <li>• TanStack Query</li>
                  <li>• Tailwind CSS</li>
                  <li>• Framer Motion</li>
                  <li>• Zustand</li>
                </ul>
              </div>
              <div>
                <h3 className="mb-3 font-bold text-slate-900 dark:text-white">
                  Backend
                </h3>
                <ul className="space-y-2 text-slate-600 dark:text-slate-400">
                  <li>• Node.js + Express</li>
                  <li>• MongoDB</li>
                  <li>• TypeScript</li>
                  <li>• JWT Authentication</li>
                  <li>• ImageKit</li>
                  <li>• Zod Validation</li>
                </ul>
              </div>
            </div>
          </motion.section>

          {/* Features */}
          <motion.section
            variants={itemVariants}
            className="rounded-2xl border border-slate-200 bg-slate-50 p-8 dark:border-slate-800 dark:bg-slate-900/50"
          >
            <h2 className="mb-6 text-3xl font-bold text-slate-900 dark:text-white">
              Key Features
            </h2>
            <div className="grid gap-6 md:grid-cols-2">
              {[
                "Discover innovative mobile apps",
                "View detailed app information & screenshots",
                "Direct download links for APK & iOS beta",
                "Rich app filtering & search",
                "Responsive mobile-first design",
                "Dark mode support",
                "Admin dashboard for app management",
                "Secure authentication system",
              ].map((feature, idx) => (
                <motion.div
                  key={idx}
                  className="flex items-start gap-3 rounded-lg border border-slate-200 bg-white p-4 dark:border-slate-700 dark:bg-slate-800"
                  whileHover={{ x: 5 }}
                  transition={{ duration: 0.2 }}
                >
                  <span className="text-xl text-primary">✓</span>
                  <span className="text-slate-600 dark:text-slate-400">
                    {feature}
                  </span>
                </motion.div>
              ))}
            </div>
          </motion.section>

          {/* Contact CTA */}
          <motion.section
            variants={itemVariants}
            className="rounded-2xl bg-primary p-12 text-center text-white"
          >
            <h2 className="mb-4 text-3xl font-bold">Ready to Collaborate?</h2>
            <p className="mx-auto mb-8 max-w-xl text-lg text-primary-foreground/80">
              Whether you're a developer looking to showcase your apps or a
              startup wanting to distribute your product, get in touch with us.
            </p>
            <motion.button
              className="rounded-xl bg-white px-8 py-4 font-bold text-primary transition-all hover:bg-slate-100"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Start Conversation
            </motion.button>
          </motion.section>
        </motion.div>

        {/* Stats */}
        <motion.div
          className="mt-16 grid gap-8 md:grid-cols-3"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.5 }}
        >
          {[
            { number: "50+", label: "Apps Listed" },
            { number: "100k+", label: "Downloads" },
            { number: "4.8★", label: "Average Rating" },
          ].map((stat, idx) => (
            <motion.div
              key={idx}
              className="rounded-xl border border-slate-200 bg-slate-50 p-6 text-center dark:border-slate-800 dark:bg-slate-900"
              whileHover={{ y: -5 }}
              transition={{ duration: 0.3 }}
            >
              <p className="mb-2 text-4xl font-black text-primary">
                {stat.number}
              </p>
              <p className="text-slate-600 dark:text-slate-400">{stat.label}</p>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>
    </div>
  )
}
