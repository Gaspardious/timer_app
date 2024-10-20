import { createContext, useState, useEffect } from 'react';
import Timer from 'easytimer.js';  // Import easytimer.js directly

export const TimerContext = createContext();

export const TimerContextProvider = ({ children }) => {
  const [timer, setTimer] = useState(0);  // Store the initial timer value in seconds
  const [localTimer, setLocalTimer] = useState(null);  // Store the timer instance
  const [isRunning, setIsRunning] = useState(false);  // Track whether the timer is running

  // Initialize the timer when the context is first rendered
  useEffect(() => {
    const newTimer = new Timer();
    setLocalTimer(newTimer);

    // Start the timer if there's already a value in the timer state
    if (timer > 0) {
      newTimer.start({ countdown: true, startValues: { seconds: timer } });
      setIsRunning(true);
    }

    return () => {
      newTimer.stop();  // Clean up when the component is unmounted
    };
  }, [timer]);

  // Function to start or resume the timer
  const startTimer = (timeInSeconds) => {
    if (localTimer) {
      setTimer(timeInSeconds);
      localTimer.start({ countdown: true, startValues: { seconds: timeInSeconds } });
      setIsRunning(true);
    }
  };

  // Function to stop the timer
  const stopTimer = () => {
    if (localTimer) {
      localTimer.stop();
      setIsRunning(false);
    }
  };

  // Function to pause the timer
  const pauseTimer = () => {
    if (localTimer) {
      localTimer.pause();
      setIsRunning(false);
    }
  };

  // Provide the timer and control functions in the context
  return (
    <TimerContext.Provider value={{ localTimer, isRunning, startTimer, stopTimer, pauseTimer, setTimer, timer }}>
      {children}
    </TimerContext.Provider>
  );
};
