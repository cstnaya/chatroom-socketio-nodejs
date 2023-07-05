const users = [];

function addUser({ id, name, room }) {
  name = name.trim().toLowerCase();
  room = room.trim().toLowerCase();

  const existingUser = users.find(
    (user) => user.name === name && user.room === room
  );

  if (existingUser) {
    return { error: "User has existed." };
  }

  const user = { id, name, room };
  users.push(user);

  return { user };
}

function removeUser(id) {
  const index = users.findIndex((user) => user.id === id);

  if (index !== -1) {
    return { user: users.splice(index, 1)[0] };
  }

  return { error: "User not existed." };
}

function getUser(id) {
  return users.find((user) => user.id === id);
}

function getUsersInRoom(room) {
  return users.filter((user) => user.room === room);
}

module.exports = { addUser, removeUser, getUser, getUsersInRoom };
