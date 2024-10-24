import './timertext.scss';
import { useState, useEffect, useContext } from 'react'; // Import useState, useEffect, and useContext
import { Numbers } from '../../components/Numbers/Numbers';  // Ensure Numbers is a named export
import { TimerContext } from "../../components/TimerContext/TimerContext"; 
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const Timertext = () => {
  const { localTimer, stopTimer } = useContext(TimerContext);
  const [timeValues, setTimeValues] = useState({ minutes: 0, seconds: 0 }); // State to hold the time values 
  // Ensure the timer is initialized before accessing its methods
  useEffect(() => {
    if (!localTimer) return;

    // Function to update the time values whenever the timer updates
    const updateTimer = () => {
      const { minutes, seconds } = localTimer.getTimeValues();
      setTimeValues({ minutes, seconds });
    };

    // Add event listener for secondsUpdated
    localTimer.addEventListener('secondsUpdated', updateTimer);

    // Run the update once initially
    updateTimer();

    // Clean up the event listener when the component unmounts
    return () => {
      localTimer.removeEventListener('secondsUpdated', updateTimer);
    };
  }, [localTimer]);

  const { minutes, seconds } = timeValues; // Destructure minutes and seconds from state

  // Convert minutes and seconds to Swedish text
  const minutesInText = `${Numbers[minutes]} ${minutes !== 1 ? "MINUTER" : "MINUT"}`;
  const secondsInText = `${Numbers[seconds]} ${seconds !== 1 ? "SEKUNDER" : "SEKUND"}`;

  return (
    <div className="texttimer_container">
      <div className="texttimer_text">
        <div>{minutesInText}</div>
        <div>OCH {secondsInText}</div>
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
