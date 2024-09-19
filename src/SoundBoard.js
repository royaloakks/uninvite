import React, { useEffect, useState } from 'react';
import { Howl, Howler } from 'howler';

const SoundBoard = () => {
  const [activeSounds, setActiveSounds] = useState([]);

  useEffect(() => {
    const sounds = {
      'q': new Howl({ src: [`${process.env.PUBLIC_URL}/sounds/SG-Guitar-1.mp3`] }),
      'w': new Howl({ src: [`${process.env.PUBLIC_URL}/sounds/SG-Guitar-2.mp3`] }),
      'e': new Howl({ src: [`${process.env.PUBLIC_URL}/sounds/sound3.mp3`] }),
      'r': new Howl({ src: [`${process.env.PUBLIC_URL}/sounds/sound4.mp3`] }),
      // Add more sounds for different keys as needed
    };

    const handleKeyPress = (event) => {
      const key = event.key.toLowerCase();
      if (sounds[key]) {
        const sound = sounds[key].play();
        setActiveSounds(prev => [...prev, sound]);
      } else if (key === 'escape') {
        stopAllSounds();
      }
    };

    const stopAllSounds = () => {
      activeSounds.forEach(soundId => {
        Howler.stop(soundId);
      });
      setActiveSounds([]);
    };

    window.addEventListener('keydown', handleKeyPress);

    // Cleanup function
    return () => {
      window.removeEventListener('keydown', handleKeyPress);
      stopAllSounds();
    };
  }, [activeSounds]);

  return (
    <div>
      <h1>Press Q, W, E, or R to play sounds!</h1>
      <p>Press ESC to stop all sounds</p>
    </div>
  );
};

export default SoundBoard;
