import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [player1HP, setPlayer1HP] = useState(100);
  const [player2HP, setPlayer2HP] = useState(100);
  const [currentPlayer, setCurrentPlayer] = useState(1);
  const [message, setMessage] = useState('');

  const randomAttackPoints = () => Math.floor(Math.random() * 10) + 1;

  const attack = () => {
    if (player1HP <= 0 || player2HP <= 0) {
      return; // Game over, do not allow further attacks
    }

    const points = randomAttackPoints();

    if (currentPlayer === 1) {
      setPlayer2HP(player2HP - points);
      setCurrentPlayer(2);
      setMessage(`Player 1 attacked for ${points} points!`);
    } else {
      setPlayer1HP(player1HP - points);
      setCurrentPlayer(1);
      setMessage(`Player 2 attacked for ${points} points!`);
    }
  };

  useEffect(() => {
    if (player1HP <= 0) {
      setMessage('Player 1 has lost!');
    } else if (player2HP <= 0) {
      setMessage('Player 2 has lost!');
    }
  }, [player1HP, player2HP]);
  
  const resetGame = () => {
    setPlayer1HP(100);
    setPlayer2HP(100);
    setMessage('');
    setCurrentPlayer(1);
  };


  useEffect(() => {
    animateCharacters('.message');
  },);

  function animateCharacters(selector) {
    const element = document.querySelector(selector);
    if (element) {
      const spanElements = element.querySelectorAll('span');
      spanElements.forEach((spanElement) => {
        const randomDuration = 0.2 + Math.random() * 1;
        spanElement.classList.remove('animate');
        spanElement.style.setProperty('--duration', randomDuration + 's');
      });
      setInitialRandomColor(spanElements);
    }
  }

  function setInitialRandomColor(spanElements) {
    spanElements.forEach((spanElement) => {
      const randomColor = getRandomColor();
      spanElement.style.setProperty('--initial-color', randomColor);
    });
  }

  function getRandomColor() {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;

    function random($min, $max) {
      $rand: random() * ($max - $min) + $min;
      return round($rand);
  }


  }


  return (
    <div className="App">
      <h1 className='message'>
      <span className='animate'>C</span>
      <span className='animate'>o</span>
      <span className='animate'>l</span>
      <span className='animate'>o</span>
      <span className='animate'>r</span>
      <span className='animate'>&nbsp;</span>
      <span className='animate'>B</span>
      <span className='animate'>a</span>
      <span className='animate'>t</span>
      <span className='animate'>t</span>
      <span className='animate'>l</span>
      <span className='animate'>e</span></h1>

      <div className="players">
        <div className={`player ${currentPlayer === 1 ? 'active' : ''}`}>
          <h2>Player 1</h2>
          <p>Hit Points: {player1HP}</p>
          <button onClick={attack}>Attack</button>
        </div>
        <div className={`player ${currentPlayer === 2 ? 'active' : ''}`}>
          <h2>Player 2</h2>
          <p>Hit Points: {player2HP}</p>
          <button onClick={attack}>Attack</button>
        </div>
      </div>
      <p className="message">{message}</p>
      <button className="reset-button" onClick={resetGame}>
        Reset Game
      </button>
    </div>
  )
}

export default App
