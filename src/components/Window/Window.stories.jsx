import { Window } from './Window';

export default {
  title: 'Components/Window',
  component: Window,
  parameters: {
    layout: 'fullscreen',
    backgrounds: { default: 'desktop' },
  },
  argTypes: {
    onFocus: { action: 'focus' },
    onMinimize: { action: 'minimize' },
    onMaximize: { action: 'maximize' },
    onClose: { action: 'close' },
    onPositionChange: { action: 'positionChange' },
  },
};

export const Default = {
  args: {
    id: 'window-1',
    title: 'My Window',
    initialPosition: { x: 50, y: 50 },
    size: { width: 400, height: 300 },
    focused: true,
    children: (
      <div style={{ padding: '16px' }}>
        <h2>Window Content</h2>
        <p>This is the content area of the window.</p>
      </div>
    ),
  },
};

export const Focused = {
  args: {
    ...Default.args,
    title: 'Focused Window',
    focused: true,
  },
};

export const Unfocused = {
  args: {
    ...Default.args,
    title: 'Unfocused Window',
    focused: false,
    initialPosition: { x: 100, y: 100 },
  },
};

export const WithIcon = {
  args: {
    ...Default.args,
    title: 'Window with Icon',
    icon: 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16"><rect fill="%23fff" width="16" height="16" rx="2"/></svg>',
  },
};

export const SmallWindow = {
  args: {
    ...Default.args,
    title: 'Small Window',
    size: { width: 250, height: 150 },
  },
};

export const LargeWindow = {
  args: {
    ...Default.args,
    title: 'Large Window',
    size: { width: 600, height: 450 },
    children: (
      <div style={{ padding: '16px' }}>
        <h2>Large Window Content</h2>
        <p>This window has more space for content.</p>
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
        <p>Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
      </div>
    ),
  },
};

export const WithScrollableContent = {
  args: {
    ...Default.args,
    title: 'Scrollable Content',
    size: { width: 300, height: 200 },
    children: (
      <div style={{ padding: '16px' }}>
        {Array.from({ length: 20 }, (_, i) => (
          <p key={i}>Line {i + 1}: Lorem ipsum dolor sit amet</p>
        ))}
      </div>
    ),
  },
};

export const NonDraggable = {
  args: {
    ...Default.args,
    title: 'Non-Draggable Window',
    draggable: false,
  },
};
