import useTimer from 'easytimer-react-hook';
import { useContext, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { TimerContext } from "../../components/TimerContext/TimerContext"; 
import './timerdigital.scss';

const Timerdigital = () => {
  const { timer } = useContext(TimerContext);  // Access time from context (in seconds)
  const navigate = useNavigate();
  const [localTimer, isTargetAchieved] = useTimer({
    countdown: timer > 0,  // Count down if timer > 0, count up if timer is 0
    startValues: { seconds: timer },  // Use timer value from context (in seconds)
    updateWhenTargetAchieved: true,
  });

  useEffect(() => {
    localTimer.start();  // Automatically start the timer when the component mounts
  }, [localTimer]);

  return (
    <div className='timerdigital_container'>
      <div className='timerdigital_count'>{localTimer.getTimeValues().toString()}</div>
      
    <div>{isTargetAchieved ? navigate('/alarm') : 'Target not achieved'}</div>

      <section className='btns'>
        <button className='btn_ _start' onClick={() => localTimer.start()}>START</button>
        <button className='btn_ _pause' onClick={() => localTimer.pause()}>PAUSE</button>
        <button className='btn_ _stop' onClick={() => localTimer.stop()}>STOP</button>
        <button className='btn_ _reset' onClick={() => localTimer.reset()}>RESET</button>

     

      </section>

      <Link to="/settimer">
        <button>STOP TIMER</button>
      </Link>
    </div>
  );
};

export default Timerdigital;

