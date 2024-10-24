import { motion } from "framer-motion";
import { useState, useContext } from "react";
import './Settimer.scss';
import { TimerContext } from "../../components/TimerContext/TimerContext";
import { useNavigate } from 'react-router-dom';

const Settimer = () => {
  const [count, setCount] = useState(1);  // Count is in minutes
  const [isIntervalChecked, setIsIntervalChecked] = useState(false);
  const { startTimer } = useContext(TimerContext);  // Access context
  const navigate = useNavigate();

  const increment = () => {
    if (count < 60) {
      setCount(count + 1);
    }
  };

  const decrement = () => {
    if (count > 0) {
      setCount(count - 1);
    }
  };

  const handleStartTimer = () => {
    startTimer(count * 60, isIntervalChecked);  // Pass interval selection to startTimer
    navigate('/timeranalog');  // Navigate to Timeranalog component
  };

  const handleCheckboxChange = () => {
    setIsIntervalChecked(!isIntervalChecked);  // Toggle the checkbox state
  };





  return (
    <>
      <div className="settimer_container">
        <section className="settimer">
          <div className="settime_section">
            <section className="settime">
              {/* Decrement Arrow */}
              <img className="arrow" src="/left-chevron.png" alt="timer" onClick={decrement} />

              {/* Timer Count */}
              <p className="minutes_counter">{count}</p>

              {/* Increment Arrow */}
              <img className="arrow" src="/right-chevron.png" alt="timer" onClick={increment} />
            </section>
            <p className="minutes">minutes</p>
          </div>
        </section>

        {/* Intervals Checkboxes */}
        <div>
          <input 
            type="checkbox" 
            id="interval-checkbox"
            checked={isIntervalChecked}  
            onChange={handleCheckboxChange} 
          />
          <label className="checkboxes" htmlFor="interval-checkbox">
             Intervals - 5 min break
          </label>
        </div>

        {/* Start Timer Button */}
        <motion.button
          className="timer_btn"
          whileTap={{ scale: 0.9 }}
          whileHover={{
            scale: 1.1,
            backgroundColor: 'rgba(238, 238, 238, 1)',
            color: 'rgba(0, 0, 0, 1)',
            boxShadow: '0px 0px 8px rgba(0, 0, 0, 0.1)',
            border: 'black 1px solid',
            fontWeight: 'bold',
          }}
          onClick={handleStartTimer}  // Start timer when button is clicked
        >
          START TIMER
        </motion.button>
      </div>
    </>
  );
};

export default Settimer;
