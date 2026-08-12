import styles from "./ValueCard.module.css";

type ValueCardProps = {
  title: string;
  description: string;
};

export default function ValueCard({
  title,
  description,
}: ValueCardProps) {
  return (
    <article className={styles.card}>
      <h3 className={styles.title}>{title}</h3>
      <p className={styles.description}>{description}</p>
    </article>
  );
}