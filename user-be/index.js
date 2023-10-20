const express = require("express");
const server = express();
const PORT = process.env.PORT || 3000;
const sequelize = require("./configs/database");
const userRoute = require("./routes/users");

sequelize
  .sync({ force: true })
  .then(() => console.log("DB connection is ready"))
  .catch((err) => {
    console.log("Cannot connect to DB. Please try again!");
    process.exit(1);
  });

server.use(express.json());

server.use("/users", userRoute);

server.listen(PORT, () => {
  console.log(`Node BE is running on ${PORT}`);
});
