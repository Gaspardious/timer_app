import { createContext, useState, useEffect } from 'react';
import Timer from 'easytimer.js';

export const TimerContext = createContext();

export const TimerContextProvider = ({ children }) => {
  const [localTimer, setLocalTimer] = useState(null);
  const [isRunning, setIsRunning] = useState(false);

  useEffect(() => {
    const newTimer = new Timer();
    setLocalTimer(newTimer);

    return () => {
      newTimer.stop(); // Cleanup timer when unmounting
    };
  }, []);

  const startTimer = (timeInSeconds) => {
    if (localTimer) {
      localTimer.start({ countdown: true, startValues: { seconds: timeInSeconds } });
      setIsRunning(true);
    }
  };

  const stopTimer = () => {
    if (localTimer) {
      localTimer.stop();
      setIsRunning(false); // Mark the timer as not running
    }
  };

  const resetTimer = () => {
    if (localTimer) {
      localTimer.reset();
    }
  };

  return (
    <TimerContext.Provider value={{ localTimer, isRunning, startTimer, stopTimer, resetTimer }}>
      {children}
    </TimerContext.Provider>
  );
};
