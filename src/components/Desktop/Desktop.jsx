import styles from './Desktop.module.css';

export function Desktop({ backgroundUrl, children, onMouseDown }) {
  return (
    <div
      className={styles.desktop}
      style={backgroundUrl ? { backgroundImage: `url(${backgroundUrl})` } : undefined}
      onMouseDown={onMouseDown}
    >
      <div className={styles.identity}>
        <h1 className={styles.name}>Ross Devlin</h1>
        <p className={styles.role}>writer and producer</p>
        <p className={styles.location}>Ridgewood, NY</p>
      </div>
      {children}
    </div>
  );
}

export default Desktop;
