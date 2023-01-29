import React, { useState, useEffect } from "react";
import queryString from "query-string";
import io from "socket.io-client";

import TextContainer from "../TextContainer/TextContainer";
import Messages from "../Messages/Messages";
import InfoBar from "../InfoBar/InfoBar";
import Input from "../Input/Input";

import "./Chat.css";

const ENDPOINT = "http://localhost:5000/";

let socket;

const Chat = ({ location }) => {
  const [name, setName] = useState("");
  const [receiver, setReceiver] = useState();
  const [users, setUsers] = useState([]);
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    const { name } = queryString.parse(location.search);

    socket = io(ENDPOINT);

    setName(name);

    socket.emit("join", name, (error) => {
      if (error) {
        alert(error);
      }
    });
  }, [ENDPOINT, location.search]);

  useEffect(() => {
    socket.on("activeUsers", ({ users }) => {
      setUsers(users);
    });
  }, []);

  useEffect(()=> {
    socket.on("messages", (messages) => {
      console.log(messages);
      setMessages(messages);
    });
  },[messages, socket, message])

  const sendMessage = (event) => {
    event.preventDefault();

    if (message) {
      socket.emit("sendMessage", message,receiver.id, () => setMessage(""));
    }
  };

  return (
    <div className="outerContainer">
      <TextContainer users={users} setReceiver={setReceiver} />
      {receiver ? (
        <div className="container">
          <InfoBar receiver={receiver} />
          <Messages receiver={receiver} messages={messages} />
          <Input
            message={message}
            setMessage={setMessage}
            sendMessage={sendMessage}
          />
        </div>
      ) : null}
    </div>
  );
};

export default Chat;
