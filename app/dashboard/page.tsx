import Link from "next/link";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";

export default async function DashboardPage() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  return (
    <main>
      <section>
        <p>Min læring</p>

        <h1>Velkommen til TheraLearn</h1>

        <p>
          Du er logget ind med e-mailadressen{" "}
          <strong>{user.email ?? "Ukendt e-mail"}</strong>.
        </p>

        <p>
          Her kommer dit personlige dashboard med pensum, quizzer og
          læringsresultater.
        </p>

        <nav aria-label="MVP user-test workflows">
          <ul>
            <li><Link href="/creator-objective">Åbn Creator-workflow</Link></li>
            <li><Link href="/learner-handoff">Åbn Learner-kontekst</Link></li>
          </ul>
        </nav>

        <Link href="/">Gå til forsiden</Link>
      </section>
    </main>
  );
}
