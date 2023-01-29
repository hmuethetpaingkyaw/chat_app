import React from "react";

import onlineIcon from "../../icons/onlineIcon.png";

import "./TextContainer.css";

const TextContainer = ({ users , setReceiver}) => (
  <div className="textContainer">
    {users ? (
      <div>
        <h1>Active users:</h1>
        <div className="activeContainer">
          <h2>
            {users.map(user => (
              <button key={user.id} className="activeItem" onClick={()=> {
                setReceiver(user)
              }}>
                {user.name}
                <img alt="Online Icon" src={onlineIcon} />
              </button>
            ))}
          </h2>
        </div>
      </div>
    ) : null}
  </div>
);

export default TextContainer;
