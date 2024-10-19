import { motion } from "framer-motion"
import { useState } from "react"
import './Settimer.scss'
import { Link } from "react-router-dom"
import useTimer from 'easytimer-react-hook';


const Settimer = () => {
  const [count, setCount] = useState(0)

  const increment = () => {
    if (count < 60) {
      setCount(count + 1)
    }
  }

  const decrement = () => {
    if (count > 0) {
      setCount(count - 1)
    }
  }


  return (
    <>
      <div
        className="settimer_container"
      >
      <section className="settimer">
        <div className="settime_section">
          <section className="settime">
            <img className="arrow" src="/Vector.png" alt="timer" onClick={decrement}
             />

            <p className="minutes_counter">{count}</p>

            <img className="arrow" src="/Vector(1).png" alt="timer" onClick={increment}  />
          </section>
          <p>minutes</p>
        </div>
      </section>


        <div>
          <input type="checkbox"  />
          <label> Intervals</label> <br />
          <input type="checkbox"  />
          <label> 5 min break / interval</label>
        </div>



    
        <motion.button className="timer_btn"
          whileTap={{ 
            scale: 0.9,
           }}

          whileHover={{ 
            scale: 1.1,
            backgroundColor: 'rgba(238, 238, 238, 1)',
            color: 'rgba(0, 0, 0, 1)',
            boxShadow: '0px 0px 8px rgba(0, 0, 0, 0.1)',
            border: 'black 1px solid',
            fontWeight: 'bold',
           }}
           onClick={() => timer.start()}
        >START TIMER</motion.button>
      

    
      </div>


    </>
  )
}

export default Settimer


