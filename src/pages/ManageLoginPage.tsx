import React, { useState } from "react";
import { Link } from "react-router-dom";
import PageMeta from "@/seo/PageMeta";

interface ManageLoginPageProps {
  onLoginSuccess: () => void;
}

export default function ManageLoginPage({
  onLoginSuccess,
}: ManageLoginPageProps) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setErrorMsg("");

    setTimeout(() => {
      if (
        (username.toLowerCase() === "admin" ||
          username.toLowerCase() === "hmoni" ||
          username.toLowerCase() === "hello@hmoni.com") &&
        (password === "hmoni123" ||
          password === "admin123" ||
          password === "hmoni2026")
      ) {
        localStorage.setItem("hmoni_admin_logged_in", "true");
        localStorage.setItem("hmoni_admin_user", username);
        setIsLoading(false);
        onLoginSuccess();
      } else {
        setIsLoading(false);
        setErrorMsg(
          "Invalid username or password. (Default: admin / hmoni123)",
        );
      }
    }, 500);
  };

  return (
    <div
      className="min-vh-100 w-100 d-flex align-items-center justify-content-center p-3"
      style={{
        backgroundColor: "#09090b",
        color: "#f4f4f5",
        fontFamily: "DM Sans, system-ui, -apple-system, sans-serif",
      }}
    >
      <PageMeta title="H Moni — Admin Portal Login" />

      <div
        className="w-100 rounded-4 p-4 p-md-5 border shadow-lg position-relative"
        style={{
          maxWidth: "450px",
          backgroundColor: "#121316",
          borderColor: "#27272a",
          boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.8)",
        }}
      >
        <div className="text-center mb-4">
          <Link
            to="/"
            className="d-inline-flex align-items-center gap-2 mb-3 text-decoration-none"
          >
            <img
              src="/assets/imgs/template/logo/logo-d.svg"
              alt="H Moni"
              width={48}
              height={48}
            />
          </Link>
          <h3 className="fw-700 text-white mb-1">
            H Moni <span style={{ color: "#F0460E" }}>Admin</span>
          </h3>
          <p className="fz-14 text-secondary mb-0">
            Protected Management Control Panel
          </p>
        </div>

        {errorMsg && (
          <div
            className="alert p-3 rounded-3 fz-13 text-center mb-4 border-0"
            style={{
              backgroundColor: "rgba(220, 38, 38, 0.15)",
              color: "#ef4444",
            }}
          >
            ⚠️ {errorMsg}
          </div>
        )}

        <form onSubmit={handleLogin}>
          <div className="mb-3">
            <label className="form-label fz-13 fw-600 text-white mb-1">
              Username or Email
            </label>
            <input
              type="text"
              className="form-control bg-dark text-white border-secondary rounded-3 py-2 px-3 fz-14"
              style={{ backgroundColor: "#18181b", borderColor: "#3f3f46" }}
              placeholder="e.g. admin"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>

          <div className="mb-4 position-relative">
            <label className="form-label fz-13 fw-600 text-white mb-1">
              Password
            </label>
            <div className="position-relative">
              <input
                type={showPassword ? "text" : "password"}
                className="form-control bg-dark text-white border-secondary rounded-3 py-2 px-3 fz-14 pe-5"
                style={{ backgroundColor: "#18181b", borderColor: "#3f3f46" }}
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <button
                type="button"
                className="btn btn-sm btn-link text-secondary position-absolute top-50 end-0 translate-middle-y me-2 text-decoration-none fz-12"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? "Hide" : "Show"}
              </button>
            </div>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="btn w-100 py-3 rounded-3 fw-700 text-white border-0 transition-all"
            style={{ backgroundColor: "#F0460E", cursor: "pointer" }}
          >
            {isLoading ? "Signing in..." : "Login to Admin Dashboard"}
          </button>
        </form>

        <div className="mt-4 pt-3 border-top border-dark text-center fz-12 text-secondary">
          <span>Protected Route • H Moni Digital Studio</span>
          <div className="mt-1 text-muted">
            Demo Credentials: <strong className="text-white">admin</strong> /
            <strong className="text-white">hmoni123</strong>
          </div>
        </div>
      </div>
    </div>
  );
}
