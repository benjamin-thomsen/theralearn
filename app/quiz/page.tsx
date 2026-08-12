import Link from "next/link";
import Header from "../../components/Header";
import Footer from "../../components/Footer";

export default function QuizPage() {
  return (
    <>
      <Header />

      <main
        style={{
          maxWidth: "900px",
          margin: "0 auto",
          padding: "3rem 1.5rem",
        }}
      >
        <h1>Quiz</h1>

        <p style={{ marginTop: "1rem", lineHeight: 1.7 }}>
          Velkommen til TheraLearn Quiz.
        </p>

        <p style={{ marginTop: "1rem", lineHeight: 1.7 }}>
          Her vil du senere kunne teste din viden inden for psykologi og
          psykoterapi med interaktive quizzer.
        </p>

        <div style={{ marginTop: "2rem" }}>
          <Link href="/pensum">← Tilbage til pensum</Link>
        </div>
      </main>

      <Footer />
    </>
  );
}