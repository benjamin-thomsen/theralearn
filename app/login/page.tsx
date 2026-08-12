"use client";

import Link from "next/link";
import { FormEvent, Suspense, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import styles from "./page.module.css";

function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loginMessage, setLoginMessage] = useState("");
  const [isError, setIsError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const confirmationMessage = searchParams.get("message");
  const confirmationError = searchParams.get("error");
  const isConfirmed = searchParams.get("confirmed") === "true";

  let pageMessage = "";

  if (confirmationError) {
    pageMessage = confirmationError;
  } else if (confirmationMessage) {
    pageMessage = confirmationMessage;
  } else if (isConfirmed) {
    pageMessage =
      "Din e-mailadresse er bekræftet. Du kan nu logge ind på din konto.";
  }

  async function handleLogin(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    setLoginMessage("");
    setIsError(false);
    setIsLoading(true);

    const supabase = createClient();

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      setLoginMessage(
        "Login mislykkedes. Kontrollér din e-mailadresse og adgangskode."
      );
      setIsError(true);
      setIsLoading(false);
      return;
    }

    router.push("/dashboard");
    router.refresh();
  }

  return (
    <main className={styles.page}>
      <section className={styles.loginCard}>
        <div className={styles.logoArea}>
          <Link href="/" className={styles.logo}>
            TheraLearn
          </Link>
        </div>

        <div className={styles.heading}>
          <p className={styles.eyebrow}>Velkommen tilbage</p>
          <h1>Log ind</h1>
          <p>
            Log ind for at fortsætte din læring og se dine resultater.
          </p>
        </div>

        {pageMessage && (
          <div
            className={
              confirmationError ? styles.errorMessage : styles.successMessage
            }
          >
            {pageMessage}
          </div>
        )}

        {loginMessage && (
          <div
            className={isError ? styles.errorMessage : styles.successMessage}
          >
            {loginMessage}
          </div>
        )}

        <form className={styles.form} onSubmit={handleLogin}>
          <div className={styles.formGroup}>
            <label htmlFor="email">E-mailadresse</label>
            <input
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              placeholder="navn@eksempel.dk"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              required
            />
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="password">Adgangskode</label>
            <input
              id="password"
              name="password"
              type="password"
              autoComplete="current-password"
              placeholder="Indtast din adgangskode"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              required
            />
          </div>

          <button
            type="submit"
            className={styles.submitButton}
            disabled={isLoading}
          >
            {isLoading ? "Logger ind..." : "Log ind"}
          </button>
        </form>

        <p className={styles.signupText}>
          Har du ikke en konto?{" "}
          <Link href="/signup">Opret en konto</Link>
        </p>

        <Link href="/" className={styles.backLink}>
          Tilbage til forsiden
        </Link>
      </section>
    </main>
  );
}

export default function LoginPage() {
  return (
    <Suspense
      fallback={
        <main className={styles.page}>
          <section className={styles.loginCard}>
            <p>Indlæser login...</p>
          </section>
        </main>
      }
    >
      <LoginForm />
    </Suspense>
  );
}