import { RootRoute, Route, Router } from "@tanstack/react-router"
import { RootLayout } from "@/components/layouts"
import { LandingPage } from "@/pages/index"
import { ExploreAppsPage } from "@/pages/explore"
import { AppDetailsPage } from "@/pages/app-details"
import { ContactPage } from "@/pages/contact"
import { AboutPage } from "@/pages/about"

const rootRoute = new RootRoute({
  component: RootLayout,
})

const indexRoute = new Route({
  getParentRoute: () => rootRoute,
  path: "/",
  component: LandingPage,
})

const exploreRoute = new Route({
  getParentRoute: () => rootRoute,
  path: "/explore",
  component: ExploreAppsPage,
})

const appDetailsRoute = new Route({
  getParentRoute: () => rootRoute,
  path: "/app/$slug",
  component: AppDetailsPage,
})

const contactRoute = new Route({
  getParentRoute: () => rootRoute,
  path: "/contact",
  component: ContactPage,
})

const aboutRoute = new Route({
  getParentRoute: () => rootRoute,
  path: "/about",
  component: AboutPage,
})

const routeTree = rootRoute.addChildren([
  indexRoute,
  exploreRoute,
  appDetailsRoute,
  contactRoute,
  aboutRoute,
])

export const router = new Router({ routeTree })

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router
  }
}
