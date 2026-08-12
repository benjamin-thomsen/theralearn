import Link from "next/link";
import styles from "./Button.module.css";

type ButtonProps = {
  children: React.ReactNode;
  href?: string;
  onClick?: () => void;
  type?: "button" | "submit" | "reset";
  variant?: "primary" | "secondary";
  disabled?: boolean;
};

export default function Button({
  children,
  href,
  onClick,
  type = "button",
  variant = "primary",
  disabled = false,
}: ButtonProps) {
  const className =
    variant === "secondary"
      ? `${styles.button} ${styles.secondary}`
      : `${styles.button} ${styles.primary}`;

  if (href) {
    return (
      <Link href={href} className={className}>
        {children}
      </Link>
    );
  }

  return (
    <button
      type={type}
      onClick={onClick}
      className={className}
      disabled={disabled}
    >
      {children}
    </button>
  );
}