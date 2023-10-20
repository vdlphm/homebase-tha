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

router.get("/", (req, res) => {
  if (!req.query.email) {
    res.status(400);
    res.send("Email is required!");
    return;
  }
  const user = userDb.getUser(req.query.email);
  if (!user) {
    res.status(404);
    res.send(`${req.query.email} not found`);
  } else {
    res.status(200);
    res.send(user);
  }
});

router.delete("/", (req, res) => {
  if (!req.query.email) {
    res.status(400);
    res.send("Email is required!");
    return;
  }
  try {
    userDb.deleteUser(req.query.email);
    res.send(200);
  } catch (err) {
    res.status(404);
    res.send(err);
  }
});

router.put("/", (req, res) => {
  if (!req.query.email) {
    res.status(400);
    res.send("Email is required!");
    return;
  }
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
    userDb.updateUser(req.query.email, req.body);
    res.sendStatus(200);
  } catch (err) {
    res.status(404);
    res.send(err);
  }
});

module.exports = router;
