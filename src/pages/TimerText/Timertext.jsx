import './timertext.scss';
import { useState, useEffect, useContext } from 'react'; 
import { Numbers } from '../../components/Numbers/Numbers';  
import { TimerContext } from "../../components/TimerContext/TimerContext"; 
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const Timertext = () => {
  const { localTimer, stopTimer } = useContext(TimerContext);
  const [timeValues, setTimeValues] = useState({ minutes: 0, seconds: 0 });  

  useEffect(() => {
    if (!localTimer) return;

    const updateTimer = () => {
      const { minutes, seconds } = localTimer.getTimeValues();
      setTimeValues({ minutes, seconds });
    };

    localTimer.addEventListener('secondsUpdated', updateTimer);

    updateTimer();

    return () => {
      localTimer.removeEventListener('secondsUpdated', updateTimer);
    };
  }, [localTimer]);

  const { minutes, seconds } = timeValues; 
  const minutesText = `${Numbers[minutes]} ${minutes !== 1 ? "MINUTER" : "MINUT"}`;
  const secondsText = `${Numbers[seconds]} ${seconds !== 1 ? "SEKUNDER" : "SEKUND"}`;

  return (
    <div className="texttimer_container">
      <div className="texttimer_text">
        <div>{minutesText}</div>
        <div>OCH {secondsText}</div>
      </div>
      <Link to="/settimer">
        <motion.button 
          whileHover={{ 
            scale: 1.1,
            transition: { duration: 0.1 },
            color: 'red',
          }}
          whileTap={{ scale: 0.9 }}
          className='texttimer_button' 
          onClick={stopTimer}
        >
          STOP TIMER
        </motion.button>
      </Link>
    </div>
  );
};

export default Timertext;
