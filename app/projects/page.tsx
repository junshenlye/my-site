import Nav from "../components/Nav";
import GitHubGraph from "../components/GitHubGraph";

const projects = [
  {
    status: "Active",
    title: "A tool whose name I haven't decided yet",
    description:
      "Built to scratch a personal itch. Does one thing, does it well. Still figuring out if anyone else would want it.",
    year: "2026",
    githubSlug: "cli-tool",
  },
  {
    status: "Shipped",
    title: "This site",
    description:
      "Personal site built from scratch with a brand system I designed. The irony of spending more time on the design than the content is not lost on me.",
    year: "2026",
    githubSlug: "personal-site",
  },
  {
    status: "Paused",
    title: "Tiny HTTP server",
    description:
      "Learning exercise — implementing a basic HTTP/1.1 server in C to understand what's happening under the abstractions.",
    year: "2025",
    githubSlug: "http-server",
  },
];

const statusStyle: Record<string, { bg: string; color: string; border: string }> = {
  Active: {
    bg: "var(--ac-lt)",
    color: "var(--ac)",
    border: "1px solid var(--ac-b)",
  },
  Shipped: {
    bg: "var(--s2)",
    color: "var(--t2)",
    border: "1px solid var(--b1)",
  },
  Paused: {
    bg: "var(--s2)",
    color: "var(--t4)",
    border: "1px solid var(--b1)",
  },
};

export default function ProjectsPage() {
  return (
    <div style={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}>
      <Nav />
      <main style={{ flex: 1 }}>
        <div style={{ maxWidth: 1080, margin: "0 auto", padding: "56px 32px 80px" }}>
          {/* Page header */}
          <div style={{ marginBottom: 48 }}>
            <p
              style={{
                fontFamily: "var(--fm)",
                fontSize: 10,
                letterSpacing: "0.18em",
                textTransform: "uppercase",
                color: "var(--t3)",
                marginBottom: 14,
              }}
            >
              Projects
            </p>
            <h1
              style={{
                fontFamily: "var(--fm)",
                fontSize: "clamp(26px, 4vw, 36px)",
                fontWeight: 600,
                letterSpacing: "-0.03em",
                color: "var(--t1)",
                lineHeight: 1.1,
                marginBottom: 12,
              }}
            >
              Things I&apos;ve built to<br />
              <span style={{ color: "var(--ac)" }}>understand.</span>
            </h1>
            <p
              style={{
                fontFamily: "var(--fb)",
                fontSize: 14,
                color: "var(--t3)",
                lineHeight: 1.65,
                maxWidth: 420,
              }}
            >
              Small projects, learning exercises, and the occasional thing that accidentally becomes useful.
            </p>
          </div>

          {/* Divider */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 14,
              marginBottom: 24,
            }}
          >
            <span
              style={{
                fontFamily: "var(--fm)",
                fontSize: 9,
                letterSpacing: "0.18em",
                textTransform: "uppercase",
                color: "var(--t4)",
                whiteSpace: "nowrap",
              }}
            >
              All projects
            </span>
            <div style={{ flex: 1, height: 1, backgroundColor: "var(--b1)" }} />
          </div>

          {/* Project cards */}
          <style>{`
            @media (min-width: 640px) {
              .projects-grid { grid-template-columns: repeat(2, minmax(0, 1fr)) !important; }
            }
            @media (min-width: 900px) {
              .projects-grid { grid-template-columns: repeat(3, minmax(0, 1fr)) !important; }
            }
          `}</style>
          <div
            className="projects-grid"
            style={{ display: "grid", gridTemplateColumns: "1fr", gap: 8 }}
          >
            {projects.map((proj) => (
              <div
                key={proj.title}
                style={{
                  backgroundColor: "var(--s1)",
                  border: "1px solid var(--b1)",
                  borderRadius: 6,
                  overflow: "hidden",
                }}
              >
                <div style={{ display: "grid", gridTemplateColumns: "3px 1fr" }}>
                  <div
                    style={{
                      backgroundColor:
                        proj.status === "Active" ? "var(--ac)" : "var(--s3)",
                    }}
                  />
                  <div style={{ padding: "18px 18px 16px" }}>
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "flex-start",
                        marginBottom: 10,
                        gap: 8,
                      }}
                    >
                      <span
                        style={{
                          fontFamily: "var(--fm)",
                          fontSize: 8,
                          fontWeight: 500,
                          letterSpacing: "0.08em",
                          textTransform: "uppercase",
                          padding: "2px 6px",
                          borderRadius: 2,
                          flexShrink: 0,
                          ...statusStyle[proj.status],
                        }}
                      >
                        {proj.status}
                      </span>
                    </div>
                    <p
                      style={{
                        fontFamily: "var(--fm)",
                        fontSize: 13,
                        fontWeight: 600,
                        color: "var(--t1)",
                        letterSpacing: "-0.01em",
                        lineHeight: 1.3,
                        marginBottom: 10,
                      }}
                    >
                      {proj.title}
                    </p>
                    <p
                      style={{
                        fontFamily: "var(--fb)",
                        fontSize: 12,
                        color: "var(--t3)",
                        lineHeight: 1.6,
                        marginBottom: 0,
                      }}
                    >
                      {proj.description}
                    </p>

                    {/* Activity graph */}
                    <div style={{ borderTop: "1px solid var(--b1)", marginTop: 14, padding: "12px 0 2px" }}>
                      <GitHubGraph
                        compact
                        weeks={12}
                        seed={proj.githubSlug}
                        paused={proj.status === "Paused"}
                      />
                    </div>

                    <p
                      style={{
                        fontFamily: "var(--fm)",
                        fontSize: 10,
                        color: "var(--t4)",
                        marginTop: 8,
                      }}
                    >
                      {proj.year}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>

      <footer style={{ borderTop: "1px solid var(--b1)" }}>
        <div
          style={{
            maxWidth: 1080,
            margin: "0 auto",
            padding: "18px 32px",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <span style={{ fontFamily: "var(--fm)", fontSize: 11, color: "var(--t4)" }}>
            jun<span style={{ color: "var(--ac)" }}>_</span>shen · Singapore · 2026
          </span>
          <span
            style={{
              fontFamily: "var(--fm)",
              fontSize: 10,
              color: "var(--t4)",
              letterSpacing: "0.08em",
              textTransform: "uppercase",
            }}
          >
            Student · Computing
          </span>
        </div>
      </footer>
    </div>
  );
}
