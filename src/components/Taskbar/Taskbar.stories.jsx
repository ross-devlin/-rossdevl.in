import { Taskbar } from './Taskbar';

export default {
  title: 'Components/Taskbar',
  component: Taskbar,
  parameters: {
    layout: 'fullscreen',
  },
  argTypes: {
    onWindowClick: { action: 'windowClick' },
  },
  decorators: [
    (Story) => (
      <div style={{ height: '100px', position: 'relative' }}>
        <Story />
      </div>
    ),
  ],
};

export const Empty = {
  args: {
    windows: [],
  },
};

export const WithWindows = {
  args: {
    windows: [
      { id: 'window-1', title: 'My Documents' },
      { id: 'window-2', title: 'Web Browser' },
      { id: 'window-3', title: 'Text Editor' },
    ],
    focusedId: 'window-2',
  },
};

export const WithMinimizedWindow = {
  args: {
    windows: [
      { id: 'window-1', title: 'My Documents' },
      { id: 'window-2', title: 'Web Browser', minimized: true },
      { id: 'window-3', title: 'Text Editor' },
    ],
    focusedId: 'window-1',
  },
};

export const WithIcons = {
  args: {
    windows: [
      {
        id: 'window-1',
        title: 'My Documents',
        icon: 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16"><rect fill="%23ffcc00" width="16" height="16" rx="2"/></svg>',
      },
      {
        id: 'window-2',
        title: 'Web Browser',
        icon: 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16"><circle fill="%230066cc" cx="8" cy="8" r="7"/></svg>',
      },
    ],
    focusedId: 'window-1',
  },
};

export const ManyWindows = {
  args: {
    windows: [
      { id: 'w1', title: 'Window 1' },
      { id: 'w2', title: 'Window 2' },
      { id: 'w3', title: 'Window 3' },
      { id: 'w4', title: 'Window 4' },
      { id: 'w5', title: 'Window 5' },
      { id: 'w6', title: 'Window 6' },
      { id: 'w7', title: 'Window 7' },
    ],
    focusedId: 'w3',
  },
};

export const LongTitles = {
  args: {
    windows: [
      { id: 'w1', title: 'A Very Long Window Title That Should Truncate' },
      { id: 'w2', title: 'Another Extremely Long Window Title' },
    ],
    focusedId: 'w1',
  },
};
