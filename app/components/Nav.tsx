"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const links = [
  { label: "Blog", href: "/blog" },
  { label: "Projects", href: "/projects" },
  { label: "Experience", href: "/experience" },
];

export default function Nav() {
  const pathname = usePathname();

  return (
    <>
      <style>{`
        .site-nav-inner {
          max-width: 1080px;
          margin: 0 auto;
          padding: 0 32px;
          height: 52px;
          display: flex;
          align-items: center;
          justify-content: space-between;
        }

        .site-nav-links {
          display: flex;
          align-items: center;
          gap: 28px;
        }

        @media (max-width: 640px) {
          .site-nav-inner {
            padding: 0 16px;
            height: 56px;
          }

          .site-nav-links {
            gap: 14px;
          }
        }
      `}</style>

      <nav
        style={{
          borderBottom: "1px solid var(--b1)",
          backgroundColor: "var(--bg)",
          position: "sticky",
          top: 0,
          zIndex: 10,
        }}
      >
      <div
        className="site-nav-inner"
      >
        <Link
          href="/"
          style={{
            fontFamily: "var(--fm)",
            fontSize: 16,
            fontWeight: 600,
            letterSpacing: "-0.02em",
            color: "var(--t1)",
            textDecoration: "none",
          }}
        >
          jun<span style={{ color: "var(--ac)" }}>_</span>shen
        </Link>

        <div className="site-nav-links">
          {links.map(({ label, href }) => {
            const active = pathname === href || pathname.startsWith(href + "/");
            return (
              <Link
                key={href}
                href={href}
                style={{
                  fontFamily: "var(--fm)",
                  fontSize: 11,
                  fontWeight: 500,
                  letterSpacing: "0.12em",
                  textTransform: "uppercase",
                  color: active ? "var(--ac)" : "var(--t3)",
                  textDecoration: "none",
                  borderBottom: active ? "1px solid var(--ac)" : "none",
                  paddingBottom: active ? 1 : 0,
                }}
              >
                {label}
              </Link>
            );
          })}
        </div>
      </div>
      </nav>
    </>
  );
}
