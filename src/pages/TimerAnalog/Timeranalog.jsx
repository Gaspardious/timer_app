import './timeranalog.scss';
import { useContext, useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { TimerContext } from "../../components/TimerContext/TimerContext";

const Timeranalog = () => {
  const { localTimer, stopTimer, totalSeconds, isIntervalChecked } = useContext(TimerContext);  // Access the shared localTimer instance from context
  const [secondsRotation, setSecondsRotation] = useState(0);
  const [minutesRotation, setMinutesRotation] = useState(0);
  const [secondsRemaining, setSecondsRemaining] = useState(0);
  const totalSecondsleft = totalSeconds; 
  const navigate = useNavigate();  // Access navigation to route to "/settimer"

  useEffect(() => {
    if (!localTimer) return; // Ensure the timer is initialized
  
    // Helper function to calculate and set the rotation of the clock hands
    const updateRotation = () => {
      const { minutes } = localTimer.getTimeValues();
      const remainingSeconds = localTimer.getTotalTimeValues().seconds;
      const completedRotations = Math.floor((totalSecondsleft - remainingSeconds) / 60);
      const timeInCurrentLap = (totalSecondsleft - remainingSeconds) % 60; // Correct calculation for seconds
      const newSecondRotation =  (timeInCurrentLap / 60) * 360 + completedRotations * 360;
      setSecondsRotation(newSecondRotation);

      setSecondsRemaining(remainingSeconds);




      const minutesDegree = (minutes / 60) * 360;  // Correct calculation for minutes
      setMinutesRotation(minutesDegree);  // Clockwise for minutes
    };
  
    // Set interval to update rotation every second
    const intervalId = setInterval(updateRotation, 1000);
  
    // Listen for when the timer reaches zero and navigate to '/alarm'
    localTimer.addEventListener('targetAchieved', () => {
      if (isIntervalChecked) {
        navigate('/intervall');  // Navigate to /intervall if interval is selected
      } else {
        navigate('/alarm');  // Navigate to /alarm otherwise
      }
    });
  
    // Cleanup interval and event listener on component unmount
    return () => {
      clearInterval(intervalId);
      localTimer.removeEventListener('targetAchieved');
    };
  }, [localTimer, navigate]);







  // Create 12 big markers (for each hour)
  const bigMarkers = Array.from({ length: 12 }, (_, index) => (
    <div
      key={`big-${index}`}
      className="big-marker"
      style={{ transform: `rotate(${index * 30}deg) translateX(-50%)` }} // Correct rotation and position
    />
  ));

  // Create 60 small markers (for each second)
  const smallMarkers = Array.from({ length: 60 }, (_, index) => (
    <div
      key={`small-${index}`}
      className="small-marker"
      style={{ transform: `rotate(${index * 6}deg) translateX(-50%)` }} // Correct rotation and position
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
          style={{ originY: 1 }} // Set the initial rotation directly
          animate={{ rotate: minutesRotation }} // Animate the updates
          transition={{ type: "spring", duration: 1 }} // Smooth ticking with a 1-minute interval
        />
        <motion.div
          className="seconds"
          style={{ originY: 1 }} // Set the initial rotation directly
          animate={{ rotate: secondsRotation }} // Animate the updates
          transition={{ type: "spring", duration: 1 }} // Smooth ticking with a 1-second interval
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
    </div>
  );
};

export default Timeranalog;
