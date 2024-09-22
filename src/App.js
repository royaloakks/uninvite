import React from 'react';
import SoundBoard from './SoundBoard';
import './App.css';
import backgroundImage from './images/sgbg1-lo.jpg'; // Add this line

function App() {
  return (
    <div className="App" style={{backgroundImage: `url(${backgroundImage})`}}>
      <div className="soundboard-container">
        <SoundBoard />
      </div>
    </div>
  );
}

export default App;
