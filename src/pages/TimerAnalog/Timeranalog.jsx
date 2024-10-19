import './timeranalog.scss'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'



const Timeranalog = () => {
  return (
      <div className="stopwatch">

      <p>Animated stopwatch build with vanilla CSS.</p>


        <div className="ur">
            <div className="seconds"></div>
            <div className="minutes"></div>
        </div>


    <Link to="/settimer">
      <button>STOP TIMER</button>
    </Link>
      </div>
  )
}

export default Timeranalog