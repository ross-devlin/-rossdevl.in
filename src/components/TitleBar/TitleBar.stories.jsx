import { TitleBar } from './TitleBar';

export default {
  title: 'Components/TitleBar',
  component: TitleBar,
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    onMinimize: { action: 'minimize' },
    onMaximize: { action: 'maximize' },
    onClose: { action: 'close' },
    onMouseDown: { action: 'mouseDown' },
  },
  decorators: [
    (Story) => (
      <div style={{ width: '400px' }}>
        <Story />
      </div>
    ),
  ],
};

export const Default = {
  args: {
    title: 'My Window',
    focused: true,
  },
};

export const Focused = {
  args: {
    title: 'Focused Window',
    focused: true,
  },
};

export const Unfocused = {
  args: {
    title: 'Unfocused Window',
    focused: false,
  },
};

export const WithIcon = {
  args: {
    title: 'Window with Icon',
    icon: 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16"><rect fill="%23fff" width="16" height="16" rx="2"/></svg>',
    focused: true,
  },
};

export const LongTitle = {
  args: {
    title: 'This is a very long window title that should be truncated with an ellipsis',
    focused: true,
  },
};

export const NarrowWidth = {
  args: {
    title: 'Narrow Window',
    focused: true,
  },
  decorators: [
    (Story) => (
      <div style={{ width: '200px' }}>
        <Story />
      </div>
    ),
  ],
};
