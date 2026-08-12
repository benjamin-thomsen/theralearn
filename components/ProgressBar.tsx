import styles from "./ProgressBar.module.css";

type ProgressBarProps = {
  value: number;
  max?: number;
  label?: string;
  showPercentage?: boolean;
};

export default function ProgressBar({
  value,
  max = 100,
  label,
  showPercentage = true,
}: ProgressBarProps) {
  const safeMax = max > 0 ? max : 100;
  const safeValue = Math.min(Math.max(value, 0), safeMax);
  const percentage = Math.round((safeValue / safeMax) * 100);

  return (
    <div className={styles.wrapper}>
      {(label || showPercentage) && (
        <div className={styles.header}>
          {label && <span className={styles.label}>{label}</span>}

          {showPercentage && (
            <span className={styles.percentage}>{percentage}%</span>
          )}
        </div>
      )}

      <div
        className={styles.track}
        role="progressbar"
        aria-label={label ?? "Fremgang"}
        aria-valuemin={0}
        aria-valuemax={safeMax}
        aria-valuenow={safeValue}
      >
        <div
          className={styles.fill}
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
}