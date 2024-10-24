import { useContext, useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { TimerContext } from "../../components/TimerContext/TimerContext"; 
import './timerdigital.scss';
import { motion } from 'framer-motion';

const Timerdigital = () => {
  const { localTimer, isRunning, startTimer, stopTimer, pauseTimer, resetTimer, isIntervalChecked } = useContext(TimerContext);  // Access the timer and functions from context
  const [timeValues, setTimeValues] = useState(localTimer ? localTimer.getTimeValues().toString() : '00:00:00');
  const navigate = useNavigate();  // Access navigation to route to "/alarm"

  useEffect(() => {
    // Update the time values as the timer updates
    if (localTimer) {
      const intervalId = setInterval(() => {
        setTimeValues(localTimer.getTimeValues().toString());
      }, 1000);

      // Clean up the interval when the component unmounts
      return () => clearInterval(intervalId);
    }
  }, [localTimer]);

  useEffect(() => {
    if (localTimer && isRunning) {
      localTimer.start();
    }

    // Listen for the "targetAchieved" event (when timer reaches zero)
    localTimer.addEventListener('targetAchieved', () => {
      if (isIntervalChecked) {
        navigate('/intervall');  // Navigate to /intervall if interval is selected
      } else {
        navigate('/alarm');  // Navigate to /alarm otherwise
      }
    });
  

    // Cleanup: remove event listener when component unmounts or localTimer changes
    return () => {
      if (localTimer) {
        localTimer.removeEventListener('targetAchieved');
      }
    };
  }, [localTimer, isRunning, navigate]);

  return (
    <motion.div 
    className='timerdigital_container'
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    transition={{ duration: 1 }}
    >
      <motion.div 
        className='timerdigital_count'
      >
        {timeValues}
      </motion.div>

      <section className='btns'>
        <motion.button 
          className='btn_ _start'
          whileHover={{
            transition: { duration: 0.1 },
            color: 'lightgreen',
            backgroundColor: 'black',
            border: '2px solid lightgreen',
            scale: 1.1,
          }}
          whileTap={{ scale: 0.9}}
          onClick={() => startTimer(59)}  // Use startTimer to start the shared timer
        >
          START
        </motion.button>
        <motion.button 
          className='btn_ _pause'
          whileHover={{
            transition: { duration: 0.1 },
            color: 'yellow',
            backgroundColor: 'black',
            border: '2px solid yellow',
            scale: 1.1,
          }}
          whileTap={{ scale: 0.9}}
          onClick={() => {pauseTimer}}  // Use startTimer to start the shared timer
        >
          PAUSE
        </motion.button>

        <motion.button 
          className='btn_ _stop'
          whileHover={{
            color: 'red',
            backgroundColor: 'black',
            border: '2px solid red',
            scale: 1.1,
          }}
          whileTap={{ scale: 0.9}}
          onClick={stopTimer} // Use startTimer to start the shared timer
        >
          STOP
        </motion.button>
        <motion.button 
          className='btn_ _reset'
          whileHover={{
            transition: { duration: 0.1 },
            color: 'lightblue',
            backgroundColor: 'black',
            border: '2px solid lightblue',
            scale: 1.1,
          }}
          whileTap={{ scale: 0.9}}
          onClick={resetTimer} // Use startTimer to start the shared timer
        >
          RESET
        </motion.button>

 
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
    </motion.div>
  );
};

export default Timerdigital;
