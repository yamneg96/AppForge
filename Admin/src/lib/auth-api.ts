import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

const apiClient = axios.create({
  baseURL: API_URL,
  withCredentials: true,
});

export interface AuthResponse {
  message: string;
  token: string;
  sessionId: string;
}

export interface OTPRequest {
  email: string;
}

export interface OTPVerification {
  email: string;
  otp: string;
}

export interface GoogleAuth {
  email: string;
  googleId: string;
}

// Request OTP
export async function requestOTP(
  email: string,
): Promise<{ message: string; email: string }> {
  try {
    const response = await apiClient.post<{ message: string; email: string }>(
      "/auth/request-otp",
      { email },
    );
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data?.error || "Failed to request OTP");
    }
    throw error;
  }
}

// Verify OTP
export async function verifyOTP(
  email: string,
  otp: string,
): Promise<AuthResponse> {
  try {
    const response = await apiClient.post<AuthResponse>("/auth/verify-otp", {
      email,
      otp,
    });
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data?.error || "Failed to verify OTP");
    }
    throw error;
  }
}

// Verify Google OAuth
export async function verifyGoogleAuth(
  email: string,
  googleId: string,
): Promise<AuthResponse> {
  try {
    const response = await apiClient.post<AuthResponse>("/auth/verify-google", {
      email,
      googleId,
    });
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(
        error.response?.data?.error || "Failed to verify Google auth",
      );
    }
    throw error;
  }
}

// Logout
export async function logout(): Promise<void> {
  try {
    const token = localStorage.getItem("adminToken");
    if (token) {
      await apiClient.post(
        "/auth/logout",
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
    }
  } catch (error) {
    console.error("Logout error:", error);
  }
}
