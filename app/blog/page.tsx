import Nav from "../components/Nav";

const posts = [
  {
    category: "Systems",
    title: "Why I keep reading things I don't understand yet",
    excerpt:
      "On sitting with confusion as a learning strategy, and why the discomfort is the point.",
    date: "Apr 9, 2026",
    read: "4 min",
  },
  {
    category: "Systems",
    title: "How a CPU actually executes your code",
    excerpt:
      "A ground-up look at the fetch-decode-execute cycle, written by someone who had to learn it properly.",
    date: "Mar 28, 2026",
    read: "6 min",
  },
  {
    category: "Learning",
    title: "On reading textbooks vs just building things",
    excerpt:
      "Both camps have a point. The trick is knowing which mode you're actually in at any given moment.",
    date: "Mar 14, 2026",
    read: "3 min",
  },
];

export default function BlogPage() {
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
              Writing
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
              Things I&apos;ve figured out,<br />
              <span style={{ color: "var(--ac)" }}>written down.</span>
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
              Notes from learning computing. Mostly for myself — but public in case it&apos;s useful.
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
              All posts
            </span>
            <div style={{ flex: 1, height: 1, backgroundColor: "var(--b1)" }} />
          </div>

          {/* Post list */}
          <div style={{ display: "flex", flexDirection: "column", gap: 2 }}>
            {posts.map((post) => (
              <div
                key={post.title}
                style={{
                  backgroundColor: "var(--s1)",
                  border: "1px solid var(--b1)",
                  borderRadius: 6,
                  padding: "20px 24px",
                  cursor: "pointer",
                  display: "grid",
                  gridTemplateColumns: "1fr auto",
                  gap: 16,
                  alignItems: "start",
                }}
              >
                <div>
                  <p
                    style={{
                      fontFamily: "var(--fm)",
                      fontSize: 9,
                      letterSpacing: "0.14em",
                      textTransform: "uppercase",
                      color: "var(--t3)",
                      marginBottom: 8,
                    }}
                  >
                    {post.category}
                  </p>
                  <p
                    style={{
                      fontFamily: "var(--fm)",
                      fontSize: 15,
                      fontWeight: 600,
                      color: "var(--t1)",
                      letterSpacing: "-0.01em",
                      lineHeight: 1.3,
                      marginBottom: 8,
                    }}
                  >
                    {post.title}
                  </p>
                  <p
                    style={{
                      fontFamily: "var(--fb)",
                      fontSize: 13,
                      color: "var(--t3)",
                      lineHeight: 1.6,
                    }}
                  >
                    {post.excerpt}
                  </p>
                </div>
                <div style={{ textAlign: "right", flexShrink: 0 }}>
                  <p
                    style={{
                      fontFamily: "var(--fm)",
                      fontSize: 10,
                      color: "var(--t4)",
                      marginBottom: 4,
                    }}
                  >
                    {post.date}
                  </p>
                  <p
                    style={{
                      fontFamily: "var(--fm)",
                      fontSize: 10,
                      color: "var(--t4)",
                    }}
                  >
                    {post.read} read
                  </p>
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
