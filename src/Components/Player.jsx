import { useState } from "react";

function Player({name, symbol}) {

    const [isEditing, setIsEditing] = useState(false);

    function isEditingHandler () {
        setIsEditing(!isEditing);
    };

   let userInfo = (<span className="player-name">{name}</span>);
   let editInfo = "Edit"

   if(isEditing){
    (userInfo = <input type="text" required />);
    editInfo = "Save";
   }

    return(
        <li>
              <span className="player">
                    {userInfo}
                    <span className="player-symbol">{symbol}</span>
              </span>
              <button onClick={isEditingHandler} >{editInfo}</button>
        </li>
    )
}

export default Player;