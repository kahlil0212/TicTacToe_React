import { useState } from "react";


//Initializing game board into 2-d array
const initialGameBoard = new Array(3).fill(null).map( (row) => row = new Array(3).fill(null));
// const initialGameBoard = [
//     [null, null, null],
//     [null, null, null],
//     [null, null, null],

// ];

function GameBoard(){

    const [gameBoard, setGameBoard] = useState(initialGameBoard);

    function playerMoveHandler(rowIdx, colIdx){
        setGameBoard((prevGameBoard) => {
            //When updating object or array, it is reference based and needs a copy of the prev object. Mimics immutability for data safety
            const updatedBoard = [...prevGameBoard.map(prevRow => [...prevRow])];
            updatedBoard[rowIdx][colIdx] = 'X';

            return updatedBoard;
        });
    }

    return (
        <ol id="game-board">
            {gameBoard.map((row, rowIndex) => <li key={rowIndex}>
                <ol>
                    {row.map((playerSymbol, colIndex) => 
                    <li key={colIndex}>
                        <button onClick={() => playerMoveHandler(rowIndex, colIndex)}>{playerSymbol}</button>
                    </li>
                        )}
                </ol>
            </li>
            )}
        </ol>
    )
}

export default GameBoard;