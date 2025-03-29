import { motion } from "framer-motion";
import { useState, useContext } from "react";
import './Settimer.scss';
import { TimerContext } from "../../components/TimerContext/TimerContext";
import { useNavigate } from 'react-router-dom';

const Settimer = () => {
  const [count, setCount] = useState(5);                                // Initial value of the timer
  const [isIntervalChecked, setIsIntervalChecked] = useState(false);
  const { startTimer } = useContext(TimerContext); 
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
    startTimer(count * 60, isIntervalChecked);  
    navigate('/timeranalog');  
  };

  const handleCheckboxChange = () => {
    setIsIntervalChecked(!isIntervalChecked); 
  };

  return (
    <>
      <div className="settimer_container">
        <section className="settimer">
          <div className="settime_section">
            <section className="settime">
              <img className="arrow" src="/left-chevron.png" alt="timer" onClick={decrement} />
              <p className="minutes_counter">{count}</p>
              <img className="arrow" src="/right-chevron.png" alt="timer" onClick={increment} />
            </section>
            <p className="minutes">minutes</p>
          </div>
        </section>

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
          onClick={handleStartTimer} 
        >
          START TIMER
        </motion.button>
        <p className='portfolio'>
      Portfolio: <a className='link_portfolio' href="https://gaspardev.com/" target="_blank" rel="noopener noreferrer">GasparDev</a>
    </p>    
      </div>

      
    </>
  );
};

export default Settimer;
