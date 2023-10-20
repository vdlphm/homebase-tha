const { Model, DataTypes, where } = require("sequelize");
const sequelize = require("../configs/database");

class User extends Model {}

User.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    email: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
    },
    firstname: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    lastname: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  { sequelize, modelName: "user", timestamps: false }
);

async function findUserByEmail(email) {
  return await User.findOne({ where: { email: email } });
}

async function addNewUser(user) {
  return await User.create(user);
}

async function getUser(email) {
  return await findUserByEmail(email);
}

async function deleteUser(email) {
  return await User.destroy({ where: { email: email } });
}

async function updateUser(email, updateInfo) {
  const user = await findUserByEmail(email);
  if (!user) {
    throw new Error(`${email} not found`);
  }
  if (updateInfo.hasOwnProperty("email")) {
    user.email = updateInfo.email;
  }
  if (updateInfo.hasOwnProperty("firstname")) {
    user.firstname = updateInfo.firstname;
  }
  if (updateInfo.hasOwnProperty("lastname")) {
    user.lastname = updateInfo.lastname;
  }
  await user.save();
}

module.exports = { addNewUser, getUser, deleteUser, updateUser };
