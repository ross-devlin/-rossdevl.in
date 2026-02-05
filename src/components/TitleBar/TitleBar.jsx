import { WindowControls } from '../WindowControls';
import styles from './TitleBar.module.css';

export function TitleBar({
  title,
  icon,
  focused = true,
  onMinimize,
  onMaximize,
  onClose,
  onMouseDown,
}) {
  return (
    <div
      className={`${styles.titleBar} ${focused ? styles.focused : styles.unfocused}`}
      onMouseDown={onMouseDown}
    >
      {icon && <img src={icon} alt="" className={styles.icon} />}
      <span className={styles.title}>{title}</span>
      <WindowControls
        onMinimize={onMinimize}
        onMaximize={onMaximize}
        onClose={onClose}
        focused={focused}
      />
    </div>
  );
}

export default TitleBar;
