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
        backgroundColor: "#f8fafc",
        color: "#0f172a",
        fontFamily: "DM Sans, system-ui, -apple-system, sans-serif",
      }}
    >
      <PageMeta title="H Moni — Admin Portal Login" />

      <div
        className="w-100 rounded-4 p-4 p-md-5 border position-relative"
        style={{
          maxWidth: "450px",
          backgroundColor: "#ffffff",
          borderColor: "#cbd5e1",
          boxShadow:
            "0 10px 25px -5px rgba(0, 0, 0, 0.05), 0 8px 10px -6px rgba(0, 0, 0, 0.01)",
        }}
      >
        <div className="text-center mb-4">
          <Link
            to="/"
            className="d-inline-flex align-items-center gap-2 mb-3 text-decoration-none"
          >
            <img
              src="/assets/imgs/template/logo/favicon.svg"
              alt="H Moni"
              width={48}
              height={48}
              style={{ filter: "none" }}
            />
          </Link>
          <h3 className="fw-700 text-slate-900 mb-1">
            H Moni <span style={{ color: "#F0460E" }}>Admin</span>
          </h3>
          <p className="fz-14 text-slate-500 mb-0">
            Protected Management Control Panel
          </p>
        </div>

        {errorMsg && (
          <div
            className="alert p-3 rounded-3 fz-13 text-center mb-4 border"
            style={{
              backgroundColor: "#fef2f2",
              borderColor: "#fca5a5",
              color: "#dc2626",
            }}
          >
            ⚠️ {errorMsg}
          </div>
        )}

        <form onSubmit={handleLogin}>
          <div className="mb-3">
            <label className="form-label fz-13 fw-600 text-slate-700 mb-1">
              Username or Email
            </label>
            <input
              type="text"
              className="form-control bg-white text-slate-900 rounded-3 py-2 px-3 fz-14"
              style={{ borderColor: "#cbd5e1" }}
              placeholder="e.g. admin"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>

          <div className="mb-4 position-relative">
            <label className="form-label fz-13 fw-600 text-slate-700 mb-1">
              Password
            </label>
            <div className="position-relative">
              <input
                type={showPassword ? "text" : "password"}
                className="form-control bg-white text-slate-900 rounded-3 py-2 px-3 fz-14 pe-5"
                style={{ borderColor: "#cbd5e1" }}
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <button
                type="button"
                className="btn btn-sm btn-link text-slate-500 position-absolute top-50 end-0 translate-middle-y me-2 text-decoration-none fz-12"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? "Hide" : "Show"}
              </button>
            </div>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="btn w-100 py-3 rounded-3 fw-700 text-white border-0 transition-all shadow-sm"
            style={{ backgroundColor: "#F0460E", cursor: "pointer" }}
          >
            {isLoading ? "Signing in..." : "Login to Admin Dashboard"}
          </button>
        </form>

        <div className="mt-4 pt-3 border-top border-slate-200 text-center fz-12 text-slate-500">
          <span>Protected Route • H Moni Digital Studio</span>
          <div className="mt-1 text-slate-600">
            Demo Credentials: <strong className="text-slate-900">admin</strong>{" "}
            / <strong className="text-slate-900">hmoni123</strong>
          </div>
        </div>
      </div>
    </div>
  );
}
