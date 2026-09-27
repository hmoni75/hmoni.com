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
    { id: "messages", label: "Inquiries & Messages", icon: "📬" },
    { id: "settings", label: "SEO & Settings", icon: "⚙️" },
  ];

  return (
    <div
      className="manage-dashboard-wrapper vh-100 w-100 d-flex overflow-hidden"
      style={{
        height: "100vh",
        backgroundColor: "#09090b",
        color: "#f4f4f5",
        fontFamily: "DM Sans, system-ui, -apple-system, sans-serif",
      }}
    >
      <PageMeta title="H Moni — Admin Management Dashboard" />

      {/* Left Admin Sidebar — Fixed Left, ZERO Top Header & ZERO Bottom Footer */}
      <aside
        className={`manage-sidebar p-3 border-end flex-shrink-0 d-flex flex-column justify-content-between ${
          sidebarOpen
            ? "d-block position-absolute top-0 start-0 z-3 h-100 shadow-lg"
            : "d-none d-md-flex"
        }`}
        style={{
          width: "270px",
          height: "100vh",
          backgroundColor: "#121316",
          borderColor: "rgba(255, 255, 255, 0.1)",
          overflowY: "auto",
        }}
      >
        <div>
          {/* Brand Logo inside Sidebar */}
          <div className="pb-3 mb-3 border-bottom border-secondary border-opacity-25 d-flex align-items-center justify-content-between">
            <Link
              to="/manage"
              className="d-flex align-items-center gap-2 text-decoration-none"
            >
              <img
                src="/assets/imgs/template/logo/logo-d.svg"
                alt="H Moni"
                width={36}
                height={36}
              />
              <span className="fw-700 fs-5 text-white tracking-wide">
                H Moni <span style={{ color: "#F0460E" }}>Admin</span>
              </span>
            </Link>
          </div>

          {/* Admin User Info Card */}
          <div className="p-2 mb-3 rounded-3 bg-dark border border-secondary border-opacity-25 d-flex align-items-center justify-content-between">
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
                <div className="fw-700 fz-13 text-white">H Moni</div>
                <div className="fz-11 text-success">Online</div>
              </div>
            </div>
            <Link
              to="/"
              target="_blank"
              className="btn btn-sm btn-outline-light rounded-2 px-2 py-1 fz-11 text-decoration-none"
              title="View Live Site"
            >
              Site ↗
            </Link>
          </div>

          {/* Navigation Menu */}
          <div className="mb-2 px-1">
            <span className="text-uppercase fz-11 fw-700 tracking-wider text-muted opacity-75">
              DASHBOARD MENU
            </span>
          </div>

          <nav className="nav nav-pills flex-column gap-2 mb-4">
            {menuItems.map((item) => (
              <button
                key={item.id}
                type="button"
                onClick={() => {
                  setActiveTab(item.id);
                  setSidebarOpen(false);
                }}
                className={`nav-link text-start rounded-3 px-3 py-2 fw-600 d-flex align-items-center gap-3 transition-all ${
                  activeTab === item.id ? "text-white" : "text-secondary"
                }`}
                style={{
                  backgroundColor:
                    activeTab === item.id ? "#F0460E" : "transparent",
                  color: activeTab === item.id ? "#ffffff" : "#a1a1aa",
                  border: "none",
                  cursor: "pointer",
                }}
              >
                <span className="fs-5">{item.icon}</span>
                <span>{item.label}</span>
              </button>
            ))}
          </nav>
        </div>

        {/* Footer of Sidebar */}
        <div className="mt-auto pt-3 border-top border-secondary border-opacity-25">
          <div
            className="p-3 rounded-3 border mb-3"
            style={{
              backgroundColor: "rgba(255, 255, 255, 0.04)",
              borderColor: "rgba(255, 255, 255, 0.08)",
            }}
          >
            <div className="fz-11 text-muted mb-1">System Security</div>
            <div className="d-flex align-items-center gap-2 fz-12 text-success fw-600">
              <span
                className="rounded-circle bg-success d-inline-block"
                style={{ width: "7px", height: "7px" }}
              ></span>
              Protected Mode
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

      {/* Main Content Body — ONLY THIS AREA SCROLLS, NO TOP HEADER & NO BOTTOM FOOTER */}
      <main
        className="flex-grow-1 p-3 p-md-4 p-lg-5 overflow-auto"
        style={{
          height: "100vh",
          overflowY: "auto",
          backgroundColor: "#09090b",
        }}
      >
        {/* Mobile Toggle Button */}
        <div className="d-md-none mb-3">
          <button
            type="button"
            className="btn btn-outline-secondary btn-sm text-white"
            onClick={() => setSidebarOpen(!sidebarOpen)}
          >
            ☰ Admin Menu
          </button>
        </div>

        {children}
      </main>
    </div>
  );
}
