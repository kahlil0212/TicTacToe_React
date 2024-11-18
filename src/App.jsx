import { useState } from "react";

import Player from "./Components/Player"
import GameBoard from "./Components/GameBoard"
import Log from "./Components/Log";
import GameOver from "./Components/GameOver";
import { WINNING_COMBINATIONS } from "./winning-combinations";

//Initializing game board into 2-d array
const INITIAL_GAME_BOARD = new Array(3).fill(null).map( row => row = new Array(3).fill(null));
// const initialGameBoard = [
//     [null, null, null],
//     [null, null, null],
//     [null, null, null],

// ];

const PLAYERS = {
  'X': "Player 1",
  'O': "Player 2"
}


function getCurrentActivePlayer(gameTurns){

    let currentPlayer = 'X';

    //Deriving active player from current game state
    if(gameTurns.length > 0 && gameTurns[0].player === 'X'){
      currentPlayer = 'O';
    }

    return currentPlayer;
}

function setupGame(gameTurns){

  let gameBoard = [...INITIAL_GAME_BOARD.map(row => [...row])];

  
  for(const turn of gameTurns){
      const {square, player} = turn;
      const{row, col} = square;


      gameBoard[row][col] = player;
  }

  return gameBoard;
}

function decideWinner(gameBoard, players){
  
  let winner;


  for(const combination of WINNING_COMBINATIONS){
    
    const firstSquare = gameBoard[combination[0].row][combination[0].column];
    const seccondSquare = gameBoard[combination[1].row][combination[1].column];
    const thirdSquare = gameBoard[combination[2].row][combination[2].column];

    if(firstSquare && firstSquare === seccondSquare && firstSquare === thirdSquare){

      winner = players[firstSquare];
    }
  }

  return winner;
}

function App() {

  const [players, setPlayers] = useState(PLAYERS);
  const [gameTurns, setGameTurns] = useState([]);

  const activePlayer = getCurrentActivePlayer(gameTurns);
  const gameBoard = setupGame(gameTurns);
  const winner = decideWinner(gameBoard, players);
  const hasDraw = gameTurns.length === 9 && !winner;

  function handlePlayerMove(rowIndex, colIndex) {
    
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

  function handlePlayerNameChange(symbol, newName){
    setPlayers(prevPlayers => {
      return {
        ...prevPlayers,
        [symbol]: newName //Javascript syntax to dynamically update a specific property
      };
    });
  }
  
  return (
    <main>
      <div id="game-container">
          <ol id="players" className="highlight-player">
            <Player 
            initialName={PLAYERS.X} 
            symbol="X"  
            isActive={activePlayer === 'X'}
            onNameChange={handlePlayerNameChange}/>
            <Player 
            initialName={PLAYERS.O} 
            symbol="O" 
            isActive={activePlayer === 'O'}
            onNameChange={handlePlayerNameChange}/>
          </ol>
          {(winner || hasDraw)  && <GameOver  winner={winner} onRematch={handleRestart} /> }
          <GameBoard onSelectSquare={handlePlayerMove} board={gameBoard}/>
      </div>
      <Log gameLog= {gameTurns}/>
    </main>
  )
  
}

export default App;
