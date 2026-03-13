import { useState, type ReactNode } from "react";
import { useNavigate } from "react-router-dom";
import { Lock, Mail, Loader2, Sun, Moon } from "lucide-react";
import { GoogleLogin, type CredentialResponse } from "@react-oauth/google";
import { useAuth } from "@/lib/auth-context";
import { useTheme } from "@/lib/theme-context";
import { requestOTP, verifyOTP, verifyGoogleAuth } from "@/lib/auth-api";

export function Login() {
  const navigate = useNavigate();
  const { login, isAuthenticated } = useAuth();
  const { theme, toggleTheme } = useTheme();

  const [email, setEmail] = useState("yamlaknegash96@gmail.com");
  const [otp, setOtp] = useState("");
  const [step, setStep] = useState<"method" | "otp">("method");
  const [googleError, setGoogleError] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const googleClientId =
    (import.meta.env.VITE_GOOGLE_CLIENT_ID as string) || "";
  const showFallback = !googleClientId || Boolean(googleError);

  // Redirect if already authenticated
  if (isAuthenticated) {
    navigate("/");
    return null;
  }

  const loginWithGoogle = async (response: CredentialResponse) => {
    if (!response.credential) {
      setGoogleError("Google credential missing. Please try again.");
      return;
    }

    setGoogleError("");
    try {
      setIsLoading(true);
      setError(null);

      // Decode JWT to get email and Google ID
      const decodedToken = JSON.parse(atob(response.credential.split(".")[1]));
      const { email: googleEmail, sub: googleId } = decodedToken;

      // Only allow the specific email
      if (googleEmail.toLowerCase() !== "yamlaknegash96@gmail.com") {
        setGoogleError("Only yamlaknegash96@gmail.com is authorized");
        return;
      }

      const authResponse = await verifyGoogleAuth(googleEmail, googleId);

      login(authResponse.token, authResponse.sessionId, googleEmail);
      setSuccessMessage("Login successful! Redirecting...");

      setTimeout(() => {
        navigate("/");
      }, 1000);
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : "Google authentication failed";
      setGoogleError(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmitLoginOtp = async () => {
    if (!email) {
      setError("Email is required");
      return;
    }

    // Validate email
    if (email.toLowerCase() !== "yamlaknegash96@gmail.com") {
      setError("Only yamlaknegash96@gmail.com is authorized as admin");
      return;
    }

    try {
      setIsLoading(true);
      setError(null);

      await requestOTP(email);
      setStep("otp");
      setSuccessMessage("OTP sent to your email. Check your inbox!");

      setTimeout(() => setSuccessMessage(null), 5000);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to request OTP");
    } finally {
      setIsLoading(false);
    }
  };

  const handleVerifyOTP = async () => {
    if (!otp || otp.length !== 6) {
      setError("Please enter a valid 6-digit OTP");
      return;
    }

    try {
      setIsLoading(true);
      setError(null);

      const authResponse = await verifyOTP(email, otp);

      login(authResponse.token, authResponse.sessionId, email);
      setSuccessMessage("Login successful! Redirecting...");

      setTimeout(() => {
        navigate("/");
      }, 1000);
    } catch (err) {
      setError(err instanceof Error ? err.message : "OTP verification failed");
    } finally {
      setIsLoading(false);
    }
  };

  if (step === "otp") {
    return (
      <div className="flex min-h-screen flex-col bg-background text-foreground">
        {/* Theme Toggle Button */}
        <div className="absolute top-6 right-6 z-10">
          <button
            onClick={toggleTheme}
            className="p-2 rounded-lg border border-border bg-card hover:bg-muted transition-colors flex items-center justify-center"
            aria-label="Toggle theme"
          >
            {theme === "light" ? (
              <Moon className="h-5 w-5" />
            ) : (
              <Sun className="h-5 w-5" />
            )}
          </button>
        </div>

        <main className="flex flex-1 items-center justify-center p-4">
          <div className="w-full max-w-md overflow-hidden rounded-lg border border-border bg-card shadow-lg">
            <div className="relative border-b border-border bg-primary/10 p-6">
              <div className="absolute right-4 bottom-2 text-primary/20">
                <Lock className="h-16 w-16" />
              </div>
              <h1 className="text-3xl font-bold text-foreground">
                AppForge Admin
              </h1>
              <p className="mt-4 text-sm text-muted-foreground">
                Enter the OTP sent to your email
              </p>
            </div>

            <div className="space-y-4 p-6">
              {/* Error Message */}
              {error && (
                <div className="rounded-lg border border-destructive/50 bg-destructive/10 p-4">
                  <p className="text-sm text-destructive">{error}</p>
                </div>
              )}

              {/* Success Message */}
              {successMessage && (
                <div className="rounded-lg border border-green-500/50 bg-green-50/50 dark:bg-green-950/30 p-4">
                  <p className="text-sm text-green-700 dark:text-green-300">
                    {successMessage}
                  </p>
                </div>
              )}

              {/* OTP Input */}
              <div className="space-y-2">
                <label className="block text-sm font-medium text-foreground">
                  Enter OTP (6 digits)
                </label>
                <input
                  type="text"
                  value={otp}
                  onChange={(e) =>
                    setOtp(e.target.value.replace(/\D/g, "").slice(0, 6))
                  }
                  maxLength={6}
                  className="h-12 w-full rounded-lg border-2 border-primary/40 bg-card p-3 text-center text-2xl font-mono text-foreground placeholder-muted-foreground focus:border-primary focus:ring-2 focus:ring-primary/20"
                  placeholder="000000"
                  disabled={isLoading}
                  autoFocus
                />
              </div>

              <button
                onClick={handleVerifyOTP}
                disabled={isLoading || otp.length !== 6}
                className="flex w-full items-center justify-center gap-2 rounded-lg bg-primary text-primary-foreground py-2 font-semibold transition-colors hover:bg-primary/90 disabled:cursor-not-allowed disabled:opacity-50"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" />
                    Verifying...
                  </>
                ) : (
                  "Verify OTP"
                )}
              </button>

              {/* Back Button */}
              <button
                onClick={() => {
                  setStep("method");
                  setOtp("");
                  setError(null);
                  setSuccessMessage(null);
                }}
                className="w-full py-2 font-medium text-primary transition-colors hover:text-primary/80"
              >
                ← Back to Email
              </button>

              {/* Info */}
              <div className="rounded-lg border border-primary/20 bg-primary/5 p-4">
                <p className="text-xs text-muted-foreground">
                  OTP is valid for <strong>10 minutes</strong>. Check your email
                  for the code.
                </p>
              </div>
            </div>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen flex-col bg-background text-foreground">
      {/* Theme Toggle Button */}
      <div className="absolute top-6 right-6 z-10">
        <button
          onClick={toggleTheme}
          className="p-2 rounded-lg border border-border bg-card hover:bg-muted transition-colors flex items-center justify-center"
          aria-label="Toggle theme"
        >
          {theme === "light" ? (
            <Moon className="h-5 w-5" />
          ) : (
            <Sun className="h-5 w-5" />
          )}
        </button>
      </div>

      <main className="flex flex-1 items-center justify-center p-4">
        <div className="w-full max-w-md overflow-hidden rounded-lg border border-border bg-card shadow-lg">
          <div className="relative border-b border-border bg-primary/10 p-6">
            <div className="absolute right-4 bottom-2 text-primary/20">
              <Lock className="h-16 w-16" />
            </div>
            <h1 className="text-3xl font-bold text-foreground">
              AppForge Admin
            </h1>
            <p className="mt-4 text-sm text-muted-foreground">
              Continue with your Google account. One Tap will prompt
              automatically when available.
            </p>
          </div>

          <div className="space-y-4 p-6">
            {/* Google Sign-In Section */}
            <div className="space-y-2">
              <label className="block text-sm font-medium text-foreground">
                Google Sign-In (Primary)
              </label>
              {googleClientId ? (
                <div className="overflow-hidden rounded-lg border border-border p-3 bg-background">
                  <GoogleLogin
                    onSuccess={loginWithGoogle}
                    onError={() =>
                      setGoogleError(
                        "Google sign-in failed. Ensure this domain is authorized in Google OAuth settings.",
                      )
                    }
                    shape="pill"
                    size="large"
                    text="continue_with"
                    useOneTap
                    width="100%"
                  />
                </div>
              ) : (
                <p className="text-sm text-destructive">
                  Missing VITE_GOOGLE_CLIENT_ID. Configure it to enable One Tap.
                </p>
              )}
            </div>

            {isLoading && googleClientId && (
              <p className="text-sm text-muted-foreground">
                Verifying Google identity...
              </p>
            )}

            {googleError && (
              <p className="text-sm text-destructive">{googleError}</p>
            )}

            {/* Fallback OTP Method */}
            {showFallback ? (
              <>
                <div className="flex items-center gap-3">
                  <div className="h-px flex-1 bg-border" />
                  <span className="text-xs uppercase tracking-wide text-muted-foreground">
                    Fallback
                  </span>
                  <div className="h-px flex-1 bg-border" />
                </div>

                <Field
                  icon={<Mail className="h-4 w-4" />}
                  label="Email Address"
                  placeholder="yamlaknegash96@gmail.com"
                  type="email"
                  value={email}
                  onChange={setEmail}
                />

                {error && (
                  <div className="rounded-lg border border-destructive/50 bg-destructive/10 p-4">
                    <p className="text-sm text-destructive">{error}</p>
                  </div>
                )}

                {successMessage && (
                  <div className="rounded-lg border border-green-500/50 bg-green-50/50 dark:bg-green-950/30 p-4">
                    <p className="text-sm text-green-700 dark:text-green-300">
                      {successMessage}
                    </p>
                  </div>
                )}

                <button
                  onClick={handleSubmitLoginOtp}
                  disabled={isLoading}
                  className="flex w-full items-center justify-center gap-2 rounded-lg bg-primary text-primary-foreground py-2 font-semibold transition-colors hover:bg-primary/90 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="h-4 w-4 animate-spin" />
                      Sending OTP...
                    </>
                  ) : (
                    "Send OTP (Fallback)"
                  )}
                </button>
              </>
            ) : null}
          </div>
        </div>
      </main>
    </div>
  );
}

function Field({
  icon,
  label,
  placeholder,
  type,
  value,
  onChange,
}: {
  icon: ReactNode;
  label: string;
  placeholder: string;
  type: string;
  value: string;
  onChange: (value: string) => void;
}) {
  return (
    <div className="space-y-2">
      <label className="block text-sm font-medium text-foreground">
        {label}
      </label>
      <div className="relative">
        <span className="pointer-events-none absolute left-2 top-2.5 text-muted-foreground">
          {icon}
        </span>
        <input
          className="h-9 w-full rounded-lg border border-border bg-background pl-8 pr-4 text-foreground placeholder-muted-foreground focus:border-primary focus:ring-2 focus:ring-primary/20"
          placeholder={placeholder}
          type={type}
          value={value}
          onChange={(event) => onChange(event.target.value)}
        />
      </div>
    </div>
  );
}
