import { TitleBar } from '../TitleBar';
import { useDraggable } from '../../hooks/useDraggable';
import styles from './Window.module.css';

export function Window({
  id,
  title,
  icon,
  initialPosition = { x: 50, y: 50 },
  size = { width: 400, height: 300 },
  focused = true,
  minimized = false,
  children,
  onFocus,
  onMinimize,
  onMaximize,
  onClose,
  onPositionChange,
  draggable = true,
  style,
}) {
  const { position, isDragging, handlers } = useDraggable({
    initialPosition,
    bounds: 'viewport',
    onDragStart: onFocus,
    onDragEnd: onPositionChange,
    disabled: !draggable,
  });

  if (minimized) {
    return null;
  }

  return (
    <div
      className={`${styles.window} ${focused ? styles.focused : ''} ${isDragging ? styles.dragging : ''}`}
      style={{
        left: position.x,
        top: position.y,
        width: size.width,
        height: size.height,
        ...style,
      }}
      onMouseDown={onFocus}
      role="dialog"
      aria-labelledby={`window-title-${id}`}
    >
      <TitleBar
        title={title}
        icon={icon}
        focused={focused}
        onMinimize={onMinimize}
        onMaximize={onMaximize}
        onClose={onClose}
        onMouseDown={handlers.onMouseDown}
      />
      <div className={styles.content}>{children}</div>
    </div>
  );
}

export default Window;
