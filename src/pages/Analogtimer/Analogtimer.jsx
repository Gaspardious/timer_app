import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import Timer from 'easytimer.js';
import './analogtimer.scss';


const AnalogTimer = () => {
  const [secondsRemaining, setSecondsRemaining] = useState(0);
  const [secondRotation, setSecondRotation] = useState(0);
  const [minuteRotation, setMinuteRotation] = useState(0);
  const totalSeconds = 120; // Set the total countdown time (120 seconds)
  const timerRef = useRef(null);

  useEffect(() => {
    const timer = new Timer();
    timerRef.current = timer; //

    // Start the countdown timer
    timer.start({ countdown: true, startValues: { seconds: totalSeconds } });

    timer.addEventListener('secondsUpdated', () => {
      const remainingSeconds = timer.getTotalTimeValues().seconds; //

      // Second hand rotation logic (moves as normal)
      const completedRotations = Math.floor((totalSeconds - remainingSeconds) / 60);
      const timeInCurrentLap = (totalSeconds - remainingSeconds) % 60;
      const newSecondRotation =  (timeInCurrentLap / 60) * 360 + completedRotations * 360;
      setSecondRotation(newSecondRotation);

      // Minute hand rotation logic (counterclockwise from the second second marker)
      // Minute hand starts at 12 degrees (second second marker) and moves to 0 degrees (12 o'clock)
      const newMinuteRotation = 12 - ((totalSeconds - remainingSeconds) / totalSeconds) * 12;
      setMinuteRotation(newMinuteRotation);

      setSecondsRemaining(remainingSeconds);
    });

    // Clean up the timer on component unmount
    return () => {
      timer.stop();
    };
  }, [totalSeconds]);



  return (
    <div className="analog-timer">
      <div className="clock-face">
        <motion.div
          className="minute-hand"
          style={{ originY: 1 }}
          animate={{ rotate: minuteRotation }}
          transition={{ type: 'linear', duration: 1 }} // Smooth linear tick every second
        />

        {/* The animated second hand */}
        <motion.div
          className="second-hand"
          style={{ originY: 1 }}
          animate={{ rotate: secondRotation }}
          transition={{ type: 'linear', duration: 1 }} // Smooth linear tick every second
        />
      </div>
      <p>{secondsRemaining} seconds remaining</p>
    </div>
  );
};

export default AnalogTimer;
