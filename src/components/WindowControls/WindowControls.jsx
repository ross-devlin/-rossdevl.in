import styles from './WindowControls.module.css';

export function WindowControls({
  onMinimize,
  onMaximize,
  onClose,
  disabled = false,
  focused = true,
}) {
  return (
    <div className={styles.controls}>
      <button
        className={`${styles.button} ${styles.minimize}`}
        onClick={onMinimize}
        disabled={disabled}
        aria-label="Minimize window"
        tabIndex={focused ? 0 : -1}
      >
        <span className={styles.icon}>_</span>
      </button>
      <button
        className={`${styles.button} ${styles.maximize}`}
        onClick={onMaximize}
        disabled={disabled}
        aria-label="Maximize window"
        tabIndex={focused ? 0 : -1}
      >
        <span className={styles.icon}>□</span>
      </button>
      <button
        className={`${styles.button} ${styles.close}`}
        onClick={onClose}
        disabled={disabled}
        aria-label="Close window"
        tabIndex={focused ? 0 : -1}
      >
        <span className={styles.icon}>×</span>
      </button>
    </div>
  );
}

export default WindowControls;
