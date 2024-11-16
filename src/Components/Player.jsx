import { useState } from "react";

function Player({initialName, symbol}) {

    const [isEditing, setIsEditing] = useState(false);
    const [playerName, setPlayerName] = useState(initialName);

    /* Function to handle edit button click for player component*/
    function isEditingHandler () {

        //When updating state based on prevState pass it as a function and update. Best Practice. React does make call instantly to update state
        setIsEditing((editing) => !editing);
    };

    //React and Javascript automatically returns and event object back and can be used to get the value from the element is called on. This case is input element for player name
    //Two-way binding because feeding change event value back into player name 
    function changeNameHandler(event) {
        setPlayerName(event.target.value)
    }

    /* Default values for player component variables*/
   let userInfo = (<span className="player-name">{playerName}</span>);
   let buttonCaption = "Edit"

   /* If button is clicked want to allow name info to be edited and object updated*/
   if(isEditing){
    (userInfo = <input type="text" required onChange ={changeNameHandler} value={playerName} />);
    buttonCaption = "Save";
   }

    return(
        <li>
              <span className="player">
                    {userInfo}
                    <span className="player-symbol">{symbol}</span>
              </span>
              <button onClick={isEditingHandler} >{buttonCaption}</button>
        </li>
    )
}

export default Player;