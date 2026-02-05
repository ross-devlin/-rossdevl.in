import styles from './Desktop.module.css';

export function Desktop({ backgroundUrl, children, onMouseDown }) {
  return (
    <div
      className={styles.desktop}
      style={backgroundUrl ? { backgroundImage: `url(${backgroundUrl})` } : undefined}
      onMouseDown={onMouseDown}
    >
      {children}
    </div>
  );
}

export default Desktop;
