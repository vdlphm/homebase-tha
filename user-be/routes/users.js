const express = require("express");
const router = express.Router();
const userDb = require("../models/users");

router.post("/", (req, res) => {
  if (
    !req.body.hasOwnProperty("email") ||
    !req.body.hasOwnProperty("firstname") ||
    !req.body.hasOwnProperty("lastname")
  ) {
    res.status(400);
    res.send("Body is missing email/firstname/lastname");
    return;
  }
  try {
    userDb.addNewUser(req.body);
    res.sendStatus(201);
  } catch (err) {
    res.status(400);
    res.send(err);
  }
});

module.exports = router;
