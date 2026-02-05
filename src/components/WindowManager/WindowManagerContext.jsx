import { createContext, useContext, useState, useCallback, useMemo } from 'react';

const WindowManagerContext = createContext(null);

export function WindowManagerProvider({ children, initialWindows = [] }) {
  const [windows, setWindows] = useState(() => {
    const windowMap = new Map();
    initialWindows.forEach((win, index) => {
      windowMap.set(win.id, {
        ...win,
        zIndex: index,
        minimized: win.minimized ?? false,
        position: win.position ?? { x: 50 + index * 30, y: 50 + index * 30 },
        size: win.size ?? { width: 400, height: 300 },
      });
    });
    return windowMap;
  });

  const [focusedId, setFocusedId] = useState(() => {
    if (initialWindows.length > 0) {
      return initialWindows[initialWindows.length - 1].id;
    }
    return null;
  });

  const [nextZIndex, setNextZIndex] = useState(initialWindows.length);

  const createWindow = useCallback((config) => {
    const id = config.id || `window-${Date.now()}`;
    setWindows((prev) => {
      const newMap = new Map(prev);
      newMap.set(id, {
        id,
        title: config.title || 'Untitled',
        icon: config.icon,
        position: config.position ?? { x: 50, y: 50 },
        size: config.size ?? { width: 400, height: 300 },
        minimized: false,
        zIndex: nextZIndex,
        component: config.component,
        props: config.props,
      });
      return newMap;
    });
    setNextZIndex((z) => z + 1);
    setFocusedId(id);
    return id;
  }, [nextZIndex]);

  const closeWindow = useCallback((id) => {
    setWindows((prev) => {
      const newMap = new Map(prev);
      newMap.delete(id);
      return newMap;
    });
    setFocusedId((currentFocused) => {
      if (currentFocused === id) {
        // Focus the next top window
        const remaining = Array.from(windows.entries())
          .filter(([wid]) => wid !== id)
          .sort((a, b) => b[1].zIndex - a[1].zIndex);
        return remaining.length > 0 ? remaining[0][0] : null;
      }
      return currentFocused;
    });
  }, [windows]);

  const focusWindow = useCallback((id) => {
    setWindows((prev) => {
      const win = prev.get(id);
      if (!win) return prev;

      const newMap = new Map(prev);
      newMap.set(id, {
        ...win,
        zIndex: nextZIndex,
        minimized: false, // Restore if minimized
      });
      return newMap;
    });
    setNextZIndex((z) => z + 1);
    setFocusedId(id);
  }, [nextZIndex]);

  const minimizeWindow = useCallback((id) => {
    setWindows((prev) => {
      const win = prev.get(id);
      if (!win) return prev;

      const newMap = new Map(prev);
      newMap.set(id, { ...win, minimized: true });
      return newMap;
    });

    // Focus next visible window
    setFocusedId((currentFocused) => {
      if (currentFocused === id) {
        const visible = Array.from(windows.entries())
          .filter(([wid, w]) => wid !== id && !w.minimized)
          .sort((a, b) => b[1].zIndex - a[1].zIndex);
        return visible.length > 0 ? visible[0][0] : null;
      }
      return currentFocused;
    });
  }, [windows]);

  const updateWindowPosition = useCallback((id, position) => {
    setWindows((prev) => {
      const win = prev.get(id);
      if (!win) return prev;

      const newMap = new Map(prev);
      newMap.set(id, { ...win, position });
      return newMap;
    });
  }, []);

  const updateWindowSize = useCallback((id, size) => {
    setWindows((prev) => {
      const win = prev.get(id);
      if (!win) return prev;

      const newMap = new Map(prev);
      newMap.set(id, { ...win, size });
      return newMap;
    });
  }, []);

  const toggleMinimize = useCallback((id) => {
    const win = windows.get(id);
    if (!win) return;

    if (win.minimized) {
      focusWindow(id);
    } else {
      minimizeWindow(id);
    }
  }, [windows, focusWindow, minimizeWindow]);

  const value = useMemo(
    () => ({
      windows,
      focusedId,
      createWindow,
      closeWindow,
      focusWindow,
      minimizeWindow,
      toggleMinimize,
      updateWindowPosition,
      updateWindowSize,
    }),
    [
      windows,
      focusedId,
      createWindow,
      closeWindow,
      focusWindow,
      minimizeWindow,
      toggleMinimize,
      updateWindowPosition,
      updateWindowSize,
    ]
  );

  return (
    <WindowManagerContext.Provider value={value}>
      {children}
    </WindowManagerContext.Provider>
  );
}

export function useWindowManager() {
  const context = useContext(WindowManagerContext);
  if (!context) {
    throw new Error('useWindowManager must be used within a WindowManagerProvider');
  }
  return context;
}

export default WindowManagerContext;
