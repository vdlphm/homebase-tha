const users = new Map();

function addNewUser(user) {
  if (users.has(user.email)) {
    throw `${user.email} already exists`;
  }
  users.set(user.email, user);
}

module.exports = { addNewUser };
