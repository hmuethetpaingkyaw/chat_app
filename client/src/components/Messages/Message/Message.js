import React from "react";

import "./Message.css";

import ReactEmoji from "react-emoji";
import classNames from "classnames";

const Message = ({ message, receiver }) => {
  // let isSentByCurrentUser = false;

  // const trimmedName = name.trim().toLowerCase();

  // if(user === trimmedName) {
  //   isSentByCurrentUser = true;
  // }

  return (
    <span
      className={classNames('bg-black',{ "backgroundBlue": receiver.id === message.receiverId })}
    >
      {message.text}
    </span>
  );
  //   isSentByCurrentUser
  //     ? (
  //       <div className="messageContainer justifyEnd">
  //         <p className="sentText pr-10">{trimmedName}</p>
  //         <div className="messageBox backgroundBlue">
  //           <p className="messageText colorWhite">{ReactEmoji.emojify(text)}</p>
  //         </div>
  //       </div>
  //       )
  //       : (
  //         <div className="messageContainer justifyStart">
  //           <div className="messageBox backgroundLight">
  //             <p className="messageText colorDark">{ReactEmoji.emojify(text)}</p>
  //           </div>
  //           <p className="sentText pl-10 ">{user}</p>
  //         </div>
  //       )
  // );
};

export default Message;
