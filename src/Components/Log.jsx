


function Log({ gameLog }){

    return(
        <ol id="log">
            {/* Template literal to allow expression to be created for a key */}
            {gameLog.map((move) => <li key={`${move.square.row}${move.square.col}`}>{move.player} selected square {move.square.row}, {move.square.col}</li>)}
        </ol>
    );
}

export default Log;