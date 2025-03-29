import './timeranalog.scss';
import { useContext, useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { TimerContext } from "../../components/TimerContext/TimerContext";

const Timeranalog = () => {
  const { localTimer, stopTimer, totalSeconds, isIntervalChecked } = useContext(TimerContext);  
  const [secondsRotation, setSecondsRotation] = useState(0);
  const [minutesRotation, setMinutesRotation] = useState(0);
  const [secondsRemaining, setSecondsRemaining] = useState(0);
  const totalSecondsleft = totalSeconds; 
  const navigate = useNavigate();  

  useEffect(() => {
    if (!localTimer) return; 
  
    const updateRotation = () => {
      const { minutes } = localTimer.getTimeValues();
      const remainingSeconds = localTimer.getTotalTimeValues().seconds;
      const completedRotations = Math.floor((totalSecondsleft - remainingSeconds) / 60); // change in the future to be more precise 
      const timeInCurrentLap = (totalSecondsleft - remainingSeconds) % 60; 
      const newSecondRotation =  (timeInCurrentLap / 60) * 360 + completedRotations * 360;
      setSecondsRotation(newSecondRotation);
      setSecondsRemaining(remainingSeconds);
      const minutesDegree = (minutes / 60) * 360;  
      setMinutesRotation(minutesDegree);  
    };
  
    const intervalId = setInterval(updateRotation, 1000);
  
    localTimer.addEventListener('targetAchieved', () => {
      if (isIntervalChecked) {
        navigate('/intervall');  
      } else {
        navigate('/alarm');  
      }
    });
  
    return () => {
      clearInterval(intervalId);
      localTimer.removeEventListener('targetAchieved');
    };
  }, [localTimer, navigate]);


  const bigMarkers = Array.from({ length: 12 }, (_, index) => (  //
    <div
      key={`big-${index}`} // Unique key for each marker (required by React) 
      className="big-marker"
      style={{ transform: `rotate(${index * 30}deg) translateX(-50%)` }} // Rotate each marker by 30 degrees 
    />
  ));

  const smallMarkers = Array.from({ length: 60 }, (_, index) => (
    <div
      key={`small-${index}`}
      className="small-marker"
      style={{ transform: `rotate(${index * 6}deg) translateX(-50%)` }} 
    />
  ));

  return (
    <div className="stopwatch">
      <p className="time_left">{secondsRemaining} seconds remaining</p>
      <div className="ur">
        {bigMarkers}
        {smallMarkers}
            
        <motion.div
          className="minutes"
          style={{ originY: 1 }} 
          animate={{ rotate: minutesRotation }} 
          transition={{ type: "spring", duration: 1 }} 
        />
        <motion.div
          className="seconds"
          style={{ originY: 1 }} 
          animate={{ rotate: secondsRotation }} 
          transition={{ type: "spring", duration: 1 }} 
        />
      </div>

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
    </div>
  );
};

export default Timeranalog;
