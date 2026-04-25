import fs from "fs";
import path from "path";

const root = path.join(process.cwd(), "content");

// ── Types ─────────────────────────────────────────────────────────────────────

export type BlogPost = {
  slug: string;
  title: string;
  date: string;         // ISO date string e.g. "2026-04-09"
  category: string;
  description: string;
  readTime: number;     // minutes
};

export type Project = {
  slug: string;
  title: string;
  date: string;         // e.g. "2026-04"
  status: "Active" | "Shipped" | "Paused";
  description: string;
  githubRepo: string;   // repo name — used as mock seed now, real API later
};

export type ExperienceEntry = {
  type: "work" | "education";
  org: string;
  role: string;
  period: string;
  location: string;
  description: string;
  tags: string[];
};

export type Skill = {
  label: string;
  items: string;
};

// ── Helpers ───────────────────────────────────────────────────────────────────

function readJson<T>(filePath: string): T {
  return JSON.parse(fs.readFileSync(filePath, "utf-8")) as T;
}

function readHtml(filePath: string): string {
  return fs.readFileSync(filePath, "utf-8");
}

// ── Blog ──────────────────────────────────────────────────────────────────────

/** Returns all blog posts from the manifest, newest first. */
export function getBlogPosts(): BlogPost[] {
  return readJson<BlogPost[]>(path.join(root, "blog", "index.json"));
}

/** Returns metadata + HTML body for a single post. */
export function getBlogPost(slug: string): { meta: BlogPost; html: string } {
  const meta = getBlogPosts().find((p) => p.slug === slug);
  if (!meta) throw new Error(`Blog post not found: ${slug}`);
  const html = readHtml(path.join(root, "blog", "posts", `${slug}.html`));
  return { meta, html };
}

// ── Projects ──────────────────────────────────────────────────────────────────

/** Returns all projects from the manifest. */
export function getProjects(): Project[] {
  return readJson<Project[]>(path.join(root, "projects", "index.json"));
}

/** Returns metadata + HTML body for a single project (if a post file exists). */
export function getProject(slug: string): { meta: Project; html: string } | null {
  const meta = getProjects().find((p) => p.slug === slug);
  if (!meta) return null;
  const htmlPath = path.join(root, "projects", "posts", `${slug}.html`);
  if (!fs.existsSync(htmlPath)) return null;
  return { meta, html: readHtml(htmlPath) };
}

// ── Experience ────────────────────────────────────────────────────────────────

/** Returns all experience entries from the manifest. */
export function getExperience(): ExperienceEntry[] {
  return readJson<ExperienceEntry[]>(path.join(root, "experience.json"));
}

// ── Skills ────────────────────────────────────────────────────────────────────

/** Returns skill groups shown on the experience page. */
export function getSkills(): Skill[] {
  return readJson<Skill[]>(path.join(root, "skills.json"));
}
