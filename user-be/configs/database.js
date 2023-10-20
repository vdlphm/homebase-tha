const { Sequelize } = require("sequelize");

console.log(process.env.HOST);

const sequelize = new Sequelize("database", "username", "password", {
  host: process.env.HOST,
  dialect: "sqlite",
  logging: !process.env.PROD,
});

module.exports = sequelize;
