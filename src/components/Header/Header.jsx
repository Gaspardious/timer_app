import { motion, stagger, useAnimate } from 'framer-motion'
import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom';
import './Header.scss'


const Header = () => {
  const [open, setOpen] = useState(false);
  const [scope, animate] = useAnimate();
  const staggerList = stagger(0.1, { startDelay: 0.25 });

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
        y: open ? '0%' : '100%', 
        opacity: open ? 1 : 0,
      },
      { 
        type: "spring",
        bounce: 0,
        duration: 0.8,
      }
    );
    animate(
      ".li_container",
      open ? { opacity: 1, scale: 1, x: 0 } : { opacity: 0, scale: 0.3, x: -50 },
      
      
      { 
        duration: 0.4,
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
        animate={{ opacity: 1, scale: 1.2 }}
        whileHover={{ scale: 1 }}
        transition={{ duration: 1 }}
        onClick={() => setOpen(!open)} 
        whileTap={{scale:0.95}}
    >
      MENU
    </motion.button>

    <ul className='ul_container'>
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












