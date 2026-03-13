import React, { createContext, useContext, useState, useEffect } from "react";

interface AuthContextType {
  isAuthenticated: boolean;
  email: string | null;
  token: string | null;
  sessionId: string | null;
  login: (token: string, sessionId: string, email: string) => void;
  logout: () => void;
  loading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [email, setEmail] = useState<string | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [sessionId, setSessionId] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  // Check if user is already authenticated on mount
  useEffect(() => {
    const storedToken = localStorage.getItem("adminToken");
    const storedSessionId = localStorage.getItem("sessionId");
    const storedEmail = localStorage.getItem("adminEmail");

    if (storedToken && storedSessionId && storedEmail) {
      setToken(storedToken);
      setSessionId(storedSessionId);
      setEmail(storedEmail);
      setIsAuthenticated(true);
    }

    setLoading(false);
  }, []);

  const login = (newToken: string, newSessionId: string, userEmail: string) => {
    setToken(newToken);
    setSessionId(newSessionId);
    setEmail(userEmail);
    setIsAuthenticated(true);

    localStorage.setItem("adminToken", newToken);
    localStorage.setItem("sessionId", newSessionId);
    localStorage.setItem("adminEmail", userEmail);
  };

  const logout = () => {
    setToken(null);
    setSessionId(null);
    setEmail(null);
    setIsAuthenticated(false);

    localStorage.removeItem("adminToken");
    localStorage.removeItem("sessionId");
    localStorage.removeItem("adminEmail");
  };

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        email,
        token,
        sessionId,
        login,
        logout,
        loading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
