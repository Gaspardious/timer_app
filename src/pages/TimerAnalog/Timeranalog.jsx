import './timeranalog.scss';
import { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { TimerContext } from "../../components/TimerContext/TimerContext";

const Timeranalog = () => {
  const { localTimer, startTimer, stopTimer, pauseTimer, resetTimer } = useContext(TimerContext);  // Access the shared localTimer instance from context
  const [secondsRotation, setSecondsRotation] = useState(0);
  const [minutesRotation, setMinutesRotation] = useState(0);

  useEffect(() => {
    if (!localTimer) return; // Make sure the timer is initialized

    // Set initial rotation based on the current countdown values from localTimer when component mounts
    const timeValues = localTimer.getTimeValues();
    const initialSeconds = timeValues.seconds;
    const initialMinutes = timeValues.minutes;

    // Set initial rotation for seconds and minutes
    setSecondsRotation((initialSeconds / 60) * 360);
    setMinutesRotation((initialMinutes / 60) * 360);

    // Update the rotation of the hands based on the current time from localTimer
    const updateRotation = () => {
      const timeValues = localTimer.getTimeValues();

      // Calculate the rotation for the second hand (0 to 360 degrees) for countdown
      const seconds = timeValues.seconds;
      const secondsDegree = (seconds / 60) * 360;
      setSecondsRotation(secondsDegree);

      // Calculate the rotation for the minute hand (0 to 360 degrees) for countdown
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
        {/* Second hand */}
        <motion.div
          className="seconds"
          style={{ rotate: secondsRotation }} // Set the initial rotation directly
          animate={{ rotate: secondsRotation }} // Animate the updates
          transition={{ type: "tween", ease: "linear", duration: 1 }} // Smooth ticking with a 1-second interval
        />
        {/* Minute hand */}
        <motion.div
          className="minutes"
          style={{ rotate: minutesRotation }} // Set the initial rotation directly
          animate={{ rotate: minutesRotation }} // Animate the updates
          transition={{ type: "tween", ease: "linear", duration: 1 }} // Smooth ticking with a 1-minute interval
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
        <button className='btn_ _pause' onClick={pauseTimer}>PAUSE</button>
        <button className='btn_ _stop' onClick={stopTimer}>STOP</button>
        <button className='btn_ _reset' onClick={resetTimer}>RESET</button>
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
