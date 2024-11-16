
//Initializing game board into 2-d array
const initialGameBoard = new Array(3).fill(null).map( (row) => row = new Array(3).fill(null));

function GameBoard(){

    return (
        <ol id="game-board">
            {initialGameBoard.map((row, rowIndex) => <li key={rowIndex}>
                <ol>
                    {row.map((playerSymbol, colIndex) => 
                    <li key={colIndex}>
                        <button>{playerSymbol}</button>
                    </li>
                        )}
                </ol>
            </li>
            )}
        </ol>
    )
}

export default GameBoard;