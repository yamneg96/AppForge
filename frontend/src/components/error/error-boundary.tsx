import { ReactNode } from "react"
import React from "react"

interface ErrorBoundaryProps {
  children: ReactNode
}

interface ErrorBoundaryState {
  hasError: boolean
  error: Error | null
  errorInfo: { componentStack: string } | null
}

export class ErrorBoundary extends React.Component<
  ErrorBoundaryProps,
  ErrorBoundaryState
> {
  constructor(props: ErrorBoundaryProps) {
    super(props)
    this.state = {
      hasError: false,
      error: null,
      errorInfo: null,
    }
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return {
      hasError: true,
      error,
      errorInfo: null,
    }
  }

  componentDidCatch(error: Error, errorInfo: { componentStack: string }) {
    console.error("Error caught by boundary:", error)
    console.error("Component stack:", errorInfo.componentStack)
    this.setState({
      errorInfo,
    })
  }

  handleReset = () => {
    this.setState({
      hasError: false,
      error: null,
      errorInfo: null,
    })
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="flex min-h-screen items-center justify-center bg-white px-4 dark:bg-slate-900">
          <div className="w-full max-w-md">
            <div className="rounded-lg border border-red-200 bg-red-50 p-8 text-center dark:border-red-800 dark:bg-red-950/20">
              <div className="mb-4">
                <svg
                  className="mx-auto h-12 w-12 text-red-600 dark:text-red-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 9v2m0 4v2m0 0a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <h2 className="mb-2 text-xl font-bold text-red-900 dark:text-red-100">
                Oops! Something went wrong
              </h2>
              <p className="mb-4 text-sm text-red-700 dark:text-red-300">
                {this.state.error?.message || "An unexpected error occurred"}
              </p>
              {process.env.NODE_ENV === "development" &&
                this.state.errorInfo && (
                  <details className="mb-4 text-left">
                    <summary className="cursor-pointer text-xs font-semibold text-red-600 dark:text-red-400">
                      Technical Details
                    </summary>
                    <pre className="mt-2 max-h-40 overflow-auto rounded bg-red-100 p-2 text-xs text-red-950 dark:bg-red-900/30 dark:text-red-200">
                      {this.state.errorInfo.componentStack}
                    </pre>
                  </details>
                )}
              <button
                onClick={this.handleReset}
                className="rounded bg-red-600 px-4 py-2 font-semibold text-white transition-colors hover:bg-red-700 dark:bg-red-700 dark:hover:bg-red-800"
              >
                Try Again
              </button>
            </div>
          </div>
        </div>
      )
    }

    return this.props.children
  }
}

export default ErrorBoundary
