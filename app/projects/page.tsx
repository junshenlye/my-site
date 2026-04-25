import Nav from "../components/Nav";

export default function ProjectsPage() {
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

          <div style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: 40 }}>
            <span style={{ fontFamily: "var(--fm)", fontSize: 9, letterSpacing: "0.18em", textTransform: "uppercase", color: "var(--t4)", whiteSpace: "nowrap" }}>
              Status
            </span>
            <div style={{ flex: 1, height: 1, backgroundColor: "var(--b1)" }} />
          </div>

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
              Projects are being documented.
            </p>
            <p style={{ fontFamily: "var(--fb)", fontSize: 13, color: "var(--t4)", lineHeight: 1.65, maxWidth: 340 }}>
              A few things are already built — writeups coming soon.
            </p>
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
