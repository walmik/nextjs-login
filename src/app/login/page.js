"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      const result = await signIn("credentials", {
        redirect: false,
        email,
        password,
      });

      if (result?.error) {
        setError("Invalid email or password");
      } else {
        router.replace("/dashboard");
        router.refresh();
      }
    } catch (error) {
      setError("An error occurred during sign in");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100">
      <div
        style={{
          maxWidth: "28rem",
          width: "100%",
          marginTop: "2rem",
          marginBottom: "2rem",
          padding: "2.5rem",
          borderRadius: "0.75rem",
          backgroundColor: "white",
          boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)",
        }}
      >
        <div style={{ textAlign: "center", marginBottom: "2rem" }}>
          <h1
            style={{
              fontSize: "2.25rem",
              fontWeight: "700",
              color: "#1a202c",
              marginBottom: "0.5rem",
            }}
          >
            Log in
          </h1>
        </div>

        {error && (
          <div
            style={{
              backgroundColor: "#FEF2F2",
              borderColor: "#FECACA",
              borderWidth: "1px",
              borderRadius: "0.5rem",
              padding: "1rem",
              color: "#B91C1C",
              fontSize: "0.875rem",
              marginBottom: "1.5rem",
            }}
          >
            {error}
          </div>
        )}

        <form style={{ marginTop: "2.5rem" }} onSubmit={handleSubmit}>
          <div style={{ marginBottom: "1.5rem" }}>
            <div style={{ marginBottom: "1.5rem" }}>
              <label
                htmlFor="email"
                style={{
                  display: "block",
                  fontSize: "0.875rem",
                  fontWeight: "500",
                  color: "#4B5563",
                  marginBottom: "0.5rem",
                  marginLeft: "0.25rem",
                }}
              >
                Email address
              </label>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                style={{
                  width: "90%",
                  borderRadius: "0.5rem",
                  border: "1px solid #D1D5DB",
                  padding: "0.75rem 1rem",
                  color: "#1F2937",
                  transition: "all 150ms ease",
                }}
                placeholder="Your email address"
              />
            </div>
            <div>
              <label
                htmlFor="password"
                style={{
                  display: "block",
                  fontSize: "0.875rem",
                  fontWeight: "500",
                  color: "#4B5563",
                  marginBottom: "0.5rem",
                  marginLeft: "0.25rem",
                }}
              >
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                style={{
                  width: "90%",
                  borderRadius: "0.5rem",
                  border: "1px solid #D1D5DB",
                  padding: "0.75rem 1rem",
                  color: "#1F2937",
                  transition: "all 150ms ease",
                }}
                placeholder="Your password"
              />
            </div>
          </div>

          <div style={{ marginTop: "2rem" }}>
            <button
              type="submit"
              disabled={isLoading}
              style={{
                width: "100%",
                display: "flex",
                justifyContent: "center",
                backgroundColor: "#000000",
                color: "#FFFFFF",
                borderRadius: "0.5rem",
                padding: "1rem 1.5rem",
                fontSize: "1rem",
                fontWeight: "600",
                border: "none",
                cursor: isLoading ? "not-allowed" : "pointer",
                opacity: isLoading ? 0.7 : 1,
                transition: "all 200ms ease",
              }}
            >
              {isLoading ? "Signing in..." : "Sign in"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
