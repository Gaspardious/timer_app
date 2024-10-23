import './timeranalog.scss';
import { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { TimerContext } from "../../components/TimerContext/TimerContext";

const Timeranalog = () => {
  const { localTimer, startTimer, stopTimer } = useContext(TimerContext);  // Access the shared localTimer instance from context
  const [secondsRotation, setSecondsRotation] = useState(0);
  const [minutesRotation, setMinutesRotation] = useState(0);

  useEffect(() => {
    if (!localTimer) return; // Make sure the timer is initialized

    // Update the rotation of the hands based on the current time from localTimer
    const updateRotation = () => {
      const timeValues = localTimer.getTimeValues();

      // Calculate the rotation for the second hand (0 to 360 degrees)
      const seconds = timeValues.seconds;
      const secondsDegree = (seconds / 60) * 360;
      setSecondsRotation(secondsDegree);

      // Calculate the rotation for the minute hand (0 to 360 degrees)
      const minutes = timeValues.minutes;
      const minutesDegree = (minutes / 60) * 360;
      setMinutesRotation(minutesDegree);
    };

    // Update every second
    const intervalId = setInterval(updateRotation, 1000);

    // Cleanup interval on unmount
    return () => clearInterval(intervalId);
  }, [localTimer]);

  return (
    <div className="stopwatch">

      <div className="ur">
        {/* Animate the second hand */}
        <motion.div
          className="seconds"
          animate={{ rotate: secondsRotation }}
          transition={{ type: "spring", stiffness: 300, damping: 20 }}
        />
        {/* Animate the minute hand */}
        <motion.div
          className="minutes"
          animate={{ rotate: minutesRotation }}
          transition={{ type: "spring", stiffness: 300, damping: 20 }}
        />
      </div>

      <section className='btns'>
        <motion.button 
          className='btn_ _start'
          whileHover={{
            scale: 1.1,
            transition: { duration: 0.1 },
            color: 'lightgreen',
            backgroundColor: 'black',
            border: '1px solid lightgreen',
          }}
          onClick={() => startTimer(60)}  // Use startTimer to start the shared timer
        >
          START
        </motion.button>
        <button className='btn_ _pause' onClick={() => localTimer.pause()}>PAUSE</button>
        <button className='btn_ _stop' onClick={stopTimer}>STOP</button>
        <button className='btn_ _reset' onClick={() => localTimer.reset()}>RESET</button>
      </section>

      <Link to="/settimer">
        <motion.button 
          whileHover={{ 
            scale: 1.1,
            transition: { duration: 0.1 },
            color: 'red',
          }}
          whileTap={{ scale: 0.9 }}
          className='btn_stoptimer' 
          onClick={stopTimer}
        >
          STOP TIMER
        </motion.button>
      </Link>
    </div>
  );
};

export default Timeranalog;
