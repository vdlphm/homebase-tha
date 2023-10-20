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

function updateUser(email, user) {
  if (!users.has(email)) {
    throw `${email} does not exist`;
  }
  if (email === user.email) {
    users.set(email, user);
  } else {
    users.delete(email);
    users.set(user.email, user);
  }
}

module.exports = { addNewUser, getUser, deleteUser, updateUser };
