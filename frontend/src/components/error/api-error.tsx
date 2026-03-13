import { useState, useEffect, ReactNode } from "react"

interface ApiErrorProps {
  error: Error | string
  onRetry?: () => void
  isLoading?: boolean
  children?: ReactNode
}

export function ApiError({
  error,
  onRetry,
  isLoading = false,
  children,
}: ApiErrorProps) {
  const [visible, setVisible] = useState(true)

  if (!visible) return null

  const message = error instanceof Error ? error.message : error

  return (
    <div className="mb-4 rounded-lg border border-red-200 bg-red-50 p-4 dark:border-red-800 dark:bg-red-950/20">
      <div className="flex gap-4">
        <div className="flex-shrink-0">
          <svg
            className="h-5 w-5 text-red-600 dark:text-red-400"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path
              fillRule="evenodd"
              d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
              clipRule="evenodd"
            />
          </svg>
        </div>

        <div className="flex-1">
          <h3 className="mb-1 text-sm font-semibold text-red-900 dark:text-red-100">
            Error
          </h3>
          <p className="text-sm text-red-700 dark:text-red-300">{message}</p>

          {children && <div className="mt-2 text-sm">{children}</div>}

          <div className="mt-3 flex gap-2">
            {onRetry && (
              <button
                onClick={onRetry}
                disabled={isLoading}
                className="text-sm font-semibold text-red-600 transition-colors hover:text-red-700 disabled:opacity-50 dark:text-red-400 dark:hover:text-red-300"
              >
                {isLoading ? "Retrying..." : "Retry"}
              </button>
            )}
            <button
              onClick={() => setVisible(false)}
              className="text-sm font-semibold text-red-600 transition-colors hover:text-red-700 dark:text-red-400 dark:hover:text-red-300"
            >
              Dismiss
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export function createErrorMessage(error: unknown): string {
  if (error instanceof Error) {
    return error.message
  }
  if (typeof error === "string") {
    return error
  }
  if (typeof error === "object" && error !== null && "message" in error) {
    return (error as { message: string }).message
  }
  return "An unexpected error occurred"
}

export default ApiError
