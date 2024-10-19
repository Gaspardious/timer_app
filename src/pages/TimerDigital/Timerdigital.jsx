import useTimer from 'easytimer-react-hook';
import React from 'react';
import { Link } from 'react-router-dom';
import './timerdigital.scss';


const Timerdigital = () => {
  const [timer, isTargetAchieved] = useTimer({
    countdown: false,
    startValues: { seconds: 0 },  
    target: {seconds: 120,  },  // Optional target
    updateWhenTargetAchieved: true,
  });

  return (
    <div className='timerdigital_container'>
      <div>{timer.getTimeValues().toString()}</div>
      
      <div>{isTargetAchieved ? 'Target achieved' : 'Target not achieved'}</div>

    <section>
      <button onClick={() => timer.start()}>START</button>
      <button onClick={() => timer.stop()}>STOP</button>
      <button onClick={() => timer.reset()}>RESET</button>
      <button onClick={() => timer.pause()}>PAUSE</button>
    </section>

    <Link to="/settimer">
      <button>STOP TIMER</button>
    </Link>
      

    </div>
  );
};

export default Timerdigital;
