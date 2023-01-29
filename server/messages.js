const { getUser } = require("./users");

const messages = [];

const addMessage = ( senderId, receiverId,text ) => {
  // const existingUser = getUser(receiverId);

  // if (!text) return { error: "Message are required." };
  // if (!existingUser) return { error: "No user to recieve message" };

  const message = { senderId, receiverId, text };

  messages.push(message);

  return messages;
};

// const removeUser = (id) => {
//   const index = users.findIndex((user) => user.id === id);

//   if(index !== -1) return users.splice(index, 1)[0];
// }

//const getUser = (id) => users.find((user) => user.id === id);

const getMessages = (senderId, receiverId) =>
  messages.filter(
    (message) =>
      message.senderId === senderId && message.receiverId === receiverId
  );

module.exports = { addMessage, getMessages };
