
import React, { useState, useCallback, useRef } from 'react';
import HeartCanvas from './components/HeartCanvas';
import { AppState, Position } from './types';

const ANGRY_CAT_GIF = "https://media.tenor.com/_09v4ZEZP8cAAAAM/angry-cat-sassy-cat.gif";
const HAPPY_CAT_GIF = "https://i.pinimg.com/originals/88/14/9b/88149b0400750578f4d07d9bc3fb0fee.gif";
const WAITING_CAT_GIF = "https://media.tenor.com/Z_m_X2p6fUIAAAAj/cute-cat.gif";

const App: React.FC = () => {
  const [state, setState] = useState<AppState>(AppState.INITIAL);
  const [noCount, setNoCount] = useState(0);
  const [noBtnPos, setNoBtnPos] = useState<Position | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const moveNoButton = useCallback(() => {
    if (noCount >= 3) {
      setState(AppState.ANGRY);
      return;
    }

    setNoCount(prev => prev + 1);

    if (containerRef.current) {
      const rect = containerRef.current.getBoundingClientRect();
      const padding = 50;
      const x = Math.random() * (rect.width - 150) + padding;
      const y = Math.random() * (rect.height - 100) + padding;
      
      // Relative positioning within the container
      setNoBtnPos({ x, y });
    }
  }, [noCount]);

  const handleYes = () => {
    setState(AppState.SUCCESS);
  };

  const reset = () => {
    setState(AppState.INITIAL);
    setNoCount(0);
    setNoBtnPos(null);
  };

  return (
    <div className="relative min-h-screen w-full flex items-center justify-center p-4 overflow-hidden bg-gradient-to-br from-rose-100 to-pink-200 selection:bg-rose-300">
      <HeartCanvas />

      <div 
        ref={containerRef}
        className="relative z-10 w-full max-w-lg bg-white/80 backdrop-blur-md rounded-3xl shadow-2xl p-8 md:p-12 text-center transform transition-all duration-500 hover:scale-[1.02]"
      >
        {state === AppState.INITIAL && (
          <div className="space-y-8">
            <div className="flex justify-center">
              <img 
                src={WAITING_CAT_GIF} 
                alt="Waiting cat" 
                className="w-48 h-48 object-contain rounded-2xl float-animation shadow-lg"
              />
            </div>
            
            <h1 className="text-4xl md:text-5xl font-bold text-rose-600 font-cursive leading-tight">
              Will YOU be my valentine?
            </h1>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-6 mt-10">
              <button
                onClick={handleYes}
                className="px-10 py-4 bg-rose-500 hover:bg-rose-600 text-white font-bold text-xl rounded-full shadow-lg transform transition-all hover:scale-110 active:scale-95 z-20"
              >
                Yes! 💖
              </button>

              <button
                onMouseEnter={moveNoButton}
                onClick={moveNoButton}
                style={noBtnPos ? { 
                  position: 'absolute', 
                  left: `${noBtnPos.x}px`, 
                  top: `${noBtnPos.y}px`,
                  transition: 'all 0.2s cubic-bezier(0.34, 1.56, 0.64, 1)'
                } : {}}
                className={`px-10 py-4 border-2 border-rose-300 text-rose-500 font-bold text-xl rounded-full shadow-sm hover:bg-rose-50 transition-colors z-20 ${noBtnPos ? 'shadow-xl bg-white' : ''}`}
              >
                No
              </button>
            </div>
          </div>
        )}

        {state === AppState.ANGRY && (
          <div className="space-y-6 animate-in fade-in zoom-in duration-300">
            <h1 className="text-3xl md:text-4xl font-bold text-red-600 mb-4">
              Stop Messing with me 😠
            </h1>
            <div className="flex justify-center">
              <img 
                src={ANGRY_CAT_GIF} 
                alt="Angry cat" 
                className="w-64 h-64 object-cover rounded-3xl shadow-2xl border-4 border-red-500"
              />
            </div>
            <p className="text-gray-600 mt-4 italic">You've tried to click "No" {noCount + 1} times...</p>
            <button
              onClick={reset}
              className="mt-6 text-rose-500 font-semibold hover:underline"
            >
              Okay, I'll be serious now 🥺
            </button>
          </div>
        )}

        {state === AppState.SUCCESS && (
          <div className="space-y-6 animate-in slide-in-from-bottom duration-700">
            <div className="flex justify-center">
              <img 
                src={HAPPY_CAT_GIF} 
                alt="Happy cat" 
                className="w-64 h-64 object-contain rounded-3xl shadow-lg"
              />
            </div>
            <h1 className="text-5xl font-bold text-rose-600 font-cursive animate-bounce">
              Yay!!! 🎉
            </h1>
            <p className="text-2xl text-rose-500 font-medium">
              I knew you'd say Yes! ❤️
            </p>
            <div className="mt-8 p-4 bg-rose-100 rounded-xl inline-block">
              <p className="text-rose-800 text-sm">You officially have a Valentine now!</p>
            </div>
          </div>
        )}
      </div>

      <footer className="fixed bottom-4 text-rose-400 text-sm opacity-60">
        Made with love for a special someone 🌹
      </footer>
    </div>
  );
};

export default App;
