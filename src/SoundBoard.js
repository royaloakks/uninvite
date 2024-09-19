import React, { useEffect } from 'react';
import { Howl } from 'howler';

const SoundBoard = () => {
  useEffect(() => {
    const sounds = {
      'q': new Howl({ src: ['/sounds/SG-Guitar-1.mp3'] }),
      'w': new Howl({ src: ['/sounds/SG-Guitar-2.mp3'] }),
      'e': new Howl({ src: ['/sounds/sound3.mp3'] }),
      'r': new Howl({ src: ['/sounds/sound4.mp3'] }),
      // Add more sounds for different keys as needed
    };

    const handleKeyPress = (event) => {
      const key = event.key.toLowerCase();
      if (sounds[key]) {
        sounds[key].play();
      }
    };

    window.addEventListener('keydown', handleKeyPress);

    // Cleanup function
    return () => {
      window.removeEventListener('keydown', handleKeyPress);
    };
  }, []);

  return (
    <div>
      <h1>Press Q, W, E, or R to play sounds!</h1>
    </div>
  );
};

export default SoundBoard;
