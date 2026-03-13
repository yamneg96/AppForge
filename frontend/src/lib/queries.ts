import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query"
import { api } from "./api"
import type { ContactForm } from "./schemas"

export const useApps = () => {
  return useQuery({
    queryKey: ["apps"],
    queryFn: () => api.apps.list(),
    staleTime: 1000 * 60 * 5, // 5 minutes
  })
}

export const useAppBySlug = (slug: string) => {
  return useQuery({
    queryKey: ["app", slug],
    queryFn: () => api.apps.getBySlug(slug),
    enabled: !!slug,
    staleTime: 1000 * 60 * 5,
  })
}

export const useContactMutation = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (data: ContactForm) => api.contact.submit(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["contact"] })
    },
  })
}

export const useRequestOTP = () => {
  return useMutation({
    mutationFn: (email: string) => api.auth.requestOTP(email),
  })
}

export const useVerifyOTP = () => {
  return useMutation({
    mutationFn: (data: { email: string; otp: string }) =>
      api.auth.verifyOTP(data.email, data.otp),
  })
}
