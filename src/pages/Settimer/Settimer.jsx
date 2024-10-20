import { motion } from "framer-motion";
import { useState, useContext } from "react";
import './Settimer.scss';
import { TimerContext } from "../../components/TimerContext/TimerContext";
import { useNavigate } from 'react-router-dom';

const Settimer = () => {
  const [count, setCount] = useState(0);  // Count is in minutes
  const { setTimer } = useContext(TimerContext);  // Access context
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
    setTimer(count * 60);  // Convert minutes to seconds and start the timer
    navigate('/timerdigital');  // Navigate to Timerdigital component
  };

  return (
    <>
      <div className="settimer_container">
        <section className="settimer">
          <div className="settime_section">
            <section className="settime">
              {/* Decrement Arrow */}
              <img className="arrow" src="/Vector.png" alt="timer" onClick={decrement} />

              {/* Timer Count */}
              <p className="minutes_counter">{count}</p>

              {/* Increment Arrow */}
              <img className="arrow" src="/Vector(1).png" alt="timer" onClick={increment} />
            </section>
            <p className="minutes">minutes</p>
          </div>
        </section>

        {/* Intervals Checkboxes */}
        <div>
          <input type="checkbox" />
          <label> Intervals</label> <br />
          <input type="checkbox" />
          <label> 5 min break / interval</label>
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
          onClick={handleStartTimer}  // Save the timer count in seconds or start from 0
        >
          START TIMER
        </motion.button>
      </div>
    </>
  );
};

export default Settimer;
