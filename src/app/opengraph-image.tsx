import { ImageResponse } from "next/og";

export const alt = "Astor Systems — Better Systems. Smarter Operations.";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: 80,
          background: "#0a1120",
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.05) 1px, transparent 1px)",
          backgroundSize: "48px 48px",
          color: "white",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
          <svg width="56" height="56" viewBox="0 0 32 32" fill="none">
            <path d="M8 24 L16 8 L24 24 M11.5 18.5 H20.5" stroke="#fff" strokeWidth="2" strokeLinecap="round" />
            <circle cx="16" cy="8" r="2.4" fill="#2c5cff" />
            <circle cx="8" cy="24" r="2.4" fill="#fff" />
            <circle cx="24" cy="24" r="2.4" fill="#fff" />
          </svg>
          <span style={{ fontSize: 34, fontWeight: 600 }}>Astor Systems</span>
        </div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <span style={{ fontSize: 84, fontWeight: 700, letterSpacing: -2, lineHeight: 1.05 }}>Better Systems.</span>
          <span style={{ fontSize: 84, fontWeight: 700, letterSpacing: -2, lineHeight: 1.05, color: "#9aa5bd" }}>
            Smarter Operations.
          </span>
        </div>
        <span style={{ fontSize: 26, color: "#6b8fff", letterSpacing: 2 }}>BUSINESS TECHNOLOGY &amp; AUTOMATION</span>
      </div>
    ),
    size,
  );
}
