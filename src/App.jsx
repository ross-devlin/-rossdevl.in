import { WindowManagerProvider } from './components/WindowManager';
import { WindowManager } from './components/WindowManager';
import { CVWindow } from './windows/CVWindow';

const initialWindows = [
  {
    id: 'cv',
    title: 'CV - Ross Devlin',
    position: { x: 80, y: 60 },
    size: { width: 500, height: 500 },
    component: CVWindow,
    props: { dataUrl: '/data/cv.json' },
  },
];

function App() {
  return (
    <WindowManagerProvider initialWindows={initialWindows}>
      <WindowManager />
    </WindowManagerProvider>
  );
}

export default App;
