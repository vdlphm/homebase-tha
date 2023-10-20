const express = require("express");
const server = express();
const PORT = process.env.PORT || 3000;
const userRoute = require("./routes/users");

server.use(express.json());

server.use("/users", userRoute);

server.listen(PORT, () => {
  console.log(`Node BE is running on ${PORT}`);
});
