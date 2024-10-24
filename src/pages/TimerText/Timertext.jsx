import React, { useState, useEffect, useContext } from 'react';
import { TimerContext } from "../../components/TimerContext/TimerContext"; 

const TextTimer = () => {
  const { localTimer, startTimer } = useContext(TimerContext);
  const [time, setTime] = useState('00:00:00');

  useEffect(() => {
    if (!localTimer) return;

    const updateTime = () => {
      const { hours, minutes, seconds } = localTimer.getTimeValues();
      setTime(`${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`);
    };

    localTimer.addEventListener('secondsUpdated', updateTime);
    updateTime();  // Set initial time

    return () => {
      localTimer.removeEventListener('secondsUpdated', updateTime);
    };
  }, [localTimer]);

  return (
    <div style={{ backgroundColor: 'lightgrey', padding: '20px', border: '1px solid black' }}>
      {console.log('Rendering component with time:', time)} {/* Logs time to ensure it's being rendered */}
      <h2>Text Timer</h2>
      {/* Visible styling to ensure the time is displayed */}
      <p style={{ color: 'red', fontSize: '20px', backgroundColor: 'yellow', padding: '10px', fontWeight: 'bold' }}>
        {time}
      </p>
      <button onClick={() => startTimer(300, false)}>Start 5-Min Timer</button>
    </div>
  );
};

export default TextTimer;
