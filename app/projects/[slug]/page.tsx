import Link from "next/link";
import Nav from "../../components/Nav";
import GitHubGraph from "../../components/GitHubGraph";
import { getProject, getProjects } from "../../../lib/content";
import { notFound } from "next/navigation";

export async function generateStaticParams() {
  return getProjects().map((p) => ({ slug: p.slug }));
}

const statusStyle: Record<string, { bg: string; color: string; border: string }> = {
  Active:  { bg: "var(--ac-lt)", color: "var(--ac)",  border: "1px solid var(--ac-b)" },
  Shipped: { bg: "var(--s2)",    color: "var(--t2)",  border: "1px solid var(--b1)"   },
  Paused:  { bg: "var(--s2)",    color: "var(--t4)",  border: "1px solid var(--b1)"   },
};

export default async function ProjectPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const result = getProject(slug);
  if (!result) notFound();
  const { meta, html } = result;

  return (
    <div style={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}>
      <Nav />
      <main style={{ flex: 1 }}>
        <div style={{ maxWidth: 720, margin: "0 auto", padding: "clamp(32px,5vw,56px) 20px 96px" }}>

          <Link href="/projects" style={{ fontFamily: "var(--fm)", fontSize: 10, letterSpacing: "0.12em", textTransform: "uppercase", color: "var(--t4)", textDecoration: "none", display: "inline-block", marginBottom: 36 }}>
            ← Projects
          </Link>

          <div style={{ marginBottom: 40, paddingBottom: 32, borderBottom: "1px solid var(--b1)" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 16 }}>
              <span style={{ fontFamily: "var(--fm)", fontSize: 8, fontWeight: 500, letterSpacing: "0.08em", textTransform: "uppercase", padding: "2px 6px", borderRadius: 2, ...statusStyle[meta.status] }}>
                {meta.status}
              </span>
              <span style={{ fontFamily: "var(--fm)", fontSize: 10, color: "var(--t4)" }}>{meta.date}</span>
            </div>
            <h1 style={{ fontFamily: "var(--fm)", fontSize: "clamp(24px,4vw,34px)", fontWeight: 600, letterSpacing: "-0.03em", color: "var(--t1)", lineHeight: 1.12, marginBottom: 12 }}>
              {meta.title}
            </h1>
            <p style={{ fontFamily: "var(--fb)", fontSize: 14, color: "var(--t3)", lineHeight: 1.6, marginBottom: 20 }}>
              {meta.description}
            </p>
            <GitHubGraph weeks={24} seed={meta.githubSlug} paused={meta.status === "Paused"} label="contributions · past 24 weeks" />
          </div>

          <div className="post-body" dangerouslySetInnerHTML={{ __html: html }} />

        </div>
      </main>

      <style>{`
        .post-body { color: var(--t2); font-family: var(--fb); font-size: 16px; line-height: 1.78; }
        .post-body h2 { font-family: var(--fm); font-size: 18px; font-weight: 600; letter-spacing: -0.02em; color: var(--t1); margin: 2.2em 0 0.8em; }
        .post-body h3 { font-family: var(--fm); font-size: 14px; font-weight: 500; letter-spacing: -0.01em; color: var(--t1); margin: 1.8em 0 0.6em; }
        .post-body p  { margin-bottom: 1.4em; }
        .post-body p:last-child { margin-bottom: 0; }
        .post-body a  { color: var(--ac); text-decoration: underline; text-underline-offset: 2px; }
        .post-body strong { font-weight: 500; color: var(--t1); }
        .post-body code { font-family: var(--fm); font-size: 13px; background: var(--s2); padding: 1px 5px; border-radius: 2px; }
        .post-body pre  { background: var(--s2); border: 1px solid var(--b1); border-radius: 6px; padding: 18px 20px; overflow-x: auto; margin: 1.6em 0; }
        .post-body pre code { background: none; padding: 0; }
        .post-body ol, .post-body ul { padding-left: 1.4em; margin-bottom: 1.4em; }
        .post-body li  { margin-bottom: 0.4em; }
        .post-body blockquote { border-left: 3px solid var(--ac); padding-left: 18px; margin: 1.6em 0; color: var(--t3); font-style: italic; }
        .post-body img { max-width: 100%; border-radius: 6px; margin: 1.6em 0; }
        .post-body hr  { border: none; border-top: 1px solid var(--b1); margin: 2.4em 0; }
      `}</style>

      <footer style={{ borderTop: "1px solid var(--b1)" }}>
        <div style={{ maxWidth: 720, margin: "0 auto", padding: "18px 20px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <span style={{ fontFamily: "var(--fm)", fontSize: 11, color: "var(--t4)" }}>jun<span style={{ color: "var(--ac)" }}>_</span>shen</span>
          <Link href="/projects" style={{ fontFamily: "var(--fm)", fontSize: 10, color: "var(--t4)", textDecoration: "none", letterSpacing: "0.08em", textTransform: "uppercase" }}>← All projects</Link>
        </div>
      </footer>
    </div>
  );
}
