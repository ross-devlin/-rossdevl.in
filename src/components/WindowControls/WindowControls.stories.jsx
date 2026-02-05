import { WindowControls } from './WindowControls';

export default {
  title: 'Components/WindowControls',
  component: WindowControls,
  parameters: {
    layout: 'centered',
    backgrounds: { default: 'chrome' },
  },
  argTypes: {
    onMinimize: { action: 'minimize' },
    onMaximize: { action: 'maximize' },
    onClose: { action: 'close' },
  },
};

export const Default = {
  args: {
    focused: true,
    disabled: false,
  },
};

export const Focused = {
  args: {
    focused: true,
    disabled: false,
  },
};

export const Unfocused = {
  args: {
    focused: false,
    disabled: false,
  },
};

export const Disabled = {
  args: {
    focused: true,
    disabled: true,
  },
};

// Decorator to show on titlebar-like background
export const OnTitlebar = {
  args: {
    focused: true,
    disabled: false,
  },
  decorators: [
    (Story) => (
      <div
        style={{
          background: 'var(--titlebar-active)',
          padding: '4px 8px',
          display: 'flex',
          alignItems: 'center',
        }}
      >
        <Story />
      </div>
    ),
  ],
};
