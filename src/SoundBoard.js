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
        console.log('Attempting to play sound for key:', key);
        const soundId = sounds[key].play();
        console.log('Sound ID:', soundId);
        activeSoundsRef.current[key] = soundId;
      } else if (key === 'escape') {
        console.log('Escape key pressed, stopping all sounds');
        stopAllSounds();
      }
    };

    const stopAllSounds = () => {
      console.log('Stopping all sounds');
      Object.entries(activeSoundsRef.current).forEach(([key, soundId]) => {
        console.log('Stopping sound for key:', key, 'ID:', soundId);
        sounds[key].stop(soundId);
      });
      activeSoundsRef.current = {};
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
      <p>Press ESC to stop all playing sounds</p>
    </div>
  );
};

export default SoundBoard;
