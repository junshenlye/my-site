import Link from "next/link";
import Nav from "../components/Nav";
import { getBlogPosts } from "../../lib/content";

function fmtDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-SG", { day: "numeric", month: "long", year: "numeric" });
}

export default function BlogPage() {
  const posts = getBlogPosts();

  return (
    <div style={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}>
      <Nav />
      <main style={{ flex: 1 }}>
        <style>{`
          .blog-shell {
            max-width: 1080px;
            margin: 0 auto;
            padding: clamp(32px, 5vw, 56px) 20px 80px;
          }

          .blog-archive {
            display: grid;
            max-width: 100%;
          }

          .blog-post-row {
            text-decoration: none;
            color: inherit;
            display: block;
            padding: 24px 0 26px;
            border-top: 1px solid var(--b1);
          }

          .blog-post-row:first-child {
            padding-top: 0;
            border-top: none;
          }

          @media (max-width: 640px) {
            .blog-shell {
              padding: 24px 16px 56px;
            }

            .blog-post-row {
              padding: 18px 0 20px;
            }
          }
        `}</style>

        <div className="blog-shell">

          <div style={{ marginBottom: 48 }}>
            <p style={{ fontFamily: "var(--fm)", fontSize: 10, letterSpacing: "0.18em", textTransform: "uppercase", color: "var(--t3)", marginBottom: 14 }}>Writing</p>
            <h1 style={{ fontFamily: "var(--fm)", fontSize: "clamp(26px,4vw,36px)", fontWeight: 600, letterSpacing: "-0.03em", color: "var(--t1)", lineHeight: 1.1, marginBottom: 12 }}>
              Thoughts and questions,<br /><span style={{ color: "var(--ac)" }}>written down.</span>
            </h1>
            <p style={{ fontFamily: "var(--fb)", fontSize: 14, color: "var(--t3)", lineHeight: 1.65, maxWidth: 420 }}>
              Notes on computing, theory, and things I can&apos;t stop thinking about. Part reflection, part exploration, part working draft.
            </p>
          </div>

          <div style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: 40 }}>
            <span style={{ fontFamily: "var(--fm)", fontSize: 9, letterSpacing: "0.18em", textTransform: "uppercase", color: "var(--t4)", whiteSpace: "nowrap" }}>
              {posts.length === 0 ? "Status" : "Published"}
            </span>
            <div style={{ flex: 1, height: 1, backgroundColor: "var(--b1)" }} />
          </div>

          {posts.length === 0 ? (
            <div style={{
              border: "1px dashed var(--b2)",
              borderRadius: 8,
              padding: "clamp(40px, 8vw, 72px) 32px",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              textAlign: "center",
              gap: 16,
            }}>
              <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <span style={{ display: "inline-block", width: 7, height: 7, borderRadius: "50%", backgroundColor: "var(--ac)", flexShrink: 0 }} />
                <span style={{ fontFamily: "var(--fm)", fontSize: 9, letterSpacing: "0.18em", textTransform: "uppercase", color: "var(--ac)" }}>In progress</span>
              </div>
              <p style={{ fontFamily: "var(--fm)", fontSize: "clamp(16px,3vw,22px)", fontWeight: 600, letterSpacing: "-0.02em", color: "var(--t1)", lineHeight: 1.2 }}>
                Posts are being written.
              </p>
              <p style={{ fontFamily: "var(--fb)", fontSize: 13, color: "var(--t4)", lineHeight: 1.65, maxWidth: 340 }}>
                Writing takes time to do properly — first posts coming soon.
              </p>
            </div>
          ) : (
            <div className="blog-archive">
              {posts.map((post) => (
                <Link
                  key={post.slug}
                  href={`/blog/${post.slug}`}
                  className="blog-post-row"
                >
                  <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", gap: 10, marginBottom: 12 }}>
                    <span style={{ fontFamily: "var(--fm)", fontSize: 9, letterSpacing: "0.16em", textTransform: "uppercase", color: "var(--ac)" }}>
                      {post.category}
                    </span>
                    <span style={{ width: 3, height: 3, borderRadius: "50%", backgroundColor: "var(--b2)", display: "inline-block" }} />
                    <span style={{ fontFamily: "var(--fm)", fontSize: 10, color: "var(--t4)" }}>{fmtDate(post.date)}</span>
                    <span style={{ width: 3, height: 3, borderRadius: "50%", backgroundColor: "var(--b2)", display: "inline-block" }} />
                    <span style={{ fontFamily: "var(--fm)", fontSize: 10, color: "var(--t4)" }}>{post.readTime} min read</span>
                  </div>
                  <h2
                    style={{
                      fontFamily: "var(--fm)",
                      fontSize: "clamp(17px,2.2vw,22px)",
                      fontWeight: 600,
                      letterSpacing: "-0.02em",
                      color: "var(--t1)",
                      lineHeight: 1.16,
                      marginBottom: 8,
                      maxWidth: 620,
                    }}
                  >
                    {post.title}
                  </h2>
                  <p
                    style={{
                      fontFamily: "var(--fb)",
                      fontSize: 14,
                      color: "var(--t3)",
                      lineHeight: 1.7,
                      maxWidth: 580,
                    }}
                  >
                    {post.description}
                  </p>
                </Link>
              ))}
            </div>
          )}

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
