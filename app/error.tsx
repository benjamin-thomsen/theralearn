"use client";

import { useEffect } from "react";
import Link from "next/link";

type ErrorPageProps = {
  error: Error & {
    digest?: string;
  };
  reset: () => void;
};

export default function ErrorPage({ error, reset }: ErrorPageProps) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <main
      style={{
        minHeight: "70vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "48px 24px",
        backgroundColor: "#f7f8f4",
        color: "#1f2d29",
      }}
    >
      <section
        style={{
          width: "100%",
          maxWidth: "640px",
          padding: "48px 32px",
          textAlign: "center",
          backgroundColor: "#ffffff",
          border: "1px solid #dfe7e2",
          borderRadius: "24px",
          boxShadow: "0 18px 50px rgba(31, 78, 67, 0.08)",
        }}
      >
        <p
          style={{
            margin: "0 0 12px",
            color: "#52776d",
            fontSize: "0.85rem",
            fontWeight: 700,
            letterSpacing: "0.12em",
            textTransform: "uppercase",
          }}
        >
          Der opstod en fejl
        </p>

        <h1
          style={{
            margin: "0 0 16px",
            color: "#1f4e43",
            fontSize: "clamp(2rem, 5vw, 3rem)",
            lineHeight: 1.1,
          }}
        >
          Noget gik galt
        </h1>

        <p
          style={{
            margin: "0 auto 32px",
            maxWidth: "500px",
            color: "#56645f",
            fontSize: "1.05rem",
            lineHeight: 1.7,
          }}
        >
          Siden kunne ikke indlæses korrekt. Du kan prøve igen eller gå tilbage
          til forsiden.
        </p>

        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "center",
            gap: "12px",
          }}
        >
          <button
            type="button"
            onClick={reset}
            style={{
              padding: "13px 22px",
              border: "none",
              borderRadius: "999px",
              backgroundColor: "#1f4e43",
              color: "#ffffff",
              font: "inherit",
              fontWeight: 700,
              cursor: "pointer",
            }}
          >
            Prøv igen
          </button>

          <Link
            href="/"
            style={{
              padding: "12px 22px",
              border: "1px solid #1f4e43",
              borderRadius: "999px",
              color: "#1f4e43",
              fontWeight: 700,
              textDecoration: "none",
            }}
          >
            Gå til forsiden
          </Link>
        </div>
      </section>
    </main>
  );
}