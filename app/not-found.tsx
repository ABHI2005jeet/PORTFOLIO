import Link from "next/link";

export default function NotFound() {
  return <section className="pageShell" style={{ minHeight: "65svh", display: "flex", flexDirection: "column", justifyContent: "center", paddingBlock: "5rem" }}>
    <p className="sectionEyebrow">404 / Not found</p>
    <h1 style={{ marginTop: "1.5rem", fontFamily: "var(--font-display)", fontSize: "clamp(3.5rem, 9vw, 7rem)", fontWeight: 400, letterSpacing: "-0.06em" }}>This page<br /><em style={{ color: "var(--ice)" }}>isn’t here.</em></h1>
    <p style={{ marginTop: "1.5rem", color: "var(--mist)" }}>The link may have changed, or this page was never published.</p>
    <Link href="/work" className="linkUnderline" style={{ width: "fit-content", marginTop: "1rem" }}>Browse selected work <span aria-hidden="true">↗</span></Link>
  </section>;
}
