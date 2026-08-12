"use client";

import Link from "next/link";
import { FormEvent, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import styles from "./page.module.css";

export default function SignUpPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");
  const [isError, setIsError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  async function handleSignUp(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    setMessage("");
    setIsError(false);

    if (password !== confirmPassword) {
      setMessage("Adgangskoderne er ikke ens.");
      setIsError(true);
      return;
    }

    if (password.length < 6) {
      setMessage("Adgangskoden skal indeholde mindst 6 tegn.");
      setIsError(true);
      return;
    }

    setIsLoading(true);

    try {
      const supabase = createClient();

      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          emailRedirectTo: `${window.location.origin}/auth/confirm`,
          data: {
            full_name: name,
          },
        },
      });

      if (error) {
        setMessage(error.message);
        setIsError(true);
        return;
      }

      if (data.user?.identities?.length === 0) {
        setMessage(
          "Der findes allerede en bruger med denne e-mailadresse."
        );
        setIsError(true);
        return;
      }

      setMessage(
        "Din bruger er oprettet. Tjek din e-mail, og klik på bekræftelseslinket."
      );
      setIsError(false);

      setName("");
      setEmail("");
      setPassword("");
      setConfirmPassword("");
    } catch {
      setMessage(
        "Der opstod en uventet fejl. Prøv venligst igen."
      );
      setIsError(true);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <main className={styles.page}>
      <section className={styles.card}>
        <div className={styles.intro}>
          <Link href="/" className={styles.logo}>
            TheraLearn
          </Link>

          <p className={styles.eyebrow}>Opret bruger</p>

          <h1 className={styles.title}>
            Start din læring
          </h1>

          <p className={styles.description}>
            Opret en bruger og få adgang til pensum, quizzer og
            dine personlige resultater.
          </p>
        </div>

        <form className={styles.form} onSubmit={handleSignUp}>
          <div className={styles.field}>
            <label htmlFor="name" className={styles.label}>
              Navn
            </label>

            <input
              id="name"
              name="name"
              type="text"
              autoComplete="name"
              className={styles.input}
              value={name}
              onChange={(event) => setName(event.target.value)}
              required
            />
          </div>

          <div className={styles.field}>
            <label htmlFor="email" className={styles.label}>
              E-mail
            </label>

            <input
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              className={styles.input}
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              required
            />
          </div>

          <div className={styles.field}>
            <label htmlFor="password" className={styles.label}>
              Adgangskode
            </label>

            <input
              id="password"
              name="password"
              type="password"
              autoComplete="new-password"
              className={styles.input}
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              minLength={6}
              required
            />
          </div>

          <div className={styles.field}>
            <label
              htmlFor="confirmPassword"
              className={styles.label}
            >
              Gentag adgangskode
            </label>

            <input
              id="confirmPassword"
              name="confirmPassword"
              type="password"
              autoComplete="new-password"
              className={styles.input}
              value={confirmPassword}
              onChange={(event) =>
                setConfirmPassword(event.target.value)
              }
              minLength={6}
              required
            />
          </div>

          {message ? (
            <p
              className={
                isError ? styles.errorMessage : styles.successMessage
              }
              role={isError ? "alert" : "status"}
            >
              {message}
            </p>
          ) : null}

          <button
            type="submit"
            className={styles.button}
            disabled={isLoading}
          >
            {isLoading ? "Opretter bruger..." : "Opret bruger"}
          </button>
        </form>

        <p className={styles.loginText}>
          Har du allerede en bruger?{" "}
          <Link href="/login" className={styles.loginLink}>
            Log ind
          </Link>
        </p>
      </section>
    </main>
  );
}