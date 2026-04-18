import Nav from "../components/Nav";

const roles = [
  {
    type: "work",
    org: "Company Name",
    role: "Intern — Software Engineering",
    period: "Apr 2026 – Present",
    location: "Singapore",
    description:
      "Working on [team/product]. Placeholder until I can write this up properly.",
    tags: ["Engineering", "Internship"],
  },
  {
    type: "education",
    org: "University Name",
    role: "B.Comp — Computing",
    period: "2024 – Present",
    location: "Singapore",
    description:
      "Studying computing. Majoring in [major]. Currently in Year [X].",
    tags: ["Education", "Computing"],
  },
];

const skills = [
  { label: "Languages", items: "Python · C · JavaScript · TypeScript" },
  { label: "Web", items: "Next.js · React · Node.js" },
  { label: "Tools", items: "Git · Linux · Postgres" },
  { label: "Learning", items: "Go · Systems programming · Compilers" },
];

export default function ExperiencePage() {
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
              Experience
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
              What I&apos;ve done<br />
              <span style={{ color: "var(--ac)" }}>so far.</span>
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
              Still early — but here&apos;s where I&apos;ve been and what I&apos;ve been working on.
            </p>
          </div>

          <style>{`
            @media (min-width: 768px) {
              .exp-grid { grid-template-columns: 2fr 1fr !important; gap: 40px !important; }
            }
          `}</style>
          <div
            className="exp-grid"
            style={{ display: "grid", gridTemplateColumns: "1fr", gap: 32 }}
          >
            {/* Left — roles */}
            <div>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 14,
                  marginBottom: 20,
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
                  Roles & Education
                </span>
                <div style={{ flex: 1, height: 1, backgroundColor: "var(--b1)" }} />
              </div>

              <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                {roles.map((r) => (
                  <div
                    key={r.role}
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
                            r.type === "work" ? "var(--ac)" : "var(--s3)",
                        }}
                      />
                      <div style={{ padding: "18px 20px" }}>
                        <div
                          style={{
                            display: "flex",
                            justifyContent: "space-between",
                            gap: 12,
                            marginBottom: 4,
                            flexWrap: "wrap",
                          }}
                        >
                          <p
                            style={{
                              fontFamily: "var(--fm)",
                              fontSize: 14,
                              fontWeight: 600,
                              color: "var(--t1)",
                              letterSpacing: "-0.01em",
                            }}
                          >
                            {r.role}
                          </p>
                          <span
                            style={{
                              fontFamily: "var(--fm)",
                              fontSize: 10,
                              color: "var(--t4)",
                              flexShrink: 0,
                            }}
                          >
                            {r.period}
                          </span>
                        </div>
                        <p
                          style={{
                            fontFamily: "var(--fm)",
                            fontSize: 11,
                            color: "var(--t3)",
                            marginBottom: 10,
                            letterSpacing: "0.02em",
                          }}
                        >
                          {r.org} · {r.location}
                        </p>
                        <p
                          style={{
                            fontFamily: "var(--fb)",
                            fontSize: 13,
                            color: "var(--t2)",
                            lineHeight: 1.6,
                            marginBottom: 12,
                          }}
                        >
                          {r.description}
                        </p>
                        <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
                          {r.tags.map((tag) => (
                            <span
                              key={tag}
                              style={{
                                fontFamily: "var(--fm)",
                                fontSize: 9,
                                fontWeight: 500,
                                letterSpacing: "0.08em",
                                textTransform: "uppercase",
                                padding: "2px 7px",
                                borderRadius: 2,
                                backgroundColor: "var(--s2)",
                                color: "var(--t2)",
                                border: "1px solid var(--b1)",
                              }}
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right — skills */}
            <div>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 14,
                  marginBottom: 20,
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
                  Skills
                </span>
                <div style={{ flex: 1, height: 1, backgroundColor: "var(--b1)" }} />
              </div>

              <div
                style={{
                  backgroundColor: "var(--s1)",
                  border: "1px solid var(--b1)",
                  borderRadius: 6,
                  overflow: "hidden",
                }}
              >
                {skills.map((s, i) => (
                  <div
                    key={s.label}
                    style={{
                      padding: "14px 18px",
                      borderBottom:
                        i < skills.length - 1 ? "1px solid var(--b0)" : "none",
                    }}
                  >
                    <p
                      style={{
                        fontFamily: "var(--fm)",
                        fontSize: 9,
                        letterSpacing: "0.14em",
                        textTransform: "uppercase",
                        color: "var(--t4)",
                        marginBottom: 6,
                      }}
                    >
                      {s.label}
                    </p>
                    <p
                      style={{
                        fontFamily: "var(--fm)",
                        fontSize: 12,
                        color: "var(--t2)",
                        lineHeight: 1.5,
                      }}
                    >
                      {s.items}
                    </p>
                  </div>
                ))}
              </div>
            </div>
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
