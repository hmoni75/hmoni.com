import React, { useState } from "react";
import { Link } from "react-router-dom";
import PageMeta from "@/seo/PageMeta";

interface ManageLayoutProps {
  children?: React.ReactNode;
  activeTab: string;
  setActiveTab: (tab: string) => void;
  onLogout: () => void;
}

export default function ManageLayout({
  children,
  activeTab,
  setActiveTab,
  onLogout,
}: ManageLayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const menuItems = [
    { id: "overview", label: "Overview", icon: "📊" },
    { id: "projects", label: "Manage Projects", icon: "💼" },
    { id: "hero-slider", label: "Hero Photos Slider", icon: "🖼️" },
    { id: "messages", label: "Inquiries & Messages", icon: "📬" },
    { id: "settings", label: "SEO & Settings", icon: "⚙️" },
  ];

  return (
    <div
      className="manage-dashboard-wrapper vh-100 w-100 d-flex overflow-hidden"
      style={{
        height: "100vh",
        backgroundColor: "#f8fafc",
        color: "#0f172a",
        fontFamily: "DM Sans, system-ui, -apple-system, sans-serif",
      }}
    >
      <PageMeta title="H Moni — Admin Management Dashboard" />

      {/* Left Admin Sidebar — Fixed Left (White Mode with Clean Borders) */}
      <aside
        className={`manage-sidebar p-3 border-end flex-shrink-0 d-flex flex-column justify-content-between ${
          sidebarOpen
            ? "d-block position-absolute top-0 start-0 z-3 h-100 shadow-lg"
            : "d-none d-md-flex"
        }`}
        style={{
          width: "270px",
          height: "100vh",
          backgroundColor: "#ffffff",
          borderColor: "#e2e8f0",
          overflowY: "auto",
        }}
      >
        <div>
          {/* Brand Logo inside Sidebar */}
          <div className="pb-3 mb-3 border-bottom border-slate-200 d-flex align-items-center justify-content-between">
            <Link
              to="/manage"
              className="d-flex align-items-center gap-2 text-decoration-none"
            >
              <img
                src="/assets/imgs/template/logo/favicon.svg"
                alt="H Moni"
                width={32}
                height={32}
                style={{ filter: "none" }}
              />
              <span className="fw-700 fs-5 text-slate-900 tracking-wide">
                H Moni <span style={{ color: "#F0460E" }}>Admin</span>
              </span>
            </Link>
          </div>

          {/* Admin User Info Card */}
          <div className="p-2.5 mb-3 rounded-3 bg-slate-50 border border-slate-200 d-flex align-items-center justify-content-between">
            <div className="d-flex align-items-center gap-2">
              <div
                className="rounded-circle d-flex align-items-center justify-content-center text-white fw-700 fz-12"
                style={{
                  width: "32px",
                  height: "32px",
                  backgroundColor: "#F0460E",
                }}
              >
                HM
              </div>
              <div>
                <div className="fw-700 fz-13 text-slate-900">H Moni</div>
                <div className="fz-11 text-success fw-600">● Online</div>
              </div>
            </div>
            <Link
              to="/"
              target="_blank"
              className="btn btn-sm btn-outline-secondary rounded-2 px-2 py-1 fz-11 text-decoration-none fw-600"
              title="View Live Site"
            >
              Site ↗
            </Link>
          </div>

          {/* Navigation Menu */}
          <div className="mb-2 px-1">
            <span className="text-uppercase fz-11 fw-700 tracking-wider text-slate-400">
              DASHBOARD MENU
            </span>
          </div>

          <nav className="nav nav-pills flex-column gap-2 mb-4">
            {menuItems.map((item) => {
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => {
                    setActiveTab(item.id);
                    setSidebarOpen(false);
                  }}
                  className="nav-link text-start rounded-3 px-3 py-2.5 fw-600 d-flex align-items-center gap-3 transition-all"
                  style={{
                    backgroundColor: isActive ? "#F0460E" : "#ffffff",
                    color: isActive ? "#ffffff" : "#475569",
                    border: isActive
                      ? "1px solid #F0460E"
                      : "1px solid #e2e8f0",
                    boxShadow: isActive
                      ? "0 4px 6px -1px rgba(240, 70, 14, 0.2)"
                      : "none",
                    cursor: "pointer",
                  }}
                >
                  <span className="fs-5">{item.icon}</span>
                  <span>{item.label}</span>
                </button>
              );
            })}
          </nav>
        </div>

        {/* Footer of Sidebar */}
        <div className="mt-auto pt-3 border-top border-slate-200">
          <div
            className="p-3 rounded-3 border mb-3 bg-slate-50"
            style={{
              borderColor: "#cbd5e1",
            }}
          >
            <div className="fz-11 text-slate-500 mb-1">System Security</div>
            <div className="d-flex align-items-center gap-2 fz-12 text-success fw-700">
              <span
                className="rounded-circle bg-success d-inline-block"
                style={{ width: "7px", height: "7px" }}
              ></span>
              Protected White Mode
            </div>
          </div>

          <button
            type="button"
            onClick={onLogout}
            className="btn btn-danger w-100 py-2 rounded-3 fw-600 border-0 fz-13"
            style={{ backgroundColor: "#dc2626" }}
          >
            Logout Admin
          </button>
        </div>
      </aside>

      {/* Main Content Body (White Mode with Clean Borders) */}
      <main
        className="flex-grow-1 p-3 p-md-4 p-lg-5 overflow-auto"
        style={{
          height: "100vh",
          overflowY: "auto",
          backgroundColor: "#f8fafc",
          color: "#0f172a",
        }}
      >
        {/* Mobile Toggle Button */}
        <div className="d-md-none mb-3">
          <button
            type="button"
            className="btn btn-outline-secondary btn-sm text-slate-800 bg-white"
            onClick={() => setSidebarOpen(!sidebarOpen)}
          >
            ☰ Toggle Menu
          </button>
        </div>

        {children}
      </main>
    </div>
  );
}
