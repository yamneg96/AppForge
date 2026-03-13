import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { ThemeProvider } from "@/lib/theme-context";
import { AuthProvider } from "@/lib/auth-context";
import { ProtectedRoute } from "@/components/protected-route";
import { DashboardLayout } from "@/components/layout/dashboard-layout";
import { Login } from "@/pages/login";
import { Dashboard } from "@/pages/dashboard";
import { Apps } from "@/pages/apps";
import { CreateApp } from "@/pages/create-app";
import { EditApp } from "@/pages/edit-app";
import { Messages } from "@/pages/messages";
import "./styles/globals.css";

// Create a client for React Query
const queryClient = new QueryClient();

// Render the app
const rootElement = document.getElementById("root")!;
if (!rootElement.innerHTML) {
  const root = ReactDOM.createRoot(rootElement);
  root.render(
    <React.StrictMode>
      <ThemeProvider>
        <GoogleOAuthProvider
          clientId={(import.meta.env.VITE_GOOGLE_CLIENT_ID as string) || ""}
        >
          <AuthProvider>
            <QueryClientProvider client={queryClient}>
              <Router>
                <Routes>
                  {/* Public routes */}
                  <Route path="/login" element={<Login />} />

                  {/* Protected routes */}
                  <Route
                    element={
                      <ProtectedRoute>
                        <DashboardLayout />
                      </ProtectedRoute>
                    }
                  >
                    <Route path="/" element={<Dashboard />} />
                    <Route path="/apps" element={<Apps />} />
                    <Route path="/create-app" element={<CreateApp />} />
                    <Route path="/edit-app/:id" element={<EditApp />} />
                    <Route path="/messages" element={<Messages />} />
                  </Route>
                </Routes>
              </Router>
            </QueryClientProvider>
          </AuthProvider>
        </GoogleOAuthProvider>
      </ThemeProvider>
    </React.StrictMode>,
  );
}
