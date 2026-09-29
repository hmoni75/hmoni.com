import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import ManageLayout from "@/layouts/ManageLayout";
import ManageLoginPage from "@/pages/ManageLoginPage";
import {
  HeroTileItem,
  INITIAL_HERO_TILES,
  getHeroTilesFromStorage,
} from "@/shared/sections/index-12/Section1";
import {
  fetchProjectsApi,
  createProjectApi,
  deleteProjectApi,
  fetchHeroTilesApi,
  saveHeroTileApi,
  deleteHeroTileApi,
  resetHeroTilesApi,
  fetchMessagesApi,
  deleteMessageApi,
  fetchSettingsApi,
  updateSettingsApi,
} from "@/services/api";

interface ProjectItem {
  id: number;
  title: string;
  category: string;
  location: string;
  size: string;
  service: string;
  link: string;
  img: string;
  status: string;
  featured: boolean;
}

interface MessageItem {
  id: number;
  name: string;
  email: string;
  phone: string;
  message: string;
  date: string;
  read: boolean;
  location: string;
}

interface ArticleItem {
  id: number;
  title: string;
  category: string;
  author: string;
  date: string;
  img: string;
}

// Real Initial Site Projects
const INITIAL_REAL_PROJECTS: ProjectItem[] = [
  {
    id: 1,
    title: "The Obsidian Coastal Villa",
    category: "Residential & Architecture",
    location: "Oslo, Norway",
    size: "12,400 Sq Ft",
    service: "Architecture & Interior",
    link: "/portfolio-details-1",
    img: "/assets/imgs/pages/home-13/sec-3-img-1.webp",
    status: "Published",
    featured: true,
  },
  {
    id: 2,
    title: "Atrium of Quiet Light",
    category: "Hospitality & Wellness",
    location: "Kyoto, Japan",
    size: "44,200 Sq Ft",
    service: "Master Planning",
    link: "/portfolio-details-1",
    img: "/assets/imgs/pages/home-13/sec-3-img-2.webp",
    status: "Published",
    featured: true,
  },
  {
    id: 3,
    title: "Stratum Cultural Pavilion",
    category: "Cultural & Civic",
    location: "Milan, Italy",
    size: "118,300 Sq Ft",
    service: "Architecture & Engineering",
    link: "/portfolio-details-1",
    img: "/assets/imgs/pages/home-13/sec-3-img-3.webp",
    status: "Published",
    featured: true,
  },
  {
    id: 4,
    title: "Lattice House",
    category: "Residential Infill",
    location: "New York, NY",
    size: "8,600 Sq Ft",
    service: "Facade Architecture",
    link: "/portfolio-details-1",
    img: "/assets/imgs/pages/home-13/sec-3-img-4.webp",
    status: "Published",
    featured: false,
  },
  {
    id: 5,
    title: "Noirform Denim Concept",
    category: "UI/UX & Branding",
    location: "Global Digital Studio",
    size: "Design System",
    service: "Creative Direction",
    link: "/portfolio-1",
    img: "/assets/imgs/pages/slideshow/img-1.webp",
    status: "Published",
    featured: true,
  },
];

// Real Initial Site Contact Inquiries
const INITIAL_REAL_MESSAGES: MessageItem[] = [
  {
    id: 101,
    name: "Tanvir Rahman",
    email: "tanvir.kuet@gmail.com",
    phone: "+880 1711 234567",
    message:
      "Hi H Moni, we are looking for a full-stack developer and UI designer for an IT Incubation project at KUET. Could you share your availability?",
    date: "Today, 3:45 PM",
    read: false,
    location: "Khulna, Bangladesh",
  },
  {
    id: 102,
    name: "Sarah Jenkins",
    email: "sarah@techcorp.io",
    phone: "+1 (212) 555-0199",
    message:
      "Hello! We loved the Obsidian Coastal Villa and Noirform Denim projects on your site. We want to hire you for a custom React & Next.js SaaS portal.",
    date: "Yesterday, 11:20 AM",
    read: true,
    location: "New York, USA",
  },
  {
    id: 103,
    name: "Nusrat Jahan",
    email: "nusrat@studio-design.bd",
    phone: "+880 1822 987654",
    message:
      "Assalamu Alaikum H Moni, I saw your portfolio at hello@hmoni.com. We need motion graphics and brand strategy consultation for our startup.",
    date: "Sep 25, 2026",
    read: true,
    location: "Dhaka, Bangladesh",
  },
];

// Real Initial Site Articles
const INITIAL_REAL_ARTICLES: ArticleItem[] = [
  {
    id: 201,
    title: "Designing Digital Experiences That Connect Brands and People",
    category: "UI / UX Design",
    author: "H Moni",
    date: "July 3, 2026",
    img: "/assets/imgs/pages/img-201.webp",
  },
  {
    id: 202,
    title: "From Concept to Launch: Building Products That Truly Matter",
    category: "Product Engineering",
    author: "H Moni",
    date: "July 8, 2026",
    img: "/assets/imgs/pages/img-202.webp",
  },
];

export default function ManagePage() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [activeTab, setActiveTab] = useState("overview");

  // Load persisted projects or default real data
  const [projects, setProjects] = useState<ProjectItem[]>(() => {
    const saved = localStorage.getItem("hmoni_manage_projects");
    return saved ? JSON.parse(saved) : INITIAL_REAL_PROJECTS;
  });

  // Load persisted messages or default real data
  const [messages, setMessages] = useState<MessageItem[]>(() => {
    const saved = localStorage.getItem("hmoni_manage_messages");
    return saved ? JSON.parse(saved) : INITIAL_REAL_MESSAGES;
  });

  // Load persisted articles
  const [articles] = useState<ArticleItem[]>(() => {
    const saved = localStorage.getItem("hmoni_manage_articles");
    return saved ? JSON.parse(saved) : INITIAL_REAL_ARTICLES;
  });

  // Load persisted site settings
  const [siteSettings, setSiteSettings] = useState(() => {
    const saved = localStorage.getItem("hmoni_manage_settings");
    return saved
      ? JSON.parse(saved)
      : {
          brandName: "H Moni",
          contactEmail: "hello@hmoni.com",
          officeAddress:
            "IT Incubation & Training Center KUET, Khulna - 9203, Bangladesh",
          studioAddress: "H Moni Digital Studio, Khulna - 9203, Bangladesh",
          workingHours: "Mo - Sa (9am - 5pm)",
          metaTitle:
            "H Moni — Creative Designer, Full-Stack Engineer & Digital Studio",
          metaKeywords:
            "H Moni, H Moni Portfolio, H Moni UI UX Designer, H Moni Full Stack Developer, KUET IT Incubation",
        };
  });

  // Hero Slider Tiles State & Persistence
  const [heroTiles, setHeroTiles] = useState<HeroTileItem[]>(
    getHeroTilesFromStorage,
  );
  const [newTile, setNewTile] = useState({
    title: "",
    img: "",
    mod: "brand-1",
  });
  const [editingTile, setEditingTile] = useState<HeroTileItem | null>(null);

  useEffect(() => {
    localStorage.setItem("hmoni_manage_hero_tiles", JSON.stringify(heroTiles));
    window.dispatchEvent(new Event("hmoni_hero_tiles_updated"));
  }, [heroTiles]);

  // New Project Form State
  const [newProject, setNewProject] = useState({
    title: "",
    category: "UI/UX & Branding",
    location: "Khulna, Bangladesh",
    size: "Custom Web App",
    service: "Full-Stack Engineering",
  });

  useEffect(() => {
    const session = localStorage.getItem("hmoni_admin_logged_in");
    if (session === "true") {
      setIsLoggedIn(true);
    }

    // Sync live database data from API on mount
    fetchProjectsApi().then((data) => data.length && setProjects(data));
    fetchHeroTilesApi().then((data) => data.length && setHeroTiles(data));
    fetchMessagesApi().then((data) => data.length && setMessages(data));
    fetchSettingsApi().then((data) => {
      if (Object.keys(data).length) {
        setSiteSettings((prev: typeof siteSettings) => ({ ...prev, ...data }));
      }
    });
  }, []);

  useEffect(() => {
    localStorage.setItem("hmoni_manage_projects", JSON.stringify(projects));
  }, [projects]);

  useEffect(() => {
    localStorage.setItem("hmoni_manage_messages", JSON.stringify(messages));
  }, [messages]);

  useEffect(() => {
    localStorage.setItem("hmoni_manage_settings", JSON.stringify(siteSettings));
  }, [siteSettings]);

  const handleAddHeroTile = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTile.img.trim()) {
      alert("Please provide an image URL or choose a photo file.");
      return;
    }
    const tile: HeroTileItem = {
      id: Date.now(),
      title: newTile.title || `Photo ${heroTiles.length + 1}`,
      img: newTile.img,
      mod: newTile.mod,
    };
    setHeroTiles([...heroTiles, tile]);
    saveHeroTileApi(tile);
    setNewTile({ title: "", img: "", mod: "brand-1" });
  };

  const handleDeleteHeroTile = async (id: number) => {
    if (
      window.confirm(
        "Are you sure you want to delete this photo from the hero slider?",
      )
    ) {
      setHeroTiles(heroTiles.filter((t) => t.id !== id));
      deleteHeroTileApi(id);
    }
  };

  const handleResetHeroTiles = async () => {
    if (window.confirm("Restore default hero slider photos?")) {
      setHeroTiles(INITIAL_HERO_TILES);
      resetHeroTilesApi();
    }
  };

  const handleFileUpload = (
    e: React.ChangeEvent<HTMLInputElement>,
    isEdit = false,
  ) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onloadend = () => {
      const result = reader.result as string;
      if (isEdit && editingTile) {
        setEditingTile({ ...editingTile, img: result });
      } else {
        setNewTile((prev) => ({ ...prev, img: result }));
      }
    };
    reader.readAsDataURL(file);
  };

  const handleLogout = () => {
    localStorage.removeItem("hmoni_admin_logged_in");
    localStorage.removeItem("hmoni_admin_user");
    setIsLoggedIn(false);
  };

  const handleAddProject = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newProject.title.trim()) return;
    const project: ProjectItem = {
      id: Date.now(),
      title: newProject.title,
      category: newProject.category,
      location: newProject.location,
      size: newProject.size,
      service: newProject.service,
      link: "/portfolio-details-1",
      img: "/assets/imgs/pages/home-13/sec-3-img-1.webp",
      status: "Published",
      featured: true,
    };
    setProjects([project, ...projects]);
    createProjectApi(project);
    setNewProject({
      title: "",
      category: "UI/UX & Branding",
      location: "Khulna, Bangladesh",
      size: "Custom Web App",
      service: "Full-Stack Engineering",
    });
  };

  const handleDeleteProject = async (id: number) => {
    if (window.confirm("Are you sure you want to delete this project?")) {
      setProjects(projects.filter((p: ProjectItem) => p.id !== id));
      deleteProjectApi(id);
    }
  };

  const handleDeleteMessage = async (id: number) => {
    setMessages(messages.filter((m: MessageItem) => m.id !== id));
    deleteMessageApi(id);
  };

  const handleSettingsSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    updateSettingsApi(siteSettings);
    alert("Site Settings & Metadata updated successfully!");
  };

  if (!isLoggedIn) {
    return <ManageLoginPage onLoginSuccess={() => setIsLoggedIn(true)} />;
  }

  return (
    <ManageLayout
      activeTab={activeTab}
      setActiveTab={setActiveTab}
      onLogout={handleLogout}
    >
      {/* TAB 1: OVERVIEW */}
      {activeTab === "overview" && (
        <div className="manage-overview">
          <div className="d-flex flex-wrap justify-content-between align-items-center gap-3 mb-4">
            <div>
              <h2 className="fw-700 text-slate-900 mb-1">
                Welcome back, H Moni 👋
              </h2>
              <p className="text-slate-500 mb-0 fz-14">
                Live control panel for H Moni Digital Studio & Portfolio.
              </p>
            </div>
            <div className="d-flex gap-2">
              <button
                type="button"
                onClick={() => setActiveTab("projects")}
                className="btn text-white px-4 py-2 rounded-3 fw-600 border-0 shadow-sm"
                style={{ backgroundColor: "#F0460E" }}
              >
                + Add Project
              </button>
              <button
                type="button"
                onClick={() => setActiveTab("hero-slider")}
                className="btn btn-outline-secondary bg-white text-slate-700 px-4 py-2 rounded-3 fw-600"
                style={{ borderColor: "#cbd5e1" }}
              >
                Hero Slider 🖼️
              </button>
            </div>
          </div>

          {/* Quick Stats Grid */}
          <div className="row g-3 mb-4">
            <div className="col-md-3">
              <div
                className="p-4 rounded-4 border bg-white shadow-sm"
                style={{ borderColor: "#cbd5e1" }}
              >
                <div className="fz-12 text-slate-500 fw-700 text-uppercase tracking-wider mb-2">
                  Total Projects
                </div>
                <div className="fs-2 fw-700 text-slate-900 mb-1">
                  {projects.length}
                </div>
                <div className="fz-12 text-success fw-600">
                  ● Published Live
                </div>
              </div>
            </div>

            <div className="col-md-3">
              <div
                className="p-4 rounded-4 border bg-white shadow-sm"
                style={{ borderColor: "#cbd5e1" }}
              >
                <div className="fz-12 text-slate-500 fw-700 text-uppercase tracking-wider mb-2">
                  Hero Photos
                </div>
                <div className="fs-2 fw-700 text-slate-900 mb-1">
                  {heroTiles.length}
                </div>
                <div className="fz-12 text-primary fw-600">
                  ● Running Slider
                </div>
              </div>
            </div>

            <div className="col-md-3">
              <div
                className="p-4 rounded-4 border bg-white shadow-sm"
                style={{ borderColor: "#cbd5e1" }}
              >
                <div className="fz-12 text-slate-500 fw-700 text-uppercase tracking-wider mb-2">
                  Contact Inquiries
                </div>
                <div className="fs-2 fw-700 text-slate-900 mb-1">
                  {messages.length}
                </div>
                <div className="fz-12 text-warning fw-600">
                  ● {messages.filter((m) => !m.read).length} Unread
                </div>
              </div>
            </div>

            <div className="col-md-3">
              <div
                className="p-4 rounded-4 border bg-white shadow-sm"
                style={{ borderColor: "#cbd5e1" }}
              >
                <div className="fz-12 text-slate-500 fw-700 text-uppercase tracking-wider mb-2">
                  System Status
                </div>
                <div className="fs-2 fw-700 text-success mb-1">100%</div>
                <div className="fz-12 text-slate-500 fw-600">
                  Vercel Ready & Active
                </div>
              </div>
            </div>
          </div>

          {/* Recent Inquiries Preview */}
          <div
            className="rounded-4 p-4 border bg-white shadow-sm mb-4"
            style={{ borderColor: "#cbd5e1" }}
          >
            <div className="d-flex justify-content-between align-items-center mb-3">
              <h4 className="fw-700 text-slate-900 mb-0 fz-18">
                Recent Inquiries & Leads
              </h4>
              <button
                type="button"
                onClick={() => setActiveTab("messages")}
                className="btn btn-sm btn-outline-secondary bg-white text-slate-700 fz-12 fw-600"
                style={{ borderColor: "#cbd5e1" }}
              >
                View All Inbox 📬
              </button>
            </div>
            <div className="table-responsive">
              <table className="table table-hover align-middle mb-0">
                <thead className="bg-slate-50 border-bottom border-slate-200">
                  <tr className="text-slate-600 fz-13 fw-700">
                    <th className="py-2.5">Sender</th>
                    <th className="py-2.5">Email / Phone</th>
                    <th className="py-2.5">Location</th>
                    <th className="py-2.5">Received Date</th>
                  </tr>
                </thead>
                <tbody>
                  {messages.slice(0, 3).map((m) => (
                    <tr key={m.id} style={{ borderColor: "#e2e8f0" }}>
                      <td className="fw-600 text-slate-900 py-3">{m.name}</td>
                      <td className="text-slate-600 fz-13">{m.email}</td>
                      <td className="text-slate-500 fz-13">{m.location}</td>
                      <td className="text-slate-500 fz-13">{m.date}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Active Featured Works Preview */}
          <div
            className="rounded-4 p-4 border bg-white shadow-sm"
            style={{ borderColor: "#cbd5e1" }}
          >
            <div className="d-flex justify-content-between align-items-center mb-3">
              <h4 className="fw-700 text-slate-900 mb-0 fz-18">
                Featured Portfolio Projects
              </h4>
              <button
                type="button"
                onClick={() => setActiveTab("projects")}
                className="btn btn-sm btn-outline-secondary bg-white text-slate-700 fz-12 fw-600"
                style={{ borderColor: "#cbd5e1" }}
              >
                Manage Works 💼
              </button>
            </div>
            <div className="row g-3">
              {projects.slice(0, 3).map((p) => (
                <div key={p.id} className="col-md-4">
                  <div
                    className="p-3 rounded-3 border bg-white h-100"
                    style={{ borderColor: "#cbd5e1" }}
                  >
                    <img
                      src={p.img}
                      alt={p.title}
                      className="w-100 rounded-2 mb-2 object-fit-cover"
                      style={{ height: "140px" }}
                    />
                    <h5 className="fw-700 text-slate-900 fz-15 mb-1">
                      {p.title}
                    </h5>
                    <div className="fz-12 text-slate-500 mb-2">
                      {p.category}
                    </div>
                    <span className="badge bg-slate-100 text-slate-700 border border-slate-200">
                      {p.location}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: PROJECTS MANAGER */}
      {activeTab === "projects" && (
        <div className="manage-projects">
          <div className="d-flex justify-content-between align-items-center mb-4">
            <div>
              <h2 className="fw-700 text-slate-900 mb-1">
                Portfolio Works Manager
              </h2>
              <p className="text-slate-500 mb-0 fz-14">
                Add, edit, and organize real site projects.
              </p>
            </div>
          </div>

          {/* Add New Project Card */}
          <div
            className="p-4 rounded-4 border bg-white shadow-sm mb-4"
            style={{ borderColor: "#cbd5e1" }}
          >
            <h4 className="fw-700 text-slate-900 mb-3 fz-18">
              Add New Project 💼
            </h4>
            <form onSubmit={handleAddProject} className="row g-3">
              <div className="col-md-4">
                <label className="form-label text-slate-700 fw-600 fz-13">
                  Project Title
                </label>
                <input
                  type="text"
                  className="form-control bg-white text-slate-900 border-slate-300 rounded-3 py-2"
                  style={{ borderColor: "#cbd5e1" }}
                  placeholder="e.g. Modern E-Commerce Platform"
                  value={newProject.title}
                  onChange={(e) =>
                    setNewProject({ ...newProject, title: e.target.value })
                  }
                  required
                />
              </div>
              <div className="col-md-3">
                <label className="form-label text-slate-700 fw-600 fz-13">
                  Category
                </label>
                <select
                  className="form-select bg-white text-slate-900 border-slate-300 rounded-3 py-2"
                  style={{ borderColor: "#cbd5e1" }}
                  value={newProject.category}
                  onChange={(e) =>
                    setNewProject({ ...newProject, category: e.target.value })
                  }
                >
                  <option value="UI/UX & Branding">UI/UX & Branding</option>
                  <option value="Full-Stack Web">Full-Stack Web</option>
                  <option value="Architecture & Interior">
                    Architecture & Interior
                  </option>
                  <option value="React & Next.js">React & Next.js</option>
                </select>
              </div>
              <div className="col-md-3">
                <label className="form-label text-slate-700 fw-600 fz-13">
                  Location
                </label>
                <input
                  type="text"
                  className="form-control bg-white text-slate-900 border-slate-300 rounded-3 py-2"
                  style={{ borderColor: "#cbd5e1" }}
                  placeholder="e.g. Khulna, Bangladesh"
                  value={newProject.location}
                  onChange={(e) =>
                    setNewProject({ ...newProject, location: e.target.value })
                  }
                />
              </div>
              <div className="col-md-2 d-flex align-items-end">
                <button
                  type="submit"
                  className="btn w-100 py-2 rounded-3 fw-600 text-white border-0 shadow-sm"
                  style={{ backgroundColor: "#F0460E" }}
                >
                  + Add Project
                </button>
              </div>
            </form>
          </div>

          {/* Real Projects Table */}
          <div
            className="rounded-4 p-4 border bg-white shadow-sm"
            style={{ borderColor: "#cbd5e1" }}
          >
            <div className="table-responsive">
              <table className="table table-hover align-middle mb-0">
                <thead className="bg-slate-50 border-bottom border-slate-200">
                  <tr className="text-slate-600 fz-13 fw-700">
                    <th className="py-2.5">Preview</th>
                    <th className="py-2.5">Project Name</th>
                    <th className="py-2.5">Category</th>
                    <th className="py-2.5">Location</th>
                    <th className="py-2.5">Service</th>
                    <th className="py-2.5">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {projects.map((p: ProjectItem) => (
                    <tr key={p.id} style={{ borderColor: "#e2e8f0" }}>
                      <td>
                        <img
                          src={p.img}
                          alt={p.title}
                          width={48}
                          height={48}
                          className="rounded-2 object-fit-cover border border-slate-200"
                        />
                      </td>
                      <td className="fw-600 text-slate-900 py-3">{p.title}</td>
                      <td>
                        <span className="badge bg-slate-100 border border-slate-300 text-slate-700">
                          {p.category}
                        </span>
                      </td>
                      <td className="text-slate-600 fz-13">{p.location}</td>
                      <td className="text-slate-600 fz-13">{p.service}</td>
                      <td>
                        <button
                          type="button"
                          onClick={() => handleDeleteProject(p.id)}
                          className="btn btn-sm btn-outline-danger border-0"
                        >
                          Remove 🗑️
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* TAB: HERO SLIDER PHOTOS */}
      {activeTab === "hero-slider" && (
        <div className="manage-hero-slider">
          <div className="d-flex flex-wrap justify-content-between align-items-center gap-3 mb-4">
            <div>
              <h2 className="fw-700 text-slate-900 mb-1">
                Hero Slider Photos 🖼️
              </h2>
              <p className="text-slate-500 mb-0 fz-14">
                Add, update, or remove the running photos in the homepage Hero
                section.
              </p>
            </div>
            <div className="d-flex gap-2">
              <button
                type="button"
                onClick={handleResetHeroTiles}
                className="btn btn-outline-secondary bg-white text-slate-700 rounded-3 fz-13 fw-600"
                style={{ borderColor: "#cbd5e1" }}
              >
                Reset Default Photos 🔄
              </button>
              <Link
                to="/"
                target="_blank"
                className="btn text-white rounded-3 fz-13 text-decoration-none fw-600 shadow-sm"
                style={{ backgroundColor: "#F0460E" }}
              >
                View Live Site ↗
              </Link>
            </div>
          </div>

          {/* Add New Hero Photo Card */}
          <div
            className="p-4 rounded-4 border bg-white shadow-sm mb-4"
            style={{ borderColor: "#cbd5e1" }}
          >
            <h4 className="fw-700 text-slate-900 mb-3 fz-18">
              Add New Hero Photo ➕
            </h4>
            <form onSubmit={handleAddHeroTile} className="row g-3">
              <div className="col-md-4">
                <label className="form-label text-slate-700 fw-600 fz-13">
                  Photo Title / Label
                </label>
                <input
                  type="text"
                  className="form-control bg-white text-slate-900 border-slate-300 rounded-3 py-2"
                  style={{ borderColor: "#cbd5e1" }}
                  placeholder="e.g. Brand Identity Showcase"
                  value={newTile.title}
                  onChange={(e) =>
                    setNewTile({ ...newTile, title: e.target.value })
                  }
                />
              </div>

              <div className="col-md-5">
                <label className="form-label text-slate-700 fw-600 fz-13">
                  Image File / URL
                </label>
                <div className="input-group">
                  <input
                    type="text"
                    className="form-control bg-white text-slate-900 border-slate-300 rounded-start-3 py-2"
                    style={{ borderColor: "#cbd5e1" }}
                    placeholder="Enter image URL or upload..."
                    value={newTile.img}
                    onChange={(e) =>
                      setNewTile({ ...newTile, img: e.target.value })
                    }
                  />
                  <input
                    type="file"
                    id="newTileFile"
                    className="d-none"
                    accept="image/*"
                    onChange={(e) => handleFileUpload(e, false)}
                  />
                  <label
                    htmlFor="newTileFile"
                    className="btn btn-outline-secondary text-slate-700 mb-0 d-flex align-items-center rounded-end-3 bg-slate-50"
                    style={{ borderColor: "#cbd5e1", cursor: "pointer" }}
                  >
                    Upload 📁
                  </label>
                </div>
              </div>

              <div className="col-md-3">
                <label className="form-label text-slate-700 fw-600 fz-13">
                  Tile Style Variant
                </label>
                <select
                  className="form-select bg-white text-slate-900 border-slate-300 rounded-3 py-2"
                  style={{ borderColor: "#cbd5e1" }}
                  value={newTile.mod}
                  onChange={(e) =>
                    setNewTile({ ...newTile, mod: e.target.value })
                  }
                >
                  <option value="brand-1">Brand Style 1</option>
                  <option value="brand-2">Brand Style 2</option>
                  <option value="neutral-100">Light Style</option>
                  <option value="neutral-300">Gray Style</option>
                  <option value="neutral-800">Dark Style</option>
                </select>
              </div>

              {/* Preview Thumbnail */}
              {newTile.img && (
                <div className="col-12 mt-2">
                  <div className="d-flex align-items-center gap-3">
                    <span className="text-slate-500 fz-12">Preview:</span>
                    <img
                      src={
                        newTile.img.startsWith("http") ||
                        newTile.img.startsWith("data:") ||
                        newTile.img.startsWith("/")
                          ? newTile.img
                          : `/assets/imgs/pages/home-12/${newTile.img}`
                      }
                      alt="Preview"
                      width={90}
                      height={60}
                      className="rounded border border-slate-300 object-fit-cover shadow-sm"
                    />
                  </div>
                </div>
              )}

              <div className="col-12 mt-3">
                <button
                  type="submit"
                  className="btn text-white px-4 py-2 rounded-3 fw-600 border-0 shadow-sm"
                  style={{ backgroundColor: "#F0460E" }}
                >
                  Add Photo to Hero Slider 🚀
                </button>
              </div>
            </form>
          </div>

          {/* Current Hero Photos Grid */}
          <h4 className="fw-700 text-slate-900 mb-3 fz-18">
            Active Hero Photos ({heroTiles.length})
          </h4>
          <div className="row g-3">
            {heroTiles.map((tile, idx) => {
              const imgSrc =
                tile.img.startsWith("http") ||
                tile.img.startsWith("data:") ||
                tile.img.startsWith("/")
                  ? tile.img
                  : `/assets/imgs/pages/home-12/${tile.img}`;
              return (
                <div key={tile.id} className="col-md-4 col-lg-3">
                  <div
                    className="p-3 rounded-4 border bg-white shadow-sm h-100 d-flex flex-column justify-content-between"
                    style={{ borderColor: "#cbd5e1" }}
                  >
                    <div>
                      <div
                        className="position-relative mb-2 rounded overflow-hidden border border-slate-200"
                        style={{ height: "140px" }}
                      >
                        <img
                          src={imgSrc}
                          alt={tile.title || `Photo ${idx + 1}`}
                          className="w-100 h-100 object-fit-cover"
                        />
                        <span className="position-absolute top-0 end-0 m-2 badge rounded-pill bg-white border border-slate-300 text-slate-800 fz-11 shadow-sm">
                          #{idx + 1} • {tile.mod}
                        </span>
                      </div>
                      <h5 className="fw-600 text-slate-900 fz-14 mb-1 text-truncate">
                        {tile.title || `Photo #${idx + 1}`}
                      </h5>
                      <p
                        className="text-slate-500 fz-11 mb-2 text-truncate"
                        title={tile.img}
                      >
                        {tile.img}
                      </p>
                    </div>

                    <div className="d-flex gap-2 mt-2 pt-2 border-top border-slate-200">
                      <button
                        type="button"
                        onClick={() => setEditingTile(tile)}
                        className="btn btn-sm btn-outline-secondary w-50 fz-12 fw-600"
                        style={{ borderColor: "#cbd5e1" }}
                      >
                        Edit ✏️
                      </button>
                      <button
                        type="button"
                        onClick={() => handleDeleteHeroTile(tile.id)}
                        className="btn btn-sm btn-outline-danger w-50 fz-12 fw-600"
                      >
                        Delete 🗑️
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Edit Hero Photo Modal */}
          {editingTile && (
            <div
              className="position-fixed top-0 start-0 w-100 h-100 d-flex align-items-center justify-content-center z-3"
              style={{
                backgroundColor: "rgba(15, 23, 42, 0.6)",
                backdropFilter: "blur(4px)",
              }}
            >
              <div
                className="p-4 rounded-4 border bg-white text-slate-900 shadow-lg"
                style={{
                  borderColor: "#cbd5e1",
                  width: "90%",
                  maxWidth: "550px",
                }}
              >
                <div className="d-flex justify-content-between align-items-center mb-3">
                  <h4 className="fw-700 mb-0">Edit Hero Photo ✏️</h4>
                  <button
                    type="button"
                    onClick={() => setEditingTile(null)}
                    className="btn-close"
                    aria-label="Close"
                  />
                </div>

                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    setHeroTiles(
                      heroTiles.map((t) =>
                        t.id === editingTile.id ? editingTile : t,
                      ),
                    );
                    setEditingTile(null);
                  }}
                  className="row g-3"
                >
                  <div className="col-12">
                    <label className="form-label text-slate-700 fw-600 fz-13">
                      Photo Title / Label
                    </label>
                    <input
                      type="text"
                      className="form-control bg-white text-slate-900 border-slate-300 rounded-3 py-2"
                      style={{ borderColor: "#cbd5e1" }}
                      value={editingTile.title || ""}
                      onChange={(e) =>
                        setEditingTile({
                          ...editingTile,
                          title: e.target.value,
                        })
                      }
                    />
                  </div>

                  <div className="col-12">
                    <label className="form-label text-slate-700 fw-600 fz-13">
                      Image File / URL
                    </label>
                    <div className="input-group">
                      <input
                        type="text"
                        className="form-control bg-white text-slate-900 border-slate-300 rounded-start-3 py-2"
                        style={{ borderColor: "#cbd5e1" }}
                        value={editingTile.img}
                        onChange={(e) =>
                          setEditingTile({
                            ...editingTile,
                            img: e.target.value,
                          })
                        }
                      />
                      <input
                        type="file"
                        id="editTileFile"
                        className="d-none"
                        accept="image/*"
                        onChange={(e) => handleFileUpload(e, true)}
                      />
                      <label
                        htmlFor="editTileFile"
                        className="btn btn-outline-secondary text-slate-700 mb-0 d-flex align-items-center rounded-end-3 bg-slate-50"
                        style={{ borderColor: "#cbd5e1", cursor: "pointer" }}
                      >
                        Upload 📁
                      </label>
                    </div>
                  </div>

                  <div className="col-12">
                    <label className="form-label text-slate-700 fw-600 fz-13">
                      Tile Style Variant
                    </label>
                    <select
                      className="form-select bg-white text-slate-900 border-slate-300 rounded-3 py-2"
                      style={{ borderColor: "#cbd5e1" }}
                      value={editingTile.mod}
                      onChange={(e) =>
                        setEditingTile({ ...editingTile, mod: e.target.value })
                      }
                    >
                      <option value="brand-1">Brand Style 1</option>
                      <option value="brand-2">Brand Style 2</option>
                      <option value="neutral-100">Light Style</option>
                      <option value="neutral-300">Gray Style</option>
                      <option value="neutral-800">Dark Style</option>
                    </select>
                  </div>

                  <div className="col-12 d-flex justify-content-end gap-2 mt-4">
                    <button
                      type="button"
                      onClick={() => setEditingTile(null)}
                      className="btn btn-outline-secondary text-slate-700 px-3 fw-600"
                      style={{ borderColor: "#cbd5e1" }}
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="btn text-white px-4 fw-600 border-0 shadow-sm"
                      style={{ backgroundColor: "#F0460E" }}
                    >
                      Save Changes
                    </button>
                  </div>
                </form>
              </div>
            </div>
          )}
        </div>
      )}

      {/* TAB 3: INQUIRIES & MESSAGES */}
      {activeTab === "messages" && (
        <div className="manage-messages">
          <div className="d-flex justify-content-between align-items-center mb-4">
            <div>
              <h2 className="fw-700 text-slate-900 mb-1">Inquiries Inbox</h2>
              <p className="text-slate-500 mb-0 fz-14">
                Messages submitted from the contact form targeting
                hello@hmoni.com
              </p>
            </div>
          </div>

          <div className="row g-3">
            {messages.map((m: MessageItem) => (
              <div key={m.id} className="col-12">
                <div
                  className="p-4 rounded-4 border bg-white shadow-sm"
                  style={{ borderColor: "#cbd5e1" }}
                >
                  <div className="d-flex flex-wrap justify-content-between align-items-center gap-2 mb-3">
                    <div>
                      <h5 className="fw-700 text-slate-900 mb-1">{m.name}</h5>
                      <span className="fz-13 text-primary fw-600 me-3">
                        📧 {m.email}
                      </span>
                      <span className="fz-13 text-slate-500 me-3">
                        📞 {m.phone}
                      </span>
                      <span className="fz-12 text-slate-400">
                        📍 {m.location}
                      </span>
                    </div>
                    <div className="d-flex align-items-center gap-2">
                      <span className="badge bg-slate-100 border border-slate-300 text-slate-700 fz-12">
                        {m.date}
                      </span>
                      <button
                        type="button"
                        onClick={() => handleDeleteMessage(m.id)}
                        className="btn btn-sm btn-outline-danger border-0"
                      >
                        Delete 🗑️
                      </button>
                    </div>
                  </div>
                  <div className="p-3 rounded-3 bg-slate-50 border border-slate-200 text-slate-800 fz-14">
                    "{m.message}"
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 4: SETTINGS */}
      {activeTab === "settings" && (
        <div className="manage-settings">
          <div className="d-flex justify-content-between align-items-center mb-4">
            <div>
              <h2 className="fw-700 text-slate-900 mb-1">
                Site Settings & Metadata
              </h2>
              <p className="text-slate-500 mb-0 fz-14">
                Update global branding, contact details, and SEO metadata.
              </p>
            </div>
          </div>

          <div
            className="p-4 rounded-4 border bg-white shadow-sm"
            style={{ borderColor: "#cbd5e1" }}
          >
            <form onSubmit={handleSettingsSubmit}>
              <div className="mb-3">
                <label className="form-label text-slate-700 fw-600 fz-14">
                  Brand Name
                </label>
                <input
                  type="text"
                  className="form-control bg-white text-slate-900 border-slate-300 rounded-3 py-2"
                  style={{ borderColor: "#cbd5e1" }}
                  value={siteSettings.brandName}
                  onChange={(e) =>
                    setSiteSettings({
                      ...siteSettings,
                      brandName: e.target.value,
                    })
                  }
                />
              </div>

              <div className="mb-3">
                <label className="form-label text-slate-700 fw-600 fz-14">
                  Contact Email
                </label>
                <input
                  type="email"
                  className="form-control bg-white text-slate-900 border-slate-300 rounded-3 py-2"
                  style={{ borderColor: "#cbd5e1" }}
                  value={siteSettings.contactEmail}
                  onChange={(e) =>
                    setSiteSettings({
                      ...siteSettings,
                      contactEmail: e.target.value,
                    })
                  }
                />
              </div>

              <div className="mb-3">
                <label className="form-label text-slate-700 fw-600 fz-14">
                  Primary Office Address
                </label>
                <input
                  type="text"
                  className="form-control bg-white text-slate-900 border-slate-300 rounded-3 py-2"
                  style={{ borderColor: "#cbd5e1" }}
                  value={siteSettings.officeAddress}
                  onChange={(e) =>
                    setSiteSettings({
                      ...siteSettings,
                      officeAddress: e.target.value,
                    })
                  }
                />
              </div>

              <div className="mb-3">
                <label className="form-label text-slate-700 fw-600 fz-14">
                  Digital Studio Address
                </label>
                <input
                  type="text"
                  className="form-control bg-white text-slate-900 border-slate-300 rounded-3 py-2"
                  style={{ borderColor: "#cbd5e1" }}
                  value={siteSettings.studioAddress}
                  onChange={(e) =>
                    setSiteSettings({
                      ...siteSettings,
                      studioAddress: e.target.value,
                    })
                  }
                />
              </div>

              <div className="mb-3">
                <label className="form-label text-slate-700 fw-600 fz-14">
                  SEO Title
                </label>
                <input
                  type="text"
                  className="form-control bg-white text-slate-900 border-slate-300 rounded-3 py-2"
                  style={{ borderColor: "#cbd5e1" }}
                  value={siteSettings.metaTitle}
                  onChange={(e) =>
                    setSiteSettings({
                      ...siteSettings,
                      metaTitle: e.target.value,
                    })
                  }
                />
              </div>

              <div className="mb-4">
                <label className="form-label text-slate-700 fw-600 fz-14">
                  SEO Keywords
                </label>
                <textarea
                  className="form-control bg-white text-slate-900 border-slate-300 rounded-3 py-2"
                  style={{ borderColor: "#cbd5e1" }}
                  rows={3}
                  value={siteSettings.metaKeywords}
                  onChange={(e) =>
                    setSiteSettings({
                      ...siteSettings,
                      metaKeywords: e.target.value,
                    })
                  }
                />
              </div>

              <button
                type="submit"
                className="btn text-white px-4 py-2 rounded-3 fw-600 border-0 shadow-sm"
                style={{ backgroundColor: "#F0460E" }}
              >
                Save Settings
              </button>
            </form>
          </div>
        </div>
      )}
    </ManageLayout>
  );
}
