import styles from './Taskbar.module.css';

export function Taskbar({ windows = [], focusedId, onWindowClick }) {
  return (
    <div className={styles.taskbar}>
      <div className={styles.windowList}>
        {windows.map((window) => (
          <button
            key={window.id}
            className={`${styles.windowButton} ${
              window.id === focusedId ? styles.active : ''
            } ${window.minimized ? styles.minimized : ''}`}
            onClick={() => onWindowClick?.(window.id)}
            title={window.title}
          >
            {window.icon && (
              <img src={window.icon} alt="" className={styles.icon} />
            )}
            <span className={styles.title}>{window.title}</span>
          </button>
        ))}
      </div>
    </div>
  );
}

export default Taskbar;
