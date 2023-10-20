const users = new Map();

function addNewUser(user) {
  if (users.has(user.email)) {
    throw `${user.email} already exists`;
  }
  users.set(user.email, user);
}

function getUser(email) {
  return users.get(email);
}

function deleteUser(email) {
  if (!users.delete(email)) {
    throw `${email} does not exist`;
  }
}

module.exports = { addNewUser, getUser, deleteUser };
