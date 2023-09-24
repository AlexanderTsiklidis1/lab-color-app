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


  return (
    <>
     
    </>
  )
}

export default App
