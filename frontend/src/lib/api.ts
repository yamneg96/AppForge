const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:3000/api"

export const api = {
  apps: {
    list: () => fetch(`${API_BASE_URL}/apps`).then((r) => r.json()),
    getBySlug: (slug: string) =>
      fetch(`${API_BASE_URL}/apps/${slug}`).then((r) => r.json()),
  },
  contact: {
    submit: (data: unknown) =>
      fetch(`${API_BASE_URL}/contact`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      }).then((r) => r.json()),
  },
  auth: {
    requestOTP: (email: string) =>
      fetch(`${API_BASE_URL}/auth/request-otp`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
        credentials: "include",
      }).then((r) => r.json()),
    verifyOTP: (email: string, otp: string) =>
      fetch(`${API_BASE_URL}/auth/verify-otp`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, otp }),
        credentials: "include",
      }).then((r) => r.json()),
    getCurrentAdmin: (token: string) =>
      fetch(`${API_BASE_URL}/auth/me`, {
        headers: {
          Authorization: `Bearer ${token}`,
          "X-Session-Token": localStorage.getItem("sessionToken") || "",
        },
        credentials: "include",
      }).then((r) => r.json()),
  },
}
