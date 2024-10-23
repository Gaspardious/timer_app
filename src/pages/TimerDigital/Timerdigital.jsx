import { useContext, useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { TimerContext } from "../../components/TimerContext/TimerContext"; 
import './timerdigital.scss';
import { motion } from 'framer-motion';

const Timerdigital = () => {
  const { localTimer, isRunning, stopTimer } = useContext(TimerContext);  // Access the timer and running state from context
  const [timeValues, setTimeValues] = useState(localTimer ? localTimer.getTimeValues().toString() : '00:00:00');
  const navigate = useNavigate();

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
  }, [localTimer, isRunning]);

  return (
    <motion.div 
    className='timerdigital_container'
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    transition={{ duration: 1 }}
    >
  
  <motion.div className='gif_background'>
  {isRunning && localTimer && (  // Only show the gif if the timer is running
  <motion.iframe  
    src="https://giphy.com/embed/10C2QzjVARw9KE"
    className="giphy" 
    initial={{ opacity: 0, x: 0 }}  // Start off the screen (to the left)
    animate={{ 
      opacity: 1, 
      x: [-200, 500],  // Move between right and left positions
    }}
    transition={{ 
      duration: 8,  // Total time to move across the screen
      repeat: Infinity,  // Repeat indefinitely
      repeatType: 'loop',  // Loop the animation
      ease: 'easeInOut'  // Smooth easing for in/out animation
    }}
    style={{ width: '150px', height: '150px' }}
  ></motion.iframe>
)}

    </motion.div>
 

      
      <motion.div 
      className='timerdigital_count'

      
      
      >
        {timeValues}
        </motion.div>
    
      <section className='btns'>
        <motion.button 
        className='btn_ _start'
        whileHover={{
          scale: 1.1,
          transition: { duration: 0.1 },
          color: 'lightgreen',
          backgroundColor: 'black',
          border: '1px solid lightgreen',
            // Set the duration to a faster value (e.g., 0.2 seconds)
        }}
         onClick={() => localTimer.start()}
         >START</motion.button>
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
            // Set the duration to a faster value (e.g., 0.2 seconds)
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
