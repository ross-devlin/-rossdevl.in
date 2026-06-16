import { useState, useCallback } from 'react';
import { TitleBar } from '../TitleBar';
import { useDraggable } from '../../hooks/useDraggable';
import styles from './Window.module.css';

const MIN_WIDTH = 200;
const MIN_HEIGHT = 100;

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
  onSizeChange,
  draggable = true,
  resizable = false,
  style,
}) {
  const { position, isDragging, handlers } = useDraggable({
    initialPosition,
    bounds: 'viewport',
    onDragStart: onFocus,
    onDragEnd: onPositionChange,
    disabled: !draggable,
  });

  const [isResizing, setIsResizing] = useState(false);

  const handleResizeStart = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsResizing(true);

    const startX = e.clientX;
    const startY = e.clientY;
    const startWidth = size.width;
    const startHeight = size.height;

    const handleMouseMove = (moveEvent) => {
      const newWidth = Math.max(MIN_WIDTH, startWidth + (moveEvent.clientX - startX));
      const newHeight = Math.max(MIN_HEIGHT, startHeight + (moveEvent.clientY - startY));
      onSizeChange?.({ width: newWidth, height: newHeight });
    };

    const handleMouseUp = () => {
      setIsResizing(false);
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
  }, [size, onSizeChange]);

  if (minimized) {
    return null;
  }

  return (
    <div
      className={`${styles.window} ${focused ? styles.focused : ''} ${isDragging || isResizing ? styles.dragging : ''}`}
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
      {resizable && (
        <div
          className={styles.resizeHandle}
          onMouseDown={handleResizeStart}
        />
      )}
    </div>
  );
}

export default Window;
