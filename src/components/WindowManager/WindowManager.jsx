import { Desktop } from '../Desktop';
import { Window } from '../Window';
import { Taskbar } from '../Taskbar';
import { useWindowManager } from './WindowManagerContext';
import styles from './WindowManager.module.css';

export function WindowManager({ backgroundUrl, children }) {
  const {
    windows,
    focusedId,
    focusWindow,
    minimizeWindow,
    closeWindow,
    toggleMinimize,
    updateWindowPosition,
  } = useWindowManager();

  const windowArray = Array.from(windows.values());
  const taskbarWindows = windowArray.map((w) => ({
    id: w.id,
    title: w.title,
    icon: w.icon,
    minimized: w.minimized,
  }));

  const handleDesktopClick = (e) => {
    // Only unfocus if clicking directly on desktop
    if (e.target === e.currentTarget) {
      // Could unfocus all windows here if desired
    }
  };

  return (
    <div className={styles.container}>
      <Desktop backgroundUrl={backgroundUrl} onMouseDown={handleDesktopClick}>
        {windowArray.map((win) => {
          const WindowContent = win.component;

          return (
            <Window
              key={win.id}
              id={win.id}
              title={win.title}
              icon={win.icon}
              initialPosition={win.position}
              size={win.size}
              focused={win.id === focusedId}
              minimized={win.minimized}
              style={{ zIndex: win.zIndex }}
              onFocus={() => focusWindow(win.id)}
              onMinimize={() => minimizeWindow(win.id)}
              onClose={() => closeWindow(win.id)}
              onPositionChange={(pos) => updateWindowPosition(win.id, pos)}
            >
              {WindowContent ? (
                <WindowContent {...(win.props || {})} />
              ) : (
                win.content
              )}
            </Window>
          );
        })}
        {children}
      </Desktop>
      <Taskbar
        windows={taskbarWindows}
        focusedId={focusedId}
        onWindowClick={toggleMinimize}
      />
    </div>
  );
}

export default WindowManager;
