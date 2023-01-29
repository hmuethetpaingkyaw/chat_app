import React, { useEffect, useState } from "react";

import ScrollToBottom from "react-scroll-to-bottom";
import Message from "./Message/Message";

import "./Messages.css";


const Messages = ({ receiver,messages }) => {

  return (
    <ScrollToBottom className="messages">
      {messages.map((message, i) => (
        <div key={i}>
          <Message message={message} receiver={receiver} />
        </div>
      ))}
    </ScrollToBottom>
  );
};

export default Messages;
