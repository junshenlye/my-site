import Link from "next/link";
import Nav from "../components/Nav";
import { getBlogPosts } from "../../lib/content";

function fmtDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-SG", { day: "numeric", month: "short", year: "numeric" });
}

export default function BlogPage() {
  const posts = getBlogPosts();

  return (
    <div style={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}>
      <Nav />
      <main style={{ flex: 1 }}>
        <div style={{ maxWidth: 1080, margin: "0 auto", padding: "clamp(32px,5vw,56px) 20px 80px" }}>

          <div style={{ marginBottom: 48 }}>
            <p style={{ fontFamily: "var(--fm)", fontSize: 10, letterSpacing: "0.18em", textTransform: "uppercase", color: "var(--t3)", marginBottom: 14 }}>Writing</p>
            <h1 style={{ fontFamily: "var(--fm)", fontSize: "clamp(26px,4vw,36px)", fontWeight: 600, letterSpacing: "-0.03em", color: "var(--t1)", lineHeight: 1.1, marginBottom: 12 }}>
              Things I&apos;ve figured out,<br /><span style={{ color: "var(--ac)" }}>written down.</span>
            </h1>
            <p style={{ fontFamily: "var(--fb)", fontSize: 14, color: "var(--t3)", lineHeight: 1.65, maxWidth: 420 }}>
              Notes from learning computing. Mostly for myself — but public in case it&apos;s useful.
            </p>
          </div>

          <div style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: 16 }}>
            <span style={{ fontFamily: "var(--fm)", fontSize: 9, letterSpacing: "0.18em", textTransform: "uppercase", color: "var(--t4)", whiteSpace: "nowrap" }}>
              {posts.length} post{posts.length !== 1 ? "s" : ""}
            </span>
            <div style={{ flex: 1, height: 1, backgroundColor: "var(--b1)" }} />
          </div>

          {posts.length === 0 ? (
            <div style={{ backgroundColor: "var(--s1)", border: "1px solid var(--b1)", borderRadius: 6, padding: "32px 24px", textAlign: "center" }}>
              <p style={{ fontFamily: "var(--fm)", fontSize: 11, color: "var(--t4)", letterSpacing: "0.08em" }}>— No posts yet —</p>
            </div>
          ) : (
            <div style={{ display: "flex", flexDirection: "column", gap: 2 }}>
              {posts.map((post) => (
                <Link key={post.slug} href={`/blog/${post.slug}`} style={{ textDecoration: "none" }}>
                  <div style={{ backgroundColor: "var(--s1)", border: "1px solid var(--b1)", borderRadius: 6, padding: "20px 24px", display: "grid", gridTemplateColumns: "1fr auto", gap: 16, alignItems: "start" }}>
                    <div>
                      <p style={{ fontFamily: "var(--fm)", fontSize: 9, letterSpacing: "0.14em", textTransform: "uppercase", color: "var(--t3)", marginBottom: 8 }}>{post.category}</p>
                      <p style={{ fontFamily: "var(--fm)", fontSize: 15, fontWeight: 600, color: "var(--t1)", letterSpacing: "-0.01em", lineHeight: 1.3, marginBottom: 8 }}>{post.title}</p>
                      <p style={{ fontFamily: "var(--fb)", fontSize: 13, color: "var(--t3)", lineHeight: 1.6 }}>{post.description}</p>
                    </div>
                    <div style={{ textAlign: "right", flexShrink: 0 }}>
                      <p style={{ fontFamily: "var(--fm)", fontSize: 10, color: "var(--t4)", marginBottom: 4 }}>{fmtDate(post.date)}</p>
                      <p style={{ fontFamily: "var(--fm)", fontSize: 10, color: "var(--t4)" }}>{post.readTime} min read</p>
                    </div>
                  </div>
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
