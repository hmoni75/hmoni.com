// Centralized REST API Service for MySQL Backend & Fallback

const API_BASE_URL = "https://hmoni.com/api";

export interface ProjectItem {
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

export interface HeroTileItem {
  id: number;
  img: string;
  mod: string;
  title?: string;
}

export interface MessageItem {
  id: number;
  name: string;
  email: string;
  phone: string;
  message: string;
  date: string;
  read: boolean;
  location: string;
}

export interface SiteSettings {
  brandName: string;
  contactEmail: string;
  officeAddress: string;
  studioAddress: string;
  workingHours: string;
  metaTitle: string;
  metaKeywords: string;
}

// ---------------- PROJECTS API ----------------
export async function fetchProjectsApi(): Promise<ProjectItem[]> {
  try {
    const res = await fetch(`${API_BASE_URL}/projects.php`);
    if (!res.ok) throw new Error("API Network response was not ok");
    const json = await res.json();
    if (json.status === "success" && Array.isArray(json.data)) {
      localStorage.setItem("hmoni_manage_projects", JSON.stringify(json.data));
      return json.data;
    }
  } catch (err) {
    console.warn("API offline/fallback to localStorage for Projects:", err);
  }
  const saved = localStorage.getItem("hmoni_manage_projects");
  return saved ? JSON.parse(saved) : [];
}

export async function createProjectApi(project: Omit<ProjectItem, "id">): Promise<boolean> {
  try {
    const res = await fetch(`${API_BASE_URL}/projects.php`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(project),
    });
    if (res.ok) {
      await fetchProjectsApi();
      return true;
    }
  } catch (err) {
    console.warn("API createProject failed:", err);
  }
  return false;
}

export async function deleteProjectApi(id: number): Promise<boolean> {
  try {
    const res = await fetch(`${API_BASE_URL}/projects.php?id=${id}`, {
      method: "DELETE",
    });
    if (res.ok) {
      await fetchProjectsApi();
      return true;
    }
  } catch (err) {
    console.warn("API deleteProject failed:", err);
  }
  return false;
}

// ---------------- HERO TILES API ----------------
export async function fetchHeroTilesApi(): Promise<HeroTileItem[]> {
  try {
    const res = await fetch(`${API_BASE_URL}/hero.php`);
    if (!res.ok) throw new Error("API Network response was not ok");
    const json = await res.json();
    if (json.status === "success" && Array.isArray(json.data)) {
      localStorage.setItem("hmoni_manage_hero_tiles", JSON.stringify(json.data));
      return json.data;
    }
  } catch (err) {
    console.warn("API offline/fallback to localStorage for Hero Tiles:", err);
  }
  const saved = localStorage.getItem("hmoni_manage_hero_tiles");
  return saved ? JSON.parse(saved) : [];
}

export async function saveHeroTileApi(tile: Partial<HeroTileItem>): Promise<boolean> {
  try {
    const res = await fetch(`${API_BASE_URL}/hero.php`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(tile),
    });
    if (res.ok) {
      await fetchHeroTilesApi();
      return true;
    }
  } catch (err) {
    console.warn("API saveHeroTile failed:", err);
  }
  return false;
}

export async function deleteHeroTileApi(id: number): Promise<boolean> {
  try {
    const res = await fetch(`${API_BASE_URL}/hero.php?id=${id}`, {
      method: "DELETE",
    });
    if (res.ok) {
      await fetchHeroTilesApi();
      return true;
    }
  } catch (err) {
    console.warn("API deleteHeroTile failed:", err);
  }
  return false;
}

export async function resetHeroTilesApi(): Promise<boolean> {
  try {
    const res = await fetch(`${API_BASE_URL}/hero.php?reset=true`, {
      method: "DELETE",
    });
    if (res.ok) {
      await fetchHeroTilesApi();
      return true;
    }
  } catch (err) {
    console.warn("API resetHeroTiles failed:", err);
  }
  return false;
}

// ---------------- MESSAGES / INQUIRIES API ----------------
export async function fetchMessagesApi(): Promise<MessageItem[]> {
  try {
    const res = await fetch(`${API_BASE_URL}/messages.php`);
    if (!res.ok) throw new Error("API Network response was not ok");
    const json = await res.json();
    if (json.status === "success" && Array.isArray(json.data)) {
      localStorage.setItem("hmoni_manage_messages", JSON.stringify(json.data));
      return json.data;
    }
  } catch (err) {
    console.warn("API offline/fallback to localStorage for Messages:", err);
  }
  const saved = localStorage.getItem("hmoni_manage_messages");
  return saved ? JSON.parse(saved) : [];
}

export async function submitMessageApi(msg: Omit<MessageItem, "id" | "read">): Promise<boolean> {
  try {
    const res = await fetch(`${API_BASE_URL}/messages.php`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(msg),
    });
    if (res.ok) {
      await fetchMessagesApi();
      return true;
    }
  } catch (err) {
    console.warn("API submitMessage failed:", err);
  }
  return false;
}

export async function deleteMessageApi(id: number): Promise<boolean> {
  try {
    const res = await fetch(`${API_BASE_URL}/messages.php?id=${id}`, {
      method: "DELETE",
    });
    if (res.ok) {
      await fetchMessagesApi();
      return true;
    }
  } catch (err) {
    console.warn("API deleteMessage failed:", err);
  }
  return false;
}

// ---------------- SITE SETTINGS API ----------------
export async function fetchSettingsApi(): Promise<Partial<SiteSettings>> {
  try {
    const res = await fetch(`${API_BASE_URL}/settings.php`);
    if (!res.ok) throw new Error("API Network response was not ok");
    const json = await res.json();
    if (json.status === "success" && json.data) {
      localStorage.setItem("hmoni_manage_settings", JSON.stringify(json.data));
      return json.data;
    }
  } catch (err) {
    console.warn("API offline/fallback to localStorage for Settings:", err);
  }
  const saved = localStorage.getItem("hmoni_manage_settings");
  return saved ? JSON.parse(saved) : {};
}

export async function updateSettingsApi(settings: Partial<SiteSettings>): Promise<boolean> {
  try {
    const res = await fetch(`${API_BASE_URL}/settings.php`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(settings),
    });
    if (res.ok) {
      await fetchSettingsApi();
      return true;
    }
  } catch (err) {
    console.warn("API updateSettings failed:", err);
  }
  return false;
}
