import { useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import FloatingHearts from './components/shared/FloatingHearts';
import RibbonLayer from './components/shared/RibbonLayer';
import TeddyDecor from './components/shared/TeddyDecor';
import FloraDecor from './components/shared/FloraDecor';
import LandingScreen from './components/screens/LandingScreen';
import NameGate from './components/screens/NameGate';
import ActivityIntro from './components/screens/ActivityIntro';
import LuckyLoveCards from './components/screens/LuckyLoveCards';
import FindMyHeart from './components/screens/FindMyHeart';
import ScratchCard from './components/screens/ScratchCard';
import LoveSlotMachine from './components/screens/LoveSlotMachine';
import WheelOfLove from './components/screens/WheelOfLove';
import FinalGift from './components/screens/FinalGift';
import VideoMessage from './components/screens/VideoMessage';
import SaveTheDate from './components/screens/SaveTheDate';
import ClosingScreen from './components/screens/ClosingScreen';

const SCREENS = [
  'landing',
  'nameGate',
  'activityIntro',
  'luckyCards',
  'findHeart',
  'scratchCard',
  'slotMachine',
  'wheelOfLove',
  'finalGift',
  'videoMessage',
  'saveTheDate',
  'closing',
];

export default function App() {
  const [screen, setScreen] = useState('landing');

  const goNext = () => {
    const idx = SCREENS.indexOf(screen);
    if (idx < SCREENS.length - 1) {
      setScreen(SCREENS[idx + 1]);
    }
  };

  const replay = () => setScreen('landing');
  const showDecor = screen !== 'finalGift';

  return (
    <div className="relative h-full w-full overflow-hidden">
      {showDecor && (
        <>
          <FloatingHearts />
          <RibbonLayer />
          <TeddyDecor />
          <FloraDecor />
        </>
      )}

      <AnimatePresence mode="wait">
        {screen === 'landing' && <LandingScreen key="landing" onNext={goNext} />}
        {screen === 'nameGate' && <NameGate key="nameGate" onNext={goNext} />}
        {screen === 'activityIntro' && <ActivityIntro key="activityIntro" onNext={goNext} />}
        {screen === 'luckyCards' && <LuckyLoveCards key="luckyCards" onNext={goNext} />}
        {screen === 'findHeart' && <FindMyHeart key="findHeart" onNext={goNext} />}
        {screen === 'scratchCard' && <ScratchCard key="scratchCard" onNext={goNext} />}
        {screen === 'slotMachine' && <LoveSlotMachine key="slotMachine" onNext={goNext} />}
        {screen === 'wheelOfLove' && <WheelOfLove key="wheelOfLove" onNext={goNext} />}
        {screen === 'finalGift' && <FinalGift key="finalGift" onNext={goNext} />}
        {screen === 'videoMessage' && <VideoMessage key="videoMessage" onNext={goNext} />}
        {screen === 'saveTheDate' && <SaveTheDate key="saveTheDate" onNext={goNext} />}
        {screen === 'closing' && <ClosingScreen key="closing" onReplay={replay} />}
      </AnimatePresence>
    </div>
  );
}
