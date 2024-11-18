import { useState } from "react";

import Player from "./Components/Player"
import GameBoard from "./Components/GameBoard"
import Log from "./Components/Log";
import GameOver from "./Components/GameOver";
import { WINNING_COMBINATIONS } from "./winning-combinations";

//Initializing game board into 2-d array
const initialGameBoard = new Array(3).fill(null).map( row => row = new Array(3).fill(null));
// const initialGameBoard = [
//     [null, null, null],
//     [null, null, null],
//     [null, null, null],

// ];


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

  let gameBoard = [...initialGameBoard.map(row => [...row])];

  
  for(const turn of gameTurns){
      const {square, player} = turn;
      const{row, col} = square;


      gameBoard[row][col] = player;
  }

  let winner;


  for(const combination of WINNING_COMBINATIONS){
    
    const firstSquare = gameBoard[combination[0].row][combination[0].column];
    const seccondSquare = gameBoard[combination[1].row][combination[1].column];
    const thirdSquare = gameBoard[combination[2].row][combination[2].column];

    if(firstSquare && firstSquare === seccondSquare && firstSquare === thirdSquare){

      winner = firstSquare;
    }
  }

  const hasDraw = gameTurns.length === 9 && !winner;

  function handlePlayerMove(rowIndex, colIndex) {
    //setActivePlayer((currentPlayer) => currentPlayer === 'X' ? 'O' : 'X');
    setGameTurns((prevTurns) => {

      const currentPlayer = getCurrentActivePlayer(prevTurns);

      const updatedTurns = [
        {square: {row: rowIndex, col: colIndex}, player: currentPlayer},
          ...prevTurns];

          return updatedTurns;
    });
  }

  function handleRestart(){
    setGameTurns([]);
  }
  
  return (
    <main>
      <div id="game-container">
          <ol id="players" className="highlight-player">
            <Player initialName="Player 1" symbol="X"  isActive={activePlayer === 'X'}/>
            <Player initialName="Player 2" symbol="O" isActive={activePlayer === 'O'}/>
          </ol>
          {(winner || hasDraw)  && <GameOver  winner={winner} onRematch={handleRestart} /> }
          <GameBoard onSelectSquare={handlePlayerMove} board={gameBoard}/>
      </div>
      <Log gameLog= {gameTurns}/>
    </main>
  )
  
}

export default App;
