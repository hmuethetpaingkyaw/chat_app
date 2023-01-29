const http = require("http");
const express = require("express");
const socketio = require("socket.io");
const cors = require("cors");

const { addUser, removeUser, getUser, getUsers } = require("./users");

const router = require("./router");
const { getMessages, addMessage } = require("./messages");

const app = express();
const server = http.createServer(app);
const io = socketio(server);

app.use(cors());
app.use(router);

io.on("connect", (socket) => {
  socket.on("join", (name, callback) => {
    const { error } = addUser({ id: socket.id, name });

    if (error) return callback(error);

    // socket.emit('message', { user: 'admin', text: `${user.name}, welcome to room ${user.room}.`});
    // socket.broadcast.to(user.room).emit('message', { user: 'admin', text: `${user.name} has joined!` });

    io.to(socket.id).emit("activeUsers", { users: getUsers(socket.id) });

    callback();
  });

  socket.on("message", (senderId) => {
    const messages = getMessages(senderId, socket.id);
    io.to(socket.id).emit("messages", messages);
  });

  socket.on("sendMessage", (text, receiverId, callback) => {

    const messages = addMessage(socket.id, receiverId, text);
    io.to(receiverId).emit("messages", messages);
    callback();
  });

  socket.on("disconnect", () => {
    const user = removeUser(socket.id);

    // if(user) {
    //   io.to(user.room).emit('message', { user: 'Admin', text: `${user.name} has left.` });
    //   io.to(user.room).emit('roomData', { room: user.room, users: getUsersInRoom(user.room)});
    // }
  });
});

server.listen(process.env.PORT || 5000, () =>
  console.log(`Server has started.`)
);
