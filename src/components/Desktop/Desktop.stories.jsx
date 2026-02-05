import { Desktop } from './Desktop';
import { Window } from '../Window';

export default {
  title: 'Components/Desktop',
  component: Desktop,
  parameters: {
    layout: 'fullscreen',
  },
};

export const Default = {
  args: {},
};

export const WithBackground = {
  args: {
    backgroundUrl: 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" width="100" height="100"><rect fill="%23006666" width="100" height="100"/><circle fill="%23008080" cx="50" cy="50" r="40"/></svg>',
  },
};

export const WithWindow = {
  args: {},
  render: (args) => (
    <Desktop {...args}>
      <Window
        id="demo"
        title="Demo Window"
        initialPosition={{ x: 100, y: 80 }}
        size={{ width: 350, height: 250 }}
        focused={true}
      >
        <div style={{ padding: '16px' }}>
          <p>Window content on the desktop.</p>
        </div>
      </Window>
    </Desktop>
  ),
};

export const WithMultipleWindows = {
  args: {},
  render: (args) => (
    <Desktop {...args}>
      <Window
        id="window-1"
        title="First Window"
        initialPosition={{ x: 50, y: 50 }}
        size={{ width: 300, height: 200 }}
        focused={false}
      >
        <div style={{ padding: '16px' }}>
          <p>First window content.</p>
        </div>
      </Window>
      <Window
        id="window-2"
        title="Second Window"
        initialPosition={{ x: 200, y: 150 }}
        size={{ width: 350, height: 250 }}
        focused={true}
      >
        <div style={{ padding: '16px' }}>
          <p>Second window content (focused).</p>
        </div>
      </Window>
    </Desktop>
  ),
};

export const Loading = {
  args: {},
  render: (args) => (
    <Desktop {...args}>
      <div
        style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          color: 'white',
          fontSize: '18px',
        }}
      >
        Loading...
      </div>
    </Desktop>
  ),
};
