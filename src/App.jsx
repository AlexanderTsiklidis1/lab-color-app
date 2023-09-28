import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [player1Name, setPlayer1Name] = useState('Player 1');
  const [player2Name, setPlayer2Name] = useState('Player 2');
  const [player1Color, setPlayer1Color] = useState('orchid');
  const [player2Color, setPlayer2Color] = useState('cornflowerblue');
  const [player1HP, setPlayer1HP] = useState(100);
  const [player2HP, setPlayer2HP] = useState(100);
  const [currentPlayer, setCurrentPlayer] = useState(1);
  const [message, setMessage] = useState('');
  const [dice1, setDice1] = useState(1);
  const [dice2, setDice2] = useState(1);
  const [player1Wins, setPlayer1Wins] = useState(0);
  const [player2Wins, setPlayer2Wins] = useState(0);
  const [healAmount, setHealAmount] = useState(10); // Initial heal amount
  const randomAttackPoints = () => Math.floor(Math.random() * 10) + 1;

  useEffect(() => {
    const randomInitialPlayer = Math.random() < 0.5 ? 1 : 2;
    setCurrentPlayer(randomInitialPlayer);
  }, []);

  const attack = () => {
    if (player1HP <= 0 || player2HP <= 0) {
      return; // Game over, do not allow further attacks
    }

    const points1 = randomAttackPoints();
    const points2 = randomAttackPoints();

    setDice1(points1);
    setDice2(points2);

    if (currentPlayer === 1) {
      setPlayer2HP(player2HP - points1);
      setMessage(`${player1Name} attacked for ${points1} points!`);
    } else {
      setPlayer1HP(player1HP - points2);
      setMessage(`${player2Name} attacked for ${points2} points!`);
    }

    if (player1HP - points2 <= 0) {
      setPlayer2Wins(player2Wins + 1);
      setMessage(`${player2Name} wins!`);
    } else if (player2HP - points1 <= 0) {
      setPlayer1Wins(player1Wins + 1);
      setMessage(`${player1Name} wins!`);
    }

    setCurrentPlayer(currentPlayer === 1 ? 2 : 1);
  };

  useEffect(() => {
    if (player1HP <= 0) {
      setMessage(`${player1Name} has lost!`);
    } else if (player2HP <= 0) {
      setMessage(`${player2Name} has lost!`);
    }
  }, [player1HP, player2HP]);

  const heal = () => {
    if (currentPlayer === 1 && healAmount > 0) {
      const newHP = player1HP + 10;
      setPlayer1HP(newHP > 100 ? 100 : newHP);
      setHealAmount(healAmount - 1);
    } else if (currentPlayer === 2 && healAmount > 0) {
      const newHP = player2HP + 10;
      setPlayer2HP(newHP > 100 ? 100 : newHP);
      setHealAmount(healAmount - 1);
    }
  };

  const resetGame = () => {
    setPlayer1HP(100);
    setPlayer2HP(100);
    setDice1(1);
    setDice2(1);
    setMessage('');
    setCurrentPlayer(Math.random() < 0.5 ? 1 : 2);
    setPlayer1Wins(0);
    setPlayer2Wins(0);
    setHealAmount(10);
  };

  useEffect(() => {
    animateCharacters('.message');
  }, []);

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
  }

  function rollDice() {
    // Generate random numbers between 1 and 6 for each die
    const roll1 = Math.floor(Math.random() * 6) + 1;
    const roll2 = Math.floor(Math.random() * 6) + 1;

    // Update the state with the rolled values
    setDice1(roll1);
    setDice2(roll2);

    if (currentPlayer === 1) {
      setHealAmount(healAmount + roll1 + roll2);
    }

    setMessage(
      `(${currentPlayer === 1 ? player1Name : player2Name} rolled ${roll1} and ${roll2}; and healAmount increases by ${
        roll1 + roll2
      })`
    );
  }

  const handlePlayerNameChange = (e, player) => {
    const newName = e.target.value;
    if (player === 1) {
      setPlayer1Name(newName);
    } else {
      setPlayer2Name(newName);
    }
  };

  const handleColorChange = (e, player) => {
    const newColor = e.target.value;
    if (player === 1) {
      setPlayer1Color(newColor);
    } else {
      setPlayer2Color(newColor);
    }
  };

  return (
    <div className="App">
      <h1 className="message">
        <span className="animate">C</span>
        <span className="animate">o</span>
        <span className="animate">l</span>
        <span className="animate">o</span>
        <span className="animate">r</span>
        <span className="animate">&nbsp;</span>
        <span className="animate">B</span>
        <span className="animate">a</span>
        <span className="animate">t</span>
        <span className="animate">t</span>
        <span className="animate">l</span>
        <span className="animate">e</span>
      </h1>

      <div className="players">
        <div className={`player ${currentPlayer === 1 ? 'active' : ''}`} style={{ backgroundColor: player1Color }}>
          <h2>{player1Name}</h2>
          <p>Hit Points: {player1HP}</p>
          <button onClick={attack}>Attack</button>
          <button onClick={heal}>Heal ({healAmount} left)</button>
          <div className="health-bar">
            <div className="health-fill" style={{ width: `${player1HP}%` }}></div>
          </div>
          <input type="text" placeholder="Player 1 Name" value={player1Name} onChange={(e) => handlePlayerNameChange(e, 1)} />
        
          <div>
            <label>
              <input type="radio" name="player1Color" value="orchid" checked={player1Color === 'orchid'} onChange={(e) => handleColorChange(e, 1)} /> Orchid
            </label>
            <label>
              <input type="radio" name="player1Color" value="cornflowerblue" checked={player1Color === 'cornflowerblue'} onChange={(e) => handleColorChange(e, 1)} /> Cornflower Blue
            </label>
            <label>
              <input type="radio" name="player1Color" value="red" checked={player1Color === 'red'} onChange={(e) => handleColorChange(e, 1)} /> Red
            </label>
            <label>
              <input type="radio" name="player1Color" value="orange" checked={player1Color === 'orange'} onChange={(e) => handleColorChange(e, 1)} /> Orange
            </label>
          </div>
        </div>
        <div className={`player ${currentPlayer === 2 ? 'active' : ''}`} style={{ backgroundColor: player2Color }}>
          <h2>{player2Name}</h2>
          <p>Hit Points: {player2HP}</p>
          <button onClick={attack}>Attack</button>
          <button onClick={heal}>Heal ({healAmount} left)</button>
          <div className="health-bar">
            <div className="health-fill" style={{ width: `${player2HP}%` }}></div>
          </div>
          <input type="text" placeholder="Player 2 Name" value={player2Name} onChange={(e) => handlePlayerNameChange(e, 2)} />
          
          <div>
            <label>
              <input type="radio" name="player2Color" value="orchid" checked={player2Color === 'orchid'} onChange={(e) => handleColorChange(e, 2)} /> Orchid
            </label>
            <label>
              <input type="radio" name="player2Color" value="cornflowerblue" checked={player2Color === 'cornflowerblue'} onChange={(e) => handleColorChange(e, 2)} /> Cornflower Blue
            </label>
            <label>
              <input type="radio" name="player2Color" value="red" checked={player2Color === 'red'} onChange={(e) => handleColorChange(e, 2)} /> Red
            </label>
            <label>
              <input type="radio" name="player2Color" value="orange" checked={player2Color === 'orange'} onChange={(e) => handleColorChange(e, 2)} /> Orange
            </label>
          </div>
        </div>
      </div>
      <p className="message">{message}</p>
      <div className="win-count">
        <p>{player1Name}: {player1Wins} Wins</p>
        <p>{player2Name}: {player2Wins} Wins</p>
      </div>
      <button className="reset-button" onClick={resetGame}>
        Reset Game
      </button>
      <div className="turn-arrow">
        {currentPlayer === 1 ? <span>&#8592;</span> : <span>&#8594;</span>}
      </div>
      <div>
        <h1>Dice Roller</h1>
        <div className="dice">
          <div className="die">{dice1}</div>
          <div className="die">{dice2}</div>
        </div>
        <button onClick={rollDice}>Roll Dice</button>
      </div>
    </div>
  );
}

export default App;
