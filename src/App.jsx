import { WindowManagerProvider } from './components/WindowManager';
import { WindowManager } from './components/WindowManager';
import { CVWindow } from './windows/CVWindow';
import { ThrustWindow } from './windows/ThrustWindow';
import { PatternSeekingBrainWindow } from './windows/PatternSeekingBrainWindow';
import { DesignWindow } from './windows/DesignWindow';
import { BadAdviceForTravelersWindow } from './windows/BadAdviceForTravelersWindow';
import { RadioPlaysWindow } from './windows/RadioPlaysWindow';

const initialWindows = [
  {
    id: 'cv',
    title: 'CV - Ross Devlin',
    position: { x: 80, y: 60 },
    size: { width: 500, height: 500 },
    component: CVWindow,
    props: { dataUrl: '/data/cv.json' },
  },
  {
    id: 'thrust',
    title: 'Thrust',
    position: { x: 150, y: 100 },
    size: { width: 420, height: 550 },
    component: ThrustWindow,
    props: { dataUrl: '/data/thrust.json' },
  },
  {
    id: 'pattern-seeking-brain',
    title: 'Pattern Seeking Brain',
    position: { x: 220, y: 140 },
    size: { width: 500, height: 400 },
    component: PatternSeekingBrainWindow,
  },
  {
    id: 'design',
    title: 'Design',
    position: { x: 290, y: 180 },
    size: { width: 500, height: 400 },
    component: DesignWindow,
  },
  {
    id: 'bad-advice-for-travelers',
    title: 'Bad Advice For Travelers',
    position: { x: 360, y: 220 },
    size: { width: 500, height: 400 },
    component: BadAdviceForTravelersWindow,
  },
  {
    id: 'radio-plays',
    title: 'Radio Plays',
    position: { x: 430, y: 260 },
    size: { width: 500, height: 400 },
    component: RadioPlaysWindow,
  },
];

function App() {
  return (
    <WindowManagerProvider initialWindows={initialWindows}>
      <WindowManager backgroundUrl="/background.png" />
    </WindowManagerProvider>
  );
}

export default App;
