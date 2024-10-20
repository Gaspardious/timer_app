import useTimer from 'easytimer-react-hook';
import { useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { TimerContext } from "../../components/TimerContext/TimerContext"; 
import { useNavigate } from 'react-router-dom';
import './timerdigital.scss';

const Timerdigital = () => {
  const { timer } = useContext(TimerContext);  // Access time from context
  const navigate = useNavigate();
  const [localTimer, isTargetAchieved] = useTimer({
    countdown: false,  // Use timer value from context
    target: { seconds: timer },  // Optional target for 2 minutes
    updateWhenTargetAchieved: true,
  });

  useEffect(() => {
    localTimer.start();  // Automatically start the timer when the component mounts
  }, [localTimer]);

  return (
    <div className='timerdigital_container'>
      <div>{localTimer.getTimeValues().toString()}</div>
      
      <div>{isTargetAchieved ? navigate('/timeranalog') : 'Target not achieved'}</div>

      <section>
        {/* Use localTimer instead of timer */}
        <button onClick={() => localTimer.start()}>START</button>
        <button onClick={() => localTimer.stop()}>STOP</button>
        <button onClick={() => localTimer.reset()}>RESET</button>
        <button onClick={() => localTimer.pause()}>PAUSE</button>
      </section>

      <Link to="/settimer">
      <button onClick={() => localTimer.stop()}>STOP TIMER</button>
      </Link>
    </div>
  );
};

export default Timerdigital;
