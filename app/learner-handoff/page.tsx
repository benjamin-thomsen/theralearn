import Link from "next/link";
import { redirect } from "next/navigation";

import LearnerApprovedPackageHydrationBoundary from "@/components/LearnerApprovedPackageHydrationBoundary";
import {
  requireOwnedApprovedAuthorityPackage,
  serializeApprovedAuthorityPackage,
  SupabaseApprovedPackageReader,
} from "@/lib/approved-package/approvedPackageRepository";
import { createClient } from "@/lib/supabase/server";
import type { ApprovedAuthorityPackage } from "@/lib/approved-package/approvedPackageRepository";

export default async function LearnerHandoffPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect("/login");

  let authorityPackage: ApprovedAuthorityPackage | null = null;
  try {
    authorityPackage = await requireOwnedApprovedAuthorityPackage(
      new SupabaseApprovedPackageReader(supabase),
      user.id,
    );
  } catch {
    authorityPackage = null;
  }

  if (!authorityPackage) {
    return (
      <main>
        <section>
          <p>Learner-kontekst</p>
          <h1>Ingen godkendt læringsaktivitet er tilgængelig</h1>
          <p>Den godkendte pakke mangler eller kunne ikke valideres.</p>
          <Link href="/dashboard">Tilbage til dashboard</Link>
        </section>
      </main>
    );
  }

  const serializedPackage = serializeApprovedAuthorityPackage(authorityPackage);
  return (
    <main>
      <section>
        <p>Learner-kontekst</p>
        <h1>Godkendt læringsaktivitet</h1>
        <LearnerApprovedPackageHydrationBoundary serializedPackage={serializedPackage} />
        <Link href="/dashboard">Tilbage til dashboard</Link>
      </section>
    </main>
  );
}
