import React, { useEffect, useRef } from 'react';
import { Howl } from 'howler';

const SoundBoard = () => {
  const activeSoundsRef = useRef({});

  useEffect(() => {
    console.log('SoundBoard component mounted');
    
    const sounds = {
      'q': new Howl({ src: [`${process.env.PUBLIC_URL}/sounds/SG-Guitar-1.mp3`] }),
      'w': new Howl({ src: [`${process.env.PUBLIC_URL}/sounds/SG-Guitar-2.mp3`] }),
      'e': new Howl({ src: [`${process.env.PUBLIC_URL}/sounds/sound3.mp3`] }),
      'r': new Howl({ src: [`${process.env.PUBLIC_URL}/sounds/sound4.mp3`] }),
    };

    const handleKeyPress = (event) => {
      const key = event.key.toLowerCase();
      console.log('Key pressed:', key);
      
      if (sounds[key]) {
        const soundId = sounds[key].play();
        activeSoundsRef.current[key] = soundId;
        console.log(`Playing sound for key: ${key}, Sound ID: ${soundId}`);
      } else if (key === ' ') {  // Check for space bar
        console.log('Space bar pressed, attempting to stop all sounds');
        stopAllSounds();
      }
    };

    const stopAllSounds = () => {
      console.log('Stopping all sounds');
      console.log('Active sounds:', activeSoundsRef.current);
      Object.entries(activeSoundsRef.current).forEach(([key, soundId]) => {
        console.log(`Attempting to stop sound for key: ${key}, Sound ID: ${soundId}`);
        sounds[key].stop(soundId);
        console.log(`Stopped sound for key: ${key}`);
      });
      activeSoundsRef.current = {};
      console.log('All sounds should be stopped now');
    };

    window.addEventListener('keydown', handleKeyPress);

    return () => {
      console.log('SoundBoard component unmounting');
      window.removeEventListener('keydown', handleKeyPress);
      stopAllSounds();
    };
  }, []);

  return (
    <div>
      <h1>Press Q, W, E, or R to play sounds!</h1>
      <p>Press SPACE to stop all playing sounds</p>
    </div>
  );
};

export default SoundBoard;
