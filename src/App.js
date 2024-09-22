import React, { useEffect, useRef } from 'react';
import SoundBoard from './SoundBoard';
import './App.css';
import backgroundImage from './images/sgbg1-lo.jpg';

function App() {
  const overlayRef = useRef(null);

  useEffect(() => {
    const handleMouseMove = (e) => {
      if (overlayRef.current) {
        const x = e.clientX / window.innerWidth;
        const y = e.clientY / window.innerHeight;
        overlayRef.current.style.setProperty('--mouse-x', x);
        overlayRef.current.style.setProperty('--mouse-y', y);
      }
    };

    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return (
    <div className="App" style={{backgroundImage: `url(${backgroundImage})`}}>
      <div className="overlay" ref={overlayRef}></div>
      <div className="soundboard-container">
        <SoundBoard />
      </div>
    </div>
  );
}

export default App;
