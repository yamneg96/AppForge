import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { motion } from "framer-motion"
import { contactSchema, type ContactForm } from "@/lib/schemas"
import { useContactMutation } from "@/lib/queries"
import { AlertCircle, CheckCircle, Mail } from "lucide-react"

export function ContactPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ContactForm>({
    resolver: zodResolver(contactSchema),
  })

  const { mutate: submitContact, isPending, isError } = useContactMutation()
  const [showSuccess, setShowSuccess] = useState(false)

  const onSubmit = (data: ContactForm) => {
    submitContact(data, {
      onSuccess: () => {
        setShowSuccess(true)
        reset()
        setTimeout(() => setShowSuccess(false), 5000)
      },
    })
  }

  return (
    <div className="dark:from-background-dark dark:to-background-dark/50 from-background-50 to-background-100 min-h-screen bg-linear-to-b px-6 py-20">
      <motion.div
        className="mx-auto max-w-2xl"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        {/* Header */}
        <div className="mb-12 text-center">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.5, type: "spring" }}
            className="mb-6 inline-block"
          >
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/20">
              <Mail className="text-primary" size={28} />
            </div>
          </motion.div>
          <h1 className="mb-4 text-4xl font-black text-slate-900 dark:text-white">
            Get in Touch
          </h1>
          <p className="mx-auto max-w-lg text-lg text-slate-600 dark:text-slate-400">
            Have a question or want to work together? I'd love to hear from you.
            Send me a message and I'll get back to you as soon as possible.
          </p>
        </div>

        {/* Success Message */}
        {showSuccess && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="mb-6 flex items-start gap-3 rounded-lg border border-green-200 bg-green-50 p-4 dark:border-green-500/20 dark:bg-green-500/10"
          >
            <CheckCircle className="mt-0.5 shrink-0 text-green-500" size={20} />
            <div>
              <p className="font-bold text-green-900 dark:text-green-100">
                Message sent successfully!
              </p>
              <p className="text-sm text-green-800 dark:text-green-200">
                Thank you for reaching out. I'll get back to you soon.
              </p>
            </div>
          </motion.div>
        )}

        {/* Error Message */}
        {isError && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="mb-6 flex items-start gap-3 rounded-lg border border-red-200 bg-red-50 p-4 dark:border-red-500/20 dark:bg-red-500/10"
          >
            <AlertCircle className="mt-0.5 shrink-0 text-red-500" size={20} />
            <div>
              <p className="font-bold text-red-900 dark:text-red-100">
                Error sending message
              </p>
              <p className="text-sm text-red-800 dark:text-red-200">
                Please try again later.
              </p>
            </div>
          </motion.div>
        )}

        {/* Contact Form */}
        <motion.form
          onSubmit={handleSubmit(onSubmit)}
          className="rounded-2xl border border-slate-200 bg-white p-8 shadow-xl dark:border-slate-800 dark:bg-slate-900"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          {/* Name Field */}
          <motion.div
            className="mb-6"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            <label
              htmlFor="name"
              className="mb-2 block text-sm font-semibold text-slate-900 dark:text-white"
            >
              Full Name
            </label>
            <input
              id="name"
              {...register("name")}
              placeholder="John Doe"
              className="w-full rounded-lg border border-slate-200 bg-slate-50 px-4 py-3 text-slate-900 placeholder-slate-500 transition-all focus:border-transparent focus:ring-2 focus:ring-primary focus:outline-none dark:border-slate-700 dark:bg-slate-800 dark:text-white"
            />
            {errors.name && (
              <p className="mt-1 text-sm text-red-500">{errors.name.message}</p>
            )}
          </motion.div>

          {/* Email Field */}
          <motion.div
            className="mb-6"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <label
              htmlFor="email"
              className="mb-2 block text-sm font-semibold text-slate-900 dark:text-white"
            >
              Email Address
            </label>
            <input
              id="email"
              {...register("email")}
              type="email"
              placeholder="you@example.com"
              className="w-full rounded-lg border border-slate-200 bg-slate-50 px-4 py-3 text-slate-900 placeholder-slate-500 transition-all focus:border-transparent focus:ring-2 focus:ring-primary focus:outline-none dark:border-slate-700 dark:bg-slate-800 dark:text-white"
            />
            {errors.email && (
              <p className="mt-1 text-sm text-red-500">
                {errors.email.message}
              </p>
            )}
          </motion.div>

          {/* Message Field */}
          <motion.div
            className="mb-8"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <label
              htmlFor="message"
              className="mb-2 block text-sm font-semibold text-slate-900 dark:text-white"
            >
              Message
            </label>
            <textarea
              id="message"
              {...register("message")}
              placeholder="Tell me about your project or question..."
              rows={6}
              className="w-full resize-none rounded-lg border border-slate-200 bg-slate-50 px-4 py-3 text-slate-900 placeholder-slate-500 transition-all focus:border-transparent focus:ring-2 focus:ring-primary focus:outline-none dark:border-slate-700 dark:bg-slate-800 dark:text-white"
            />
            {errors.message && (
              <p className="mt-1 text-sm text-red-500">
                {errors.message.message}
              </p>
            )}
          </motion.div>

          {/* Submit Button */}
          <motion.button
            type="submit"
            disabled={isPending}
            className="w-full rounded-lg bg-primary py-4 text-lg font-bold text-white transition-all hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            {isPending ? "Sending..." : "Send Message"}
          </motion.button>

          <p className="mt-4 text-center text-xs text-slate-500 dark:text-slate-400">
            I'll get back to you within 24 hours.
          </p>
        </motion.form>

        {/* Alternative Contact Methods */}
        <motion.div
          className="mt-12 grid gap-6 md:grid-cols-2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <div className="rounded-xl border border-slate-200 bg-slate-50 p-6 dark:border-slate-700 dark:bg-slate-800">
            <h3 className="mb-2 font-bold text-slate-900 dark:text-white">
              Quick Response
            </h3>
            <p className="text-sm text-slate-600 dark:text-slate-400">
              Typically reply within 24 hours
            </p>
          </div>
          <div className="rounded-xl border border-slate-200 bg-slate-50 p-6 dark:border-slate-700 dark:bg-slate-800">
            <h3 className="mb-2 font-bold text-slate-900 dark:text-white">
              Email
            </h3>
            <p className="text-sm text-slate-600 dark:text-slate-400">
              contact@appforge.dev
            </p>
          </div>
        </motion.div>
      </motion.div>
    </div>
  )
}
