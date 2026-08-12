import { ImageResponse } from "next/og";

export const size = {
  width: 1200,
  height: 630,
};

export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          background:
            "linear-gradient(135deg, #1f4e43 0%, #508676 100%)",
          color: "#ffffff",
          fontFamily: "Arial, sans-serif",
        }}
      >
        <div
          style={{
            fontSize: 88,
            fontWeight: 700,
            marginBottom: 24,
          }}
        >
          TheraLearn
        </div>

        <div
          style={{
            fontSize: 36,
            opacity: 0.9,
          }}
        >
          Lær psykologi – ét emne ad gangen
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}