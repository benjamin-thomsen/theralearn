type ResultatCardProps = {
  quizTitel: string;
  antalRigtige: number;
  antalSpoergsmaal: number;
};

export default function ResultatCard({
  quizTitel,
  antalRigtige,
  antalSpoergsmaal,
}: ResultatCardProps) {
  const samletAntal = Math.max(0, antalSpoergsmaal);
  const rigtigeSvar = Math.min(Math.max(0, antalRigtige), samletAntal);
  const antalForkerte = samletAntal - rigtigeSvar;

  const procent =
    samletAntal > 0 ? Math.round((rigtigeSvar / samletAntal) * 100) : 0;

  let feedback = "Prøv quizzen igen og styrk din forståelse af emnet.";

  if (procent >= 80) {
    feedback = "Flot resultat! Du har en rigtig god forståelse af emnet.";
  } else if (procent >= 50) {
    feedback = "Godt arbejde! Du er godt på vej, men kan stadig forbedre dig.";
  }

  return (
    <article>
      <p>Gennemført quiz</p>

      <h2>{quizTitel}</h2>

      <p>{procent}%</p>

      <p>{feedback}</p>

      <dl>
        <div>
          <dt>Rigtige svar</dt>
          <dd>{rigtigeSvar}</dd>
        </div>

        <div>
          <dt>Forkerte svar</dt>
          <dd>{antalForkerte}</dd>
        </div>

        <div>
          <dt>Antal spørgsmål</dt>
          <dd>{samletAntal}</dd>
        </div>
      </dl>
    </article>
  );
}