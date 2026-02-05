import { WindowManagerProvider } from './WindowManagerContext';
import { WindowManager } from './WindowManager';

export default {
  title: 'Components/WindowManager',
  component: WindowManager,
  parameters: {
    layout: 'fullscreen',
  },
  decorators: [
    (Story, context) => (
      <WindowManagerProvider initialWindows={context.args.initialWindows || []}>
        <Story />
      </WindowManagerProvider>
    ),
  ],
};

export const Empty = {
  args: {
    initialWindows: [],
  },
};

export const SingleWindow = {
  args: {
    initialWindows: [
      {
        id: 'window-1',
        title: 'Welcome',
        position: { x: 100, y: 80 },
        size: { width: 400, height: 300 },
        content: (
          <div style={{ padding: '16px' }}>
            <h2>Welcome!</h2>
            <p>This is a single window in the WindowManager.</p>
          </div>
        ),
      },
    ],
  },
};

export const MultipleWindows = {
  args: {
    initialWindows: [
      {
        id: 'window-1',
        title: 'First Window',
        position: { x: 50, y: 50 },
        size: { width: 350, height: 250 },
        content: (
          <div style={{ padding: '16px' }}>
            <h2>First Window</h2>
            <p>Click to focus this window.</p>
          </div>
        ),
      },
      {
        id: 'window-2',
        title: 'Second Window',
        position: { x: 200, y: 120 },
        size: { width: 400, height: 300 },
        content: (
          <div style={{ padding: '16px' }}>
            <h2>Second Window</h2>
            <p>This window is initially focused.</p>
            <p>Try dragging windows around!</p>
          </div>
        ),
      },
    ],
  },
};

export const WithMinimizedWindow = {
  args: {
    initialWindows: [
      {
        id: 'window-1',
        title: 'Visible Window',
        position: { x: 100, y: 80 },
        size: { width: 400, height: 300 },
        content: (
          <div style={{ padding: '16px' }}>
            <h2>Visible</h2>
            <p>The other window is minimized to the taskbar.</p>
          </div>
        ),
      },
      {
        id: 'window-2',
        title: 'Minimized Window',
        position: { x: 200, y: 150 },
        size: { width: 350, height: 250 },
        minimized: true,
        content: (
          <div style={{ padding: '16px' }}>
            <h2>Was Minimized</h2>
            <p>Click the taskbar button to restore.</p>
          </div>
        ),
      },
    ],
  },
};

export const OverlappingWindows = {
  args: {
    initialWindows: [
      {
        id: 'bg-window',
        title: 'Background Window',
        position: { x: 80, y: 60 },
        size: { width: 450, height: 350 },
        content: (
          <div style={{ padding: '16px' }}>
            <h2>Background</h2>
            <p>This window starts behind the others.</p>
          </div>
        ),
      },
      {
        id: 'mid-window',
        title: 'Middle Window',
        position: { x: 150, y: 100 },
        size: { width: 400, height: 300 },
        content: (
          <div style={{ padding: '16px' }}>
            <h2>Middle Layer</h2>
            <p>Click any window to bring it to front.</p>
          </div>
        ),
      },
      {
        id: 'top-window',
        title: 'Top Window',
        position: { x: 220, y: 140 },
        size: { width: 350, height: 280 },
        content: (
          <div style={{ padding: '16px' }}>
            <h2>Top Window</h2>
            <p>This window starts on top.</p>
          </div>
        ),
      },
    ],
  },
};

export const WithIcons = {
  args: {
    initialWindows: [
      {
        id: 'docs',
        title: 'My Documents',
        icon: 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16"><rect fill="%23ffcc00" width="16" height="16" rx="2"/></svg>',
        position: { x: 80, y: 60 },
        size: { width: 400, height: 300 },
        content: (
          <div style={{ padding: '16px' }}>
            <h2>Documents</h2>
            <ul>
              <li>File 1.txt</li>
              <li>File 2.txt</li>
              <li>Folder A/</li>
            </ul>
          </div>
        ),
      },
      {
        id: 'browser',
        title: 'Web Browser',
        icon: 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16"><circle fill="%230066cc" cx="8" cy="8" r="7"/></svg>',
        position: { x: 200, y: 120 },
        size: { width: 450, height: 350 },
        content: (
          <div style={{ padding: '16px' }}>
            <h2>Browser</h2>
            <p>Browsing the web...</p>
          </div>
        ),
      },
    ],
  },
};
