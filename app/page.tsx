import Link from "next/link";
import Nav from "./components/Nav";
import GitHubGraph from "./components/GitHubGraph";
import { getBlogPosts, getProjects, getExperience } from "../lib/content";
import { getContributions } from "../lib/github";

function fmtDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-SG", { day: "numeric", month: "short", year: "numeric" });
}

export default async function Home() {
  const blogPosts     = getBlogPosts().slice(0, 2);
  const projects      = getProjects().slice(0, 2);
  const experience    = getExperience();
  const contributions = await getContributions(32);

  const sections = [
    {
      label: "Blog",
      href: "/blog",
      accentColor: "#C07B0A",
      items: blogPosts.map((p) => ({
        href: `/blog/${p.slug}`,
        title: p.title,
        descriptor: `${p.category} · ${p.readTime} min`,
        date: fmtDate(p.date),
      })),
    },
    {
      label: "Projects",
      href: "/projects",
      accentColor: "#ABA79E",
      items: projects.map((p) => ({
        href: `/projects/${p.slug}`,
        title: p.title,
        descriptor: p.description,
        date: p.date,
      })),
    },
    {
      label: "Experience",
      href: "/experience",
      accentColor: "#3E3A30",
      items: experience.filter((e) => e.type === "work").slice(0, 1).map((e) => ({
        href: "/experience",
        title: e.org,
        descriptor: e.role,
        date: e.period.split("–")[0].trim(),
      })),
    },
  ];

  return (
    <>
      <style>{`
        .page-wrap  { min-height: 100vh; display: flex; flex-direction: column; }
        .inner      { max-width: 1080px; margin: 0 auto; padding: 0 20px; }
        .hero-grid  { display: grid; grid-template-columns: 1fr; gap: 28px; align-items: start; }

        .section-card           { background: var(--s1); border: 1px solid var(--b1); border-radius: 6px; overflow: hidden; }
        .section-card-head      { display: flex; justify-content: space-between; align-items: center; padding: 12px 16px 10px; }
        .section-card-divider   { height: 1px; background: var(--b1); }
        .section-item           { display: flex; align-items: flex-start; justify-content: space-between; gap: 12px; padding: 14px 16px; }
        .section-item + .section-item { border-top: 1px solid var(--b1); }
        .section-card-head a    { opacity: 0; transition: opacity 0.15s; }
        .section-card:hover .section-card-head a { opacity: 1; }

        @media (max-width: 767px) {
          .section-card-head a  { opacity: 1 !important; }
          .left-col             { border-bottom: 1px solid var(--b1); padding-bottom: 28px; }
        }
        @media (min-width: 768px) {
          .inner      { padding: 0 32px; }
          .hero-grid  { grid-template-columns: 3fr 2fr; gap: 48px; }
        }
      `}</style>

      <div className="page-wrap">
        <Nav />

        <main style={{ flex: 1 }}>
          <section style={{ padding: "clamp(24px, 5vw, 40px) 0 clamp(32px, 5vw, 48px)" }}>
            <div className="inner">
              <div className="hero-grid">

                {/* ── Left column ── */}
                <div className="left-col">
                  <p style={{ fontFamily: "var(--fm)", fontSize: 10, letterSpacing: "0.18em", textTransform: "uppercase", color: "var(--t3)", marginBottom: 18 }}>
                    Computing&nbsp;&nbsp;·&nbsp;&nbsp;Building&nbsp;&nbsp;·&nbsp;&nbsp;Singapore
                  </p>

                  <h1 style={{ fontFamily: "var(--fm)", fontSize: "clamp(28px, 7vw, 46px)", fontWeight: 600, letterSpacing: "-0.03em", color: "var(--t1)", lineHeight: 1.06, marginBottom: 20 }}>
                    Where <span style={{ color: "var(--ac)" }}>curiosity</span>
                    <br />meets the code.
                  </h1>

                  <p style={{ fontFamily: "var(--fb)", fontSize: 15, color: "var(--t2)", lineHeight: 1.72, maxWidth: 400, marginBottom: 28 }}>
                    A computing student figuring out how things work — and occasionally
                    building things to find out. Writing about what I learn along the way.
                  </p>

                  <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                    <Link href="/blog" style={{ fontFamily: "var(--fm)", fontSize: 11, fontWeight: 500, letterSpacing: "0.06em", padding: "8px 18px", borderRadius: 3, backgroundColor: "var(--t1)", color: "var(--bg)", textDecoration: "none", display: "inline-block" }}>
                      Read the blog
                    </Link>
                    <Link href="/projects" style={{ fontFamily: "var(--fm)", fontSize: 11, fontWeight: 500, letterSpacing: "0.06em", padding: "8px 18px", borderRadius: 3, backgroundColor: "transparent", color: "var(--t2)", border: "1px solid var(--b2)", textDecoration: "none", display: "inline-block" }}>
                      See projects
                    </Link>
                  </div>

                  <div style={{ marginTop: 28, overflowX: "hidden" }}>
                    <GitHubGraph
                      stretch
                      weeks={32}
                      label="contributions · past 32 weeks"
                      seed="junshen"
                      days={contributions?.days}
                      dates={contributions?.dates}
                      total={contributions?.total}
                    />
                  </div>
                </div>

                {/* ── Right column ── */}
                <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>

                  {/* Profile card */}
                  <div style={{ backgroundColor: "var(--s1)", border: "1px solid var(--b1)", borderRadius: 8, padding: "16px 18px", display: "flex", alignItems: "center", gap: 14 }}>
                    <div style={{ width: 42, height: 42, borderRadius: "50%", border: "1px solid var(--b2)", flexShrink: 0, overflow: "hidden" }}>
                      <img src="/avatar.jpeg" alt="Jun Shen" style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
                    </div>
                    <div>
                      <div style={{ fontFamily: "var(--fm)", fontSize: 14, fontWeight: 600, color: "var(--t1)", letterSpacing: "-0.01em", marginBottom: 2 }}>Jun Shen</div>
                      <div style={{ fontFamily: "var(--fb)", fontSize: 12, color: "var(--t3)" }}>Computing student · Singapore</div>
                    </div>
                  </div>

                  {/* Section cards — driven by live content */}
                  {sections.map((section) => (
                    <div key={section.label} className="section-card">
                      <div style={{ height: 2, backgroundColor: section.accentColor }} />
                      <div className="section-card-head">
                        <span style={{ fontFamily: "var(--fm)", fontSize: 9, fontWeight: 500, letterSpacing: "0.16em", textTransform: "uppercase", color: "var(--t3)" }}>
                          {section.label}
                        </span>
                        <Link href={section.href} style={{ fontFamily: "var(--fm)", fontSize: 9, color: "var(--t4)", textDecoration: "none", letterSpacing: "0.04em" }}>
                          View all →
                        </Link>
                      </div>
                      <div className="section-card-divider" />
                      {section.items.length === 0 ? (
                        <div style={{ padding: "14px 16px" }}>
                          <p style={{ fontFamily: "var(--fm)", fontSize: 11, color: "var(--t4)", letterSpacing: "0.04em" }}>— No activity yet</p>
                        </div>
                      ) : section.items.map((item) => (
                        <Link key={item.title} href={item.href} style={{ textDecoration: "none", display: "block" }}>
                          <div className="section-item">
                            <div style={{ flex: 1, minWidth: 0 }}>
                              <p style={{ fontFamily: "var(--fm)", fontSize: 12, fontWeight: 500, color: "var(--t1)", letterSpacing: "-0.01em", lineHeight: 1.4, marginBottom: 4 }}>
                                {item.title}
                              </p>
                              <p style={{ fontFamily: "var(--fb)", fontSize: 11, color: "var(--t4)", lineHeight: 1 }}>
                                {item.descriptor}
                              </p>
                            </div>
                            <span style={{ fontFamily: "var(--fm)", fontSize: 9, color: "var(--t4)", flexShrink: 0, whiteSpace: "nowrap", paddingTop: 2 }}>
                              {item.date}
                            </span>
                          </div>
                        </Link>
                      ))}
                    </div>
                  ))}

                </div>
              </div>
            </div>
          </section>
        </main>

        <footer style={{ borderTop: "1px solid var(--b1)" }}>
          <div className="inner" style={{ padding: "16px 20px", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 8 }}>
            <span style={{ fontFamily: "var(--fm)", fontSize: 11, color: "var(--t4)", letterSpacing: "0.04em" }}>
              jun<span style={{ color: "var(--ac)" }}>_</span>shen · Singapore · 2026
            </span>
            <span style={{ fontFamily: "var(--fm)", fontSize: 10, color: "var(--t4)", letterSpacing: "0.08em", textTransform: "uppercase" }}>
              Student · Computing
            </span>
          </div>
        </footer>
      </div>
    </>
  );
}
