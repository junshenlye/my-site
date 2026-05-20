import type { Metadata } from "next";
import Link from "next/link";
import Nav from "../../components/Nav";
import { getBlogPost, getBlogPosts } from "../../../lib/content";

export async function generateStaticParams() {
  return getBlogPosts().map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const { meta } = getBlogPost(slug);
  const title = `${meta.title} | Jun Shen`;

  return {
    title,
    description: meta.description,
    openGraph: {
      title,
      description: meta.description,
      type: "article",
      publishedTime: meta.date,
    },
    twitter: {
      card: "summary",
      title,
      description: meta.description,
    },
  };
}

function fmtDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-SG", { day: "numeric", month: "long", year: "numeric" });
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const { meta, html } = getBlogPost(slug);

  return (
    <div style={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}>
      <Nav />
      <main style={{ flex: 1 }}>
        <div style={{ maxWidth: 720, margin: "0 auto", padding: "clamp(32px,5vw,56px) 20px 96px" }}>

          {/* Back */}
          <Link href="/blog" style={{ fontFamily: "var(--fm)", fontSize: 10, letterSpacing: "0.12em", textTransform: "uppercase", color: "var(--t4)", textDecoration: "none", display: "inline-block", marginBottom: 36 }}>
            ← Blog
          </Link>

          {/* Post header */}
          <div style={{ marginBottom: 40, paddingBottom: 32, borderBottom: "1px solid var(--b1)" }}>
            <p style={{ fontFamily: "var(--fm)", fontSize: 9, letterSpacing: "0.16em", textTransform: "uppercase", color: "var(--ac)", marginBottom: 14 }}>
              {meta.category}
            </p>
            <h1 style={{ fontFamily: "var(--fm)", fontSize: "clamp(24px,4vw,34px)", fontWeight: 600, letterSpacing: "-0.03em", color: "var(--t1)", lineHeight: 1.12, marginBottom: 16 }}>
              {meta.title}
            </h1>
            <p style={{ fontFamily: "var(--fb)", fontSize: 14, color: "var(--t3)", lineHeight: 1.6, marginBottom: 16 }}>
              {meta.description}
            </p>
            <div style={{ display: "flex", gap: 16, alignItems: "center" }}>
              <span style={{ fontFamily: "var(--fm)", fontSize: 10, color: "var(--t4)" }}>{fmtDate(meta.date)}</span>
              <span style={{ width: 3, height: 3, borderRadius: "50%", backgroundColor: "var(--b2)", display: "inline-block" }} />
              <span style={{ fontFamily: "var(--fm)", fontSize: 10, color: "var(--t4)" }}>{meta.readTime} min read</span>
            </div>
          </div>

          {/* Post body — your HTML file rendered here */}
          <div className="post-body" dangerouslySetInnerHTML={{ __html: html }} />

        </div>
      </main>

      {/* Post body typography */}
      <style>{`
        .post-body { color: var(--t2); font-family: var(--fb); font-size: 16px; line-height: 1.78; }
        .post-body h2 { font-family: var(--fm); font-size: 18px; font-weight: 600; letter-spacing: -0.02em; color: var(--t1); margin: 2.2em 0 0.8em; }
        .post-body h2 a {
          color: var(--t1);
          text-decoration: none;
          display: inline-flex;
          align-items: center;
          gap: 8px;
          transition: color 0.15s ease, gap 0.15s ease;
        }
        .post-body h2 a::after {
          content: "↗";
          font-size: 14px;
          color: var(--ac);
          transform: translateY(-1px);
        }
        .post-body h2 a:hover {
          color: var(--ac);
          gap: 10px;
        }
        .post-body h3 { font-family: var(--fm); font-size: 14px; font-weight: 500; letter-spacing: -0.01em; color: var(--t1); margin: 1.8em 0 0.6em; }
        .post-body p  { margin-bottom: 1.4em; }
        .post-body p:last-child { margin-bottom: 0; }
        .post-body a  { color: var(--ac); text-decoration: underline; text-underline-offset: 2px; }
        .post-body strong { font-weight: 500; color: var(--t1); }
        .post-body em { font-style: italic; }
        .post-body code { font-family: var(--fm); font-size: 13px; background: var(--s2); padding: 1px 5px; border-radius: 2px; }
        .post-body pre  { background: var(--s2); border: 1px solid var(--b1); border-radius: 6px; padding: 18px 20px; overflow-x: auto; margin: 1.6em 0; }
        .post-body pre code { background: none; padding: 0; font-size: 13px; line-height: 1.6; }
        .post-body ol, .post-body ul { padding-left: 1.4em; margin-bottom: 1.4em; }
        .post-body li  { margin-bottom: 0.4em; }
        .post-body blockquote { border-left: 3px solid var(--ac); padding-left: 18px; margin: 1.6em 0; color: var(--t3); font-style: italic; }
        .post-body img { max-width: 100%; border-radius: 6px; margin: 1.6em 0; }
        .post-body .article-figure {
          width: min(100%, 380px);
          margin: 2em auto;
        }
        .post-body .article-figure--aside {
          width: min(42%, 320px);
        }
        .post-body .article-figure--standalone {
          width: min(100%, 360px);
          float: none;
          margin: 1.8em auto;
        }
        .post-body .article-figure--aside-right {
          float: right;
          margin: 0.3em 0 1.25em 28px;
        }
        .post-body .article-figure img {
          display: block;
          width: 100%;
          height: auto;
          margin: 0;
          border: 1px solid var(--b1);
          background: var(--bg);
        }
        .post-body .article-figure figcaption {
          margin-top: 0.75em;
          font-family: var(--fm);
          font-size: 10px;
          line-height: 1.4;
          letter-spacing: 0.04em;
          text-align: center;
          font-weight: 600;
          color: var(--t3);
        }
        .post-body::after {
          content: "";
          display: block;
          clear: both;
        }
        .post-body hr  { border: none; border-top: 1px solid var(--b1); margin: 2.4em 0; }
        @media (max-width: 720px) {
          .post-body .article-figure,
          .post-body .article-figure--aside {
            width: min(100%, 300px);
            float: none;
            margin: 1.6em auto;
          }
          .post-body .article-figure--standalone {
            width: min(100%, 300px);
          }
        }
      `}</style>

      <footer style={{ borderTop: "1px solid var(--b1)" }}>
        <div style={{ maxWidth: 720, margin: "0 auto", padding: "18px 20px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <span style={{ fontFamily: "var(--fm)", fontSize: 11, color: "var(--t4)" }}>jun<span style={{ color: "var(--ac)" }}>_</span>shen</span>
          <Link href="/blog" style={{ fontFamily: "var(--fm)", fontSize: 10, color: "var(--t4)", textDecoration: "none", letterSpacing: "0.08em", textTransform: "uppercase" }}>← All posts</Link>
        </div>
      </footer>
    </div>
  );
}
