import { motion, stagger, useAnimate } from 'framer-motion'
import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom';
import './header.scss'


const Header = () => {
  const [open, setOpen] = useState(false);
  const [scope, animate] = useAnimate();
  const staggerList = stagger(0.15, { startDelay: 0.25 });

  const links = [
    { label: 'HOME', path: '/' },
    { label: 'SET TIMER ⏱️', path: '/settimer' },
    { label: 'Timer: Analog', path: '/timeranalog' },
    { label: 'Timer: Digital', path: '/timerdigital' },
  ];

  useEffect(() => {
    animate(
      ".ul_container",
      {
        x: open ? '0%' : '-100%', 
        opacity: open ? 1 : 0,
      },
      { 
        type: "spring",
        bounce: 0,
        duration: 0.5,
      }
    );
    animate(
      ".li_container",
      {
        x: open ? '0%' : '-100%', 
        opacity: open ? 1 : 0,
      },
      { 
        type: "spring",
        bounce: 0,
        duration: 0.5,
        delay: open ? staggerList : 0,
      }
    );
  }, [open]);
  





  return (
    <>
      <div className='container' ref={scope}>

    <motion.button 
        className='button' 
        initial={{ opacity: 0 }} 
        animate={{ opacity: 1 }}
        whileHover={{ scale: 1.1 }}
        onClick={() => setOpen(!open)} 
        whileTap={{scale:0.8}}
    >
      MENU
    </motion.button>

    <ul className='ul_container'>
      <p     className='close_btn'   onClick={() => setOpen(false)} >x</p>
    {links.map((link, index) => (
        <motion.li className='li_container' key={index}>
          <Link 
            to={link.path} 
            onClick={() => setOpen(false)} 
          >
            {link.label}
          </Link>
        </motion.li>
      ))}
    </ul>


    </div>



    </>
  )
}

export default Header












