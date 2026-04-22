import Link from "next/link";
import Nav from "../components/Nav";
import GitHubGraph from "../components/GitHubGraph";
import { getProjects } from "../../lib/content";

const statusStyle: Record<string, { bg: string; color: string; border: string }> = {
  Active:  { bg: "var(--ac-lt)", color: "var(--ac)",  border: "1px solid var(--ac-b)" },
  Shipped: { bg: "var(--s2)",    color: "var(--t2)",  border: "1px solid var(--b1)"   },
  Paused:  { bg: "var(--s2)",    color: "var(--t4)",  border: "1px solid var(--b1)"   },
};

export default function ProjectsPage() {
  const projects = getProjects();

  return (
    <div style={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}>
      <Nav />
      <main style={{ flex: 1 }}>
        <div style={{ maxWidth: 1080, margin: "0 auto", padding: "clamp(32px,5vw,56px) 20px 80px" }}>

          <div style={{ marginBottom: 48 }}>
            <p style={{ fontFamily: "var(--fm)", fontSize: 10, letterSpacing: "0.18em", textTransform: "uppercase", color: "var(--t3)", marginBottom: 14 }}>Projects</p>
            <h1 style={{ fontFamily: "var(--fm)", fontSize: "clamp(26px,4vw,36px)", fontWeight: 600, letterSpacing: "-0.03em", color: "var(--t1)", lineHeight: 1.1, marginBottom: 12 }}>
              Things I&apos;ve built to<br /><span style={{ color: "var(--ac)" }}>understand.</span>
            </h1>
            <p style={{ fontFamily: "var(--fb)", fontSize: 14, color: "var(--t3)", lineHeight: 1.65, maxWidth: 420 }}>
              Small projects, learning exercises, and the occasional thing that accidentally becomes useful.
            </p>
          </div>

          <div style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: 16 }}>
            <span style={{ fontFamily: "var(--fm)", fontSize: 9, letterSpacing: "0.18em", textTransform: "uppercase", color: "var(--t4)", whiteSpace: "nowrap" }}>
              {projects.length} project{projects.length !== 1 ? "s" : ""}
            </span>
            <div style={{ flex: 1, height: 1, backgroundColor: "var(--b1)" }} />
          </div>

          <style>{`
            @media (min-width: 640px)  { .projects-grid { grid-template-columns: repeat(2, 1fr) !important; } }
            @media (min-width: 900px)  { .projects-grid { grid-template-columns: repeat(3, 1fr) !important; } }
          `}</style>
          <div className="projects-grid" style={{ display: "grid", gridTemplateColumns: "1fr", gap: 8 }}>
            {projects.map((proj) => (
              <div key={proj.slug} style={{ backgroundColor: "var(--s1)", border: "1px solid var(--b1)", borderRadius: 6, overflow: "hidden" }}>
                <div style={{ display: "grid", gridTemplateColumns: "3px 1fr" }}>
                  <div style={{ backgroundColor: proj.status === "Active" ? "var(--ac)" : "var(--s3)" }} />
                  <div style={{ padding: "18px 18px 16px" }}>

                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 10, gap: 8 }}>
                      <span style={{ fontFamily: "var(--fm)", fontSize: 8, fontWeight: 500, letterSpacing: "0.08em", textTransform: "uppercase", padding: "2px 6px", borderRadius: 2, flexShrink: 0, ...statusStyle[proj.status] }}>
                        {proj.status}
                      </span>
                      <span style={{ fontFamily: "var(--fm)", fontSize: 10, color: "var(--t4)" }}>{proj.date}</span>
                    </div>

                    <p style={{ fontFamily: "var(--fm)", fontSize: 13, fontWeight: 600, color: "var(--t1)", letterSpacing: "-0.01em", lineHeight: 1.3, marginBottom: 8 }}>
                      {proj.title}
                    </p>
                    <p style={{ fontFamily: "var(--fb)", fontSize: 12, color: "var(--t3)", lineHeight: 1.6, marginBottom: 0 }}>
                      {proj.description}
                    </p>

                    <div style={{ borderTop: "1px solid var(--b1)", marginTop: 14, paddingTop: 12 }}>
                      <GitHubGraph compact weeks={12} seed={proj.githubSlug} paused={proj.status === "Paused"} />
                    </div>

                    {/* Link to detail page if post file exists */}
                    <div style={{ marginTop: 12 }}>
                      <Link href={`/projects/${proj.slug}`} style={{ fontFamily: "var(--fm)", fontSize: 9, color: "var(--t4)", letterSpacing: "0.08em", textTransform: "uppercase", textDecoration: "none" }}>
                        Read more →
                      </Link>
                    </div>

                  </div>
                </div>
              </div>
            ))}
          </div>

        </div>
      </main>
      <footer style={{ borderTop: "1px solid var(--b1)" }}>
        <div style={{ maxWidth: 1080, margin: "0 auto", padding: "18px 20px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <span style={{ fontFamily: "var(--fm)", fontSize: 11, color: "var(--t4)" }}>jun<span style={{ color: "var(--ac)" }}>_</span>shen</span>
          <span style={{ fontFamily: "var(--fm)", fontSize: 10, color: "var(--t4)", letterSpacing: "0.08em", textTransform: "uppercase" }}>Student · Computing</span>
        </div>
      </footer>
    </div>
  );
}
