import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "The Dumb Charades Marquee — movies for your next charades night";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          background:
            "radial-gradient(ellipse 80% 60% at 50% 0%, rgba(244,201,93,0.18), transparent 60%), #0e0b08",
          color: "#f2e8d5",
          fontFamily: "serif",
          padding: "60px",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            border: "3px solid #f4c95d",
            borderRadius: "48px",
            padding: "60px 90px",
            boxShadow: "inset 0 0 80px rgba(0,0,0,0.6)",
            background: "rgba(26, 15, 12, 0.85)",
          }}
        >
          <div
            style={{
              fontSize: 22,
              letterSpacing: 8,
              color: "#8a7e6a",
              textTransform: "uppercase",
              marginBottom: 20,
            }}
          >
            ⸺ Tonight, one act only ⸺
          </div>
          <div
            style={{
              fontSize: 110,
              fontWeight: 700,
              lineHeight: 1,
              color: "#f4c95d",
              textAlign: "center",
            }}
          >
            The Dumb Charades
          </div>
          <div
            style={{
              fontSize: 110,
              fontStyle: "italic",
              lineHeight: 1.1,
              color: "#f2e8d5",
              textAlign: "center",
            }}
          >
            Marquee
          </div>
          <div
            style={{
              marginTop: 40,
              fontSize: 28,
              color: "#f2e8d5",
              opacity: 0.85,
              textAlign: "center",
              maxWidth: 800,
            }}
          >
            250+ Bollywood &amp; Hollywood movies for your next charades night.
          </div>
        </div>
      </div>
    ),
    { ...size },
  );
}
