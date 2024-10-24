import './intervall.scss';
import React, { useEffect, useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import Timer from 'easytimer.js';
import { TimerContext } from '../../components/TimerContext/TimerContext';

const Intervall = () => {
  const { startTimer, isIntervalChecked } = useContext(TimerContext); 
  const navigate = useNavigate();
  const intervall = 1;  //choose the length of the break
  const [remainingMinutes, setRemainingMinutes] = useState(intervall);
  const [remainingSeconds, setRemainingSeconds] = useState(0);
  const timerRef = useState(null);

  useEffect(() => {
    const timer = new Timer();
    timerRef.current = timer;

    // Start the minute break countdown timer
    timer.start({ countdown: true, startValues: { minutes: intervall } });

    // Update the timer every second from the Timer object and set the remaining time in the state variables 
    timer.addEventListener('secondsUpdated', () => {
      const { minutes, seconds } = timer.getTimeValues();
      setRemainingMinutes(minutes);
      setRemainingSeconds(seconds);
    });

    // When the 5-minute break is finished, navigate back to the Timeranalog
    timer.addEventListener('targetAchieved', () => {
      startTimer(intervall * 60, isIntervalChecked);  // Restart the timer
      navigate('/timeranalog');  // Navigate back to Timeranalog after break
    });

    // Cleanup timer when the component unmounts
    return () => {
      timer.stop();
      timer.removeEventListener('secondsUpdated');
      timer.removeEventListener('targetAchieved');
    };
  }, [intervall, isIntervalChecked, navigate, startTimer]);

  const handleSkipBreak = () => {
    // Navigate to Timeranalog immediately when the user skips the break
    startTimer(intervall * 60, isIntervalChecked);  // Restart the timer
    navigate('/timeranalog');
  };

  return (
    <div className='intervall_container'>
<div className="circle_wrapper">
  <motion.div 
    animate={{ scale: [0.9, 1.1, 0.9],
        boxShadow: ['0px 0px 0px', '0px 0px 60px', '0px 0px 0px'],
     }}
    transition={{ duration: 4, repeat: Infinity, repeatType: 'mirror', ease: 'easeInOut' }}
    className="dark_circle"
  ></motion.div>
</div>

        <svg width="40" height="50" viewBox="0 0 40 50" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect width="12" height="50" rx="6" fill="white" />
            <rect x="28" width="12" height="50" rx="6" fill="white" />
        </svg>
        <motion.h2 
            className='intervall_text'
            animate={{ scale: [0.9, 1.1, 0.9],
                textShadow: ['0px 0px 0px', '0px 0px 10px', '0px 0px 0px'],
            }}
            transition={{ duration: 4, repeat: Infinity, repeatType: 'mirror', ease: 'easeInOut' }}
            >
                Pause & Breathe</motion.h2>
        {/* Display the remaining time */}
        <h3 className='intervall_time'>{remainingMinutes}:{remainingSeconds < 10 ? `0${remainingSeconds}` : remainingSeconds}</h3>

 
        <button className='intervall_btn' onClick={handleSkipBreak}>No pause, go now!</button>
    </div>
  );
};

export default Intervall;