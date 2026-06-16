import { useState } from 'react';
import styles from './DesignWindow.module.css';

export function DesignWindow() {
  const [loaded, setLoaded] = useState(false);

  return (
    <div className={styles.content}>
      {loaded ? (
        <iframe
          src="/RTD design portfolio 2025_compressed.pdf"
          className={styles.pdf}
          title="RTD Design Portfolio 2025"
        />
      ) : (
        <div className={styles.placeholder}>
          <button className={styles.loadButton} onClick={() => setLoaded(true)}>
            View Design Portfolio
          </button>
        </div>
      )}
    </div>
  );
}

export default DesignWindow;
