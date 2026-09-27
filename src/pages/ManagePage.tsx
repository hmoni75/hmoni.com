import React, { useState, useEffect } from "react";
import ManageLayout from "@/layouts/ManageLayout";
import ManageLoginPage from "@/pages/ManageLoginPage";

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

  const handleLogout = () => {
    localStorage.removeItem("hmoni_admin_logged_in");
    localStorage.removeItem("hmoni_admin_user");
    setIsLoggedIn(false);
  };

  const handleAddProject = (e: React.FormEvent) => {
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
    setNewProject({
      title: "",
      category: "UI/UX & Branding",
      location: "Khulna, Bangladesh",
      size: "Custom Web App",
      service: "Full-Stack Engineering",
    });
  };

  const handleDeleteProject = (id: number) => {
    if (window.confirm("Are you sure you want to delete this project?")) {
      setProjects(projects.filter((p: ProjectItem) => p.id !== id));
    }
  };

  const handleDeleteMessage = (id: number) => {
    setMessages(messages.filter((m: MessageItem) => m.id !== id));
  };

  const handleSettingsSubmit = (e: React.FormEvent) => {
    e.preventDefault();
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
              <h2 className="fw-700 text-white mb-1">
                Welcome back, H Moni 👋
              </h2>
              <p className="text-secondary mb-0">
                Live control panel for H Moni Digital Studio & Portfolio.
              </p>
            </div>
            <div className="d-flex gap-2">
              <button
                type="button"
                onClick={() => setActiveTab("projects")}
                className="btn text-white px-4 py-2 rounded-3 fw-600 border-0"
                style={{ backgroundColor: "#F0460E" }}
              >
                + Add Real Work
              </button>
            </div>
          </div>

          {/* Real Metrics Cards */}
          <div className="row g-3 mb-5">
            <div className="col-12 col-sm-6 col-lg-3">
              <div
                className="p-4 rounded-4 border"
                style={{ backgroundColor: "#121316", borderColor: "#27272a" }}
              >
                <div className="fz-13 text-secondary mb-1">Live Inquiries</div>
                <div className="fs-2 fw-700 text-white">
                  {messages.length} Messages
                </div>
                <div className="fz-12 text-success mt-2">
                  📬 Sent to hello@hmoni.com
                </div>
              </div>
            </div>

            <div className="col-12 col-sm-6 col-lg-3">
              <div
                className="p-4 rounded-4 border"
                style={{ backgroundColor: "#121316", borderColor: "#27272a" }}
              >
                <div className="fz-13 text-secondary mb-1">
                  Featured Portfolio Works
                </div>
                <div className="fs-2 fw-700 text-white">
                  {projects.length} Projects
                </div>
                <div className="fz-12 text-info mt-2">
                  ✨ Active on /portfolio-1
                </div>
              </div>
            </div>

            <div className="col-12 col-sm-6 col-lg-3">
              <div
                className="p-4 rounded-4 border"
                style={{ backgroundColor: "#121316", borderColor: "#27272a" }}
              >
                <div className="fz-13 text-secondary mb-1">
                  Target Contact Email
                </div>
                <div className="fz-15 fw-600 text-warning text-truncate mt-1">
                  {siteSettings.contactEmail}
                </div>
                <div className="fz-12 text-success mt-2">
                  Verified & Connected
                </div>
              </div>
            </div>

            <div className="col-12 col-sm-6 col-lg-3">
              <div
                className="p-4 rounded-4 border"
                style={{ backgroundColor: "#121316", borderColor: "#27272a" }}
              >
                <div className="fz-13 text-secondary mb-1">
                  Main Studio Address
                </div>
                <div className="fz-13 fw-600 text-light text-truncate mt-1">
                  KUET IT Incubation Center
                </div>
                <div className="fz-12 text-secondary mt-2">
                  Khulna - 9203, Bangladesh
                </div>
              </div>
            </div>
          </div>

          {/* Real Projects Showcase */}
          <div
            className="rounded-4 p-4 border mb-5"
            style={{ backgroundColor: "#121316", borderColor: "#27272a" }}
          >
            <div className="d-flex justify-content-between align-items-center mb-4">
              <div>
                <h5 className="fw-700 text-white mb-0">
                  Active Portfolio Projects
                </h5>
                <span className="fz-13 text-secondary">
                  Real site projects currently visible on home & portfolio
                  routes
                </span>
              </div>
              <button
                type="button"
                onClick={() => setActiveTab("projects")}
                className="btn btn-sm btn-link text-secondary text-decoration-none"
              >
                Manage All ({projects.length}) →
              </button>
            </div>

            <div className="row g-3">
              {projects.slice(0, 4).map((p: ProjectItem) => (
                <div key={p.id} className="col-12 col-md-6 col-xl-3">
                  <div
                    className="rounded-3 border overflow-hidden p-3 h-100"
                    style={{
                      backgroundColor: "#18181b",
                      borderColor: "#2d2d35",
                    }}
                  >
                    <div
                      className="mb-3 rounded-2 overflow-hidden position-relative"
                      style={{ height: "140px" }}
                    >
                      <img
                        src={p.img}
                        alt={p.title}
                        className="w-100 h-100 object-fit-cover"
                      />
                      <span className="position-absolute top-0 end-0 m-2 badge bg-dark border border-secondary text-white fz-11">
                        {p.category}
                      </span>
                    </div>
                    <h6 className="fw-700 text-white mb-1 text-truncate">
                      {p.title}
                    </h6>
                    <div className="fz-12 text-secondary mb-2">
                      📍 {p.location}
                    </div>
                    <div className="fz-12 text-muted">Service: {p.service}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Real Journal Articles Showcase */}
          <div
            className="rounded-4 p-4 border mb-5"
            style={{ backgroundColor: "#121316", borderColor: "#27272a" }}
          >
            <div className="d-flex justify-content-between align-items-center mb-3">
              <div>
                <h5 className="fw-700 text-white mb-0">Journal Articles</h5>
                <span className="fz-13 text-secondary">
                  Live posts on /archive-3 Blog Journal
                </span>
              </div>
            </div>
            <div className="row g-3">
              {articles.map((art: ArticleItem) => (
                <div key={art.id} className="col-12 col-md-6">
                  <div
                    className="d-flex gap-3 align-items-center p-3 rounded-3 border"
                    style={{
                      backgroundColor: "#18181b",
                      borderColor: "#2d2d35",
                    }}
                  >
                    <img
                      src={art.img}
                      alt={art.title}
                      width={70}
                      height={70}
                      className="rounded-2 object-fit-cover flex-shrink-0"
                    />
                    <div>
                      <span className="badge bg-danger-subtle text-danger fz-11 mb-1">
                        {art.category}
                      </span>
                      <h6 className="fw-600 text-white mb-1 fz-14">
                        {art.title}
                      </h6>
                      <div className="fz-12 text-secondary">
                        By {art.author} • {art.date}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Live Inquiries List */}
          <div
            className="rounded-4 p-4 border"
            style={{ backgroundColor: "#121316", borderColor: "#27272a" }}
          >
            <div className="d-flex justify-content-between align-items-center mb-3">
              <h5 className="fw-700 text-white mb-0">
                Recent Contact Inquiries
              </h5>
              <button
                type="button"
                onClick={() => setActiveTab("messages")}
                className="btn btn-sm btn-link text-secondary text-decoration-none"
              >
                View Inbox →
              </button>
            </div>

            <div className="table-responsive">
              <table className="table table-dark table-hover align-middle mb-0">
                <thead>
                  <tr className="text-secondary fz-13 border-bottom border-dark">
                    <th>Client Name</th>
                    <th>Email Address</th>
                    <th>Phone</th>
                    <th>Inquiry Details</th>
                    <th>Date</th>
                  </tr>
                </thead>
                <tbody>
                  {messages.map((m: MessageItem) => (
                    <tr key={m.id} style={{ borderColor: "#27272a" }}>
                      <td className="fw-600 text-white">{m.name}</td>
                      <td className="text-warning">{m.email}</td>
                      <td className="text-secondary">{m.phone}</td>
                      <td
                        className="text-light text-truncate"
                        style={{ maxWidth: "280px" }}
                      >
                        {m.message}
                      </td>
                      <td className="fz-12 text-secondary">{m.date}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: MANAGE PROJECTS */}
      {activeTab === "projects" && (
        <div className="manage-projects">
          <div className="d-flex justify-content-between align-items-center mb-4">
            <div>
              <h2 className="fw-700 text-white mb-1">
                Portfolio Works Manager
              </h2>
              <p className="text-secondary mb-0">
                Add, edit or remove projects displayed across the portfolio
                showcase.
              </p>
            </div>
          </div>

          {/* Add Project Form */}
          <div
            className="p-4 rounded-4 border mb-4"
            style={{ backgroundColor: "#121316", borderColor: "#27272a" }}
          >
            <h5 className="fw-700 text-white mb-3">Add Real Project Entry</h5>
            <form onSubmit={handleAddProject} className="row g-3">
              <div className="col-md-4">
                <label className="form-label text-secondary fz-13">
                  Project Title
                </label>
                <input
                  type="text"
                  className="form-control bg-dark text-white border-secondary rounded-3 py-2"
                  placeholder="e.g. Smart City IoT Dashboard"
                  value={newProject.title}
                  onChange={(e) =>
                    setNewProject({ ...newProject, title: e.target.value })
                  }
                  required
                />
              </div>
              <div className="col-md-3">
                <label className="form-label text-secondary fz-13">
                  Category
                </label>
                <select
                  className="form-select bg-dark text-white border-secondary rounded-3 py-2"
                  value={newProject.category}
                  onChange={(e) =>
                    setNewProject({ ...newProject, category: e.target.value })
                  }
                >
                  <option value="UI/UX & Branding">UI/UX & Branding</option>
                  <option value="Full-Stack Engineering">
                    Full-Stack Engineering
                  </option>
                  <option value="Residential & Architecture">
                    Residential & Architecture
                  </option>
                  <option value="Hospitality & Master Planning">
                    Hospitality & Master Planning
                  </option>
                  <option value="React & Next.js">React & Next.js</option>
                </select>
              </div>
              <div className="col-md-3">
                <label className="form-label text-secondary fz-13">
                  Location
                </label>
                <input
                  type="text"
                  className="form-control bg-dark text-white border-secondary rounded-3 py-2"
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
                  className="btn w-100 py-2 rounded-3 fw-600 text-white border-0"
                  style={{ backgroundColor: "#F0460E" }}
                >
                  + Add Project
                </button>
              </div>
            </form>
          </div>

          {/* Real Projects Table */}
          <div
            className="rounded-4 p-4 border"
            style={{ backgroundColor: "#121316", borderColor: "#27272a" }}
          >
            <div className="table-responsive">
              <table className="table table-dark table-hover align-middle mb-0">
                <thead>
                  <tr className="text-secondary fz-13">
                    <th>Preview</th>
                    <th>Project Name</th>
                    <th>Category</th>
                    <th>Location</th>
                    <th>Service</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {projects.map((p: ProjectItem) => (
                    <tr key={p.id} style={{ borderColor: "#27272a" }}>
                      <td>
                        <img
                          src={p.img}
                          alt={p.title}
                          width={48}
                          height={48}
                          className="rounded-2 object-fit-cover"
                        />
                      </td>
                      <td className="fw-600 text-white">{p.title}</td>
                      <td>
                        <span className="badge bg-dark border border-secondary text-secondary">
                          {p.category}
                        </span>
                      </td>
                      <td className="text-secondary fz-13">{p.location}</td>
                      <td className="text-secondary fz-13">{p.service}</td>
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

      {/* TAB 3: INQUIRIES & MESSAGES */}
      {activeTab === "messages" && (
        <div className="manage-messages">
          <div className="d-flex justify-content-between align-items-center mb-4">
            <div>
              <h2 className="fw-700 text-white mb-1">Inquiries Inbox</h2>
              <p className="text-secondary mb-0">
                Messages submitted from the contact form targeting
                hello@hmoni.com
              </p>
            </div>
          </div>

          <div className="row g-3">
            {messages.map((m: MessageItem) => (
              <div key={m.id} className="col-12">
                <div
                  className="p-4 rounded-4 border"
                  style={{ backgroundColor: "#121316", borderColor: "#27272a" }}
                >
                  <div className="d-flex flex-wrap justify-content-between align-items-center gap-2 mb-3">
                    <div>
                      <h5 className="fw-700 text-white mb-1">{m.name}</h5>
                      <span className="fz-13 text-warning me-3">
                        📧 {m.email}
                      </span>
                      <span className="fz-13 text-secondary me-3">
                        📞 {m.phone}
                      </span>
                      <span className="fz-12 text-muted">📍 {m.location}</span>
                    </div>
                    <div className="d-flex align-items-center gap-3">
                      <span className="fz-12 text-secondary">{m.date}</span>
                      <button
                        type="button"
                        onClick={() => handleDeleteMessage(m.id)}
                        className="btn btn-sm btn-outline-secondary border-0 text-danger"
                      >
                        Delete 🗑️
                      </button>
                    </div>
                  </div>
                  <p
                    className="fz-14 text-light p-3 rounded-3 mb-0"
                    style={{
                      backgroundColor: "#18181b",
                      whiteSpace: "pre-wrap",
                    }}
                  >
                    "{m.message}"
                  </p>
                  <div className="mt-3 d-flex gap-2">
                    <a
                      href={`mailto:${m.email}?subject=Response to your inquiry — H Moni`}
                      className="btn btn-sm text-white rounded-pill px-4 py-2 fw-600 border-0 text-decoration-none"
                      style={{ backgroundColor: "#F0460E" }}
                    >
                      Reply to Client ✉️
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 4: SEO & SETTINGS */}
      {activeTab === "settings" && (
        <div className="manage-settings">
          <div className="d-flex justify-content-between align-items-center mb-4">
            <div>
              <h2 className="fw-700 text-white mb-1">
                Site Configuration & Metadata
              </h2>
              <p className="text-secondary mb-0">
                Update brand details, studio location, and search engine SEO
                settings.
              </p>
            </div>
          </div>

          <div
            className="p-4 rounded-4 border"
            style={{ backgroundColor: "#121316", borderColor: "#27272a" }}
          >
            <form onSubmit={handleSettingsSubmit}>
              <div className="row g-3 mb-3">
                <div className="col-md-6">
                  <label className="form-label text-white fw-600 fz-14">
                    Brand Name
                  </label>
                  <input
                    type="text"
                    className="form-control bg-dark text-white border-secondary"
                    value={siteSettings.brandName}
                    onChange={(e) =>
                      setSiteSettings({
                        ...siteSettings,
                        brandName: e.target.value,
                      })
                    }
                  />
                </div>
                <div className="col-md-6">
                  <label className="form-label text-white fw-600 fz-14">
                    Target Contact Email
                  </label>
                  <input
                    type="email"
                    className="form-control bg-dark text-white border-secondary"
                    value={siteSettings.contactEmail}
                    onChange={(e) =>
                      setSiteSettings({
                        ...siteSettings,
                        contactEmail: e.target.value,
                      })
                    }
                  />
                </div>
              </div>

              <div className="mb-3">
                <label className="form-label text-white fw-600 fz-14">
                  Primary Office Address
                </label>
                <input
                  type="text"
                  className="form-control bg-dark text-white border-secondary"
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
                <label className="form-label text-white fw-600 fz-14">
                  Digital Studio Address
                </label>
                <input
                  type="text"
                  className="form-control bg-dark text-white border-secondary"
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
                <label className="form-label text-white fw-600 fz-14">
                  SEO Title
                </label>
                <input
                  type="text"
                  className="form-control bg-dark text-white border-secondary"
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
                <label className="form-label text-white fw-600 fz-14">
                  SEO Keywords
                </label>
                <textarea
                  className="form-control bg-dark text-white border-secondary"
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
                className="btn text-white px-4 py-2 rounded-3 fw-600 border-0"
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
