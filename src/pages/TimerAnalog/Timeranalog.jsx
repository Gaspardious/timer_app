import './timeranalog.scss';
import { useContext, useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { TimerContext } from "../../components/TimerContext/TimerContext";

const Timeranalog = () => {
  const { localTimer, stopTimer } = useContext(TimerContext);  // Access the shared localTimer instance from context
  const [secondsRotation, setSecondsRotation] = useState(0);
  const [minutesRotation, setMinutesRotation] = useState(0);
  
  const navigate = useNavigate();  // Access navigation to route to "/settimer"

  useEffect(() => {
    if (!localTimer) return; // Ensure the timer is initialized
  
    // Helper function to calculate and set the rotation of the clock hands
    const updateRotation = () => {
      const { seconds, minutes } = localTimer.getTimeValues();
  
      // Calculate rotations based on seconds and minutes
      const secondsDegree = 360- (seconds / 60) * 360;  // Correct calculation for seconds
      const minutesDegree = (minutes / 60) * 360;  // Correct calculation for minutes
  
      // Set rotations without any unnecessary full rotation
      setSecondsRotation(secondsDegree);  // Counterclockwise for seconds
      setMinutesRotation(minutesDegree);  // Clockwise for minutes
    };
  
    // Set initial rotation when the component mounts
    updateRotation();
  
    // Set interval to update rotation every second
    const intervalId = setInterval(updateRotation, 1000);
  
    // Listen for when the timer reaches zero and navigate to '/alarm'
    localTimer.addEventListener('targetAchieved', () => {
      navigate('/alarm');
    });
  
    // Cleanup interval and event listener on component unmount
    return () => {
      clearInterval(intervalId);
      localTimer.removeEventListener('targetAchieved');
    };
  }, [localTimer, navigate]);


  return (
    <div className="stopwatch">
      <div className="ur">
        {/* Second hand */}
        <motion.div
          className="seconds"
          style={{ rotate: secondsRotation }} // Set the initial rotation directly
          animate={{ rotate: secondsRotation }} // Animate the updates
          transition={{ type: "spring", duration: 1 }} // Smooth ticking with a 1-second interval
        />
        {/* Minute hand */}
        <motion.div
          className="minutes"
          style={{ rotate: minutesRotation }} // Set the initial rotation directly
          animate={{ rotate: minutesRotation }} // Animate the updates
          transition={{ type: "spring", duration: 1 }} // Smooth ticking with a 1-minute interval
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
