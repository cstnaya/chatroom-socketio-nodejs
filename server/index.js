const express = require("express");
const socketio = require("socket.io");
const http = require("http");
const cors = require("cors");

const { addUser, removeUser, getUser, getUsersInRoom } = require("./user");

const router = require("./router");

const PORT = process.env.PORT || 5600;

const app = express();
const server = http.createServer(app);
const io = socketio(server, {
  cors: {
    origin: "http://localhost:5173",
    method: ["get", "post"],
  },
});

app.use(cors());
app.use(router);

io.on("connection", (socket) => {
  socket.on("join", ({ name, room }, callback) => {
    const { error, user } = addUser({ id: socket.id, name, room });

    if (error) {
      return callback({ error });
    }

    socket.emit("message", {
      user: "admin",
      message: `${user.name}, welcome!`,
    });

    socket.broadcast.to(user.room).emit("message", {
      user: "admin",
      message: `${user.name} entered room: ${user.room}`,
    });

    socket.join(user.room);

    return callback({ message: `${user.name} entered room: ${user.room}` });
  });

  socket.on("sendMessage", (message, callback) => {
    const user = getUser(socket.id);

    io.to(user.room).emit("message", { user: user.name, message });

    callback();
  });

  socket.on("disconnect", () => {
    const { error, user } = removeUser(socket.id);

    socket.broadcast.to(user.room).emit("message", {
      user: "admin",
      message: `${user.name} left room.`,
    });

    if (user) {
      console.log(`${user.name} just left`);
    }
  });
});

server.listen(PORT, () => {
  console.log(`server started on port: ${PORT}`);
});
