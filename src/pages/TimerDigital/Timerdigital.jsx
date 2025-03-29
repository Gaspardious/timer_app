import { useContext, useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { TimerContext } from "../../components/TimerContext/TimerContext"; 
import './timerdigital.scss';
import { motion } from 'framer-motion';

const Timerdigital = () => {
  const { localTimer, isRunning, startTimer, stopTimer, pauseTimer, resetTimer, isIntervalChecked } = useContext(TimerContext); 
  const [timeValues, setTimeValues] = useState(localTimer ? localTimer.getTimeValues().toString() : '00:00:00');
  const navigate = useNavigate();  

  useEffect(() => {
    if (localTimer) {
      const intervalId = setInterval(() => {
        setTimeValues(localTimer.getTimeValues().toString());
      }, 1000);
      return () => clearInterval(intervalId);
    }
  }, [localTimer]);

  useEffect(() => {
    if (localTimer && isRunning) {
      localTimer.start();
    }


    localTimer.addEventListener('targetAchieved', () => {
      if (isIntervalChecked) {
        navigate('/intervall');  
      } else {
        navigate('/alarm');  
      }
    });
  
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
          onClick={() => startTimer(59)} 
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
          onClick={() => {pauseTimer}}  
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
          onClick={stopTimer} 
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
          onClick={resetTimer} 
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

      <p className='portfolio'>
      Portfolio: <a className='link_portfolio' href="https://gaspardev.com/" target="_blank" rel="noopener noreferrer">GasparDev</a>
    </p> 

    </motion.div>
  );
};

export default Timerdigital;
