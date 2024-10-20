import './timeranalog.scss';
import { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { TimerContext } from "../../components/TimerContext/TimerContext";

const Timeranalog = () => {
  const { timer } = useContext(TimerContext);  // Access the timer from context
  const [secondsRotation, setSecondsRotation] = useState(0);
  const [minutesRotation, setMinutesRotation] = useState(0);

  useEffect(() => {
    // Calculate the rotation for the second hand (0 to 360 degrees)
    const seconds = timer % 60;
    const secondsDegree = (seconds / 60) * 360;
    setSecondsRotation(secondsDegree);

    // Calculate the rotation for the minute hand (0 to 360 degrees)
    const minutes = Math.floor(timer / 60);
    const minutesDegree = (minutes / 60) * 360;
    setMinutesRotation(minutesDegree);
  }, [timer]);

  return (
    <div className="stopwatch">
      <p>Analog stopwatch tied to useContext Timer with Framer Motion animation.</p>

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

      <Link to="/settimer">
        <button>STOP TIMER</button>
      </Link>
    </div>
  );
};

export default Timeranalog;
