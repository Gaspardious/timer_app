import { createContext, useState, useEffect } from 'react';
import Timer from 'easytimer.js';

export const TimerContext = createContext();

export const TimerContextProvider = ({ children }) => {
  const [localTimer, setLocalTimer] = useState(null);
  const [isRunning, setIsRunning] = useState(false);
  const [totalSeconds, setTotalSeconds] = useState(0);
  const [isIntervalChecked, setIsIntervalChecked] = useState(false);

  useEffect(() => {
    const newTimer = new Timer();
    setLocalTimer(newTimer); // Set up the EasyTimer instance

    return () => {
      newTimer.stop(); // Cleanup timer when unmounting
    };
  }, []);

  // Start the timer with the provided time and interval options
  const startTimer = (timeInSeconds, intervalChecked) => {
    if (localTimer) {
      localTimer.start({ countdown: true, startValues: { seconds: timeInSeconds } });
      setTotalSeconds(timeInSeconds);
      setIsIntervalChecked(intervalChecked);  // Store interval option
      setIsRunning(true);
    }
  };

  // Pause the timer
  const pauseTimer = () => {
    if (localTimer) {
      localTimer.pause();
      setIsRunning(false);  // Mark as paused
    }
  };

  // Stop the timer completely
  const stopTimer = () => {
    if (localTimer) {
      localTimer.stop();
      setIsRunning(false); // Mark the timer as not running
    }
  };

  // Reset the timer
  const resetTimer = () => {
    if (localTimer) {
      localTimer.reset();
    }
  };

  return (
    <TimerContext.Provider value={{ localTimer, isRunning, startTimer, pauseTimer, stopTimer, resetTimer, totalSeconds, isIntervalChecked }}>
      {children}
    </TimerContext.Provider>
  );
};
