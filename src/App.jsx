import { useState } from "react";

import Player from "./Components/Player"
import GameBoard from "./Components/GameBoard"
import Log from "./Components/Log";


function getCurrentActivePlayer(gameTurns){
    let currentPlayer = 'X';
    //Deriving active player from current game state
    if(gameTurns.length > 0 && gameTurns[0].player === 'X'){
      currentPlayer = 'O';
    }

    return currentPlayer;
}

function App() {

  //const [activePlayer, setActivePlayer] = useState('X');
  const [gameTurns, setGameTurns] = useState([]);

  const activePlayer = getCurrentActivePlayer(gameTurns);

  function handlePlayerMove(rowIndex, colIndex) {
    //setActivePlayer((currentPlayer) => currentPlayer === 'X' ? 'O' : 'X');
    setGameTurns((prevTurns) => {
      let currentPlayer = getCurrentActivePlayer(prevTurns);
      const updatedTurns = [
        {square: {row: rowIndex, col: colIndex}, player: currentPlayer,
          ...prevTurns}];

          return updatedTurns;
    });
  }
  return (
    <main>
      <div id="game-container">
          <ol id="players" className="highlight-player">
            <Player initialName="Player 1" symbol="X"  isActive={activePlayer === 'X'}/>
            <Player initialName="Player 2" symbol="O" isActive={activePlayer === 'O'}/>
          </ol>

          <GameBoard onSelectSquare={handlePlayerMove} activePlayerSymbol={activePlayer} gameData={gameTurns}/>
      </div>
      <Log gameLog= {gameTurns}/>
    </main>
  )
  
}

export default App;
