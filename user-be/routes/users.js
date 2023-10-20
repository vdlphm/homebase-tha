const express = require("express");
const router = express.Router();
const userDb = require("../models/users");
const { SequelizeScopeError, ValidationErrorItem } = require("sequelize");

router.post("/", async (req, res) => {
  try {
    await userDb.addNewUser(req.body);
    res.sendStatus(201);
  } catch (err) {
    if (err.errors) {
      res.status(400);
      res.send(err.errors.map((x) => x.message));
    } else {
      res.sendStatus(500);
      res.send(err.message);
    }
  }
});

router.get("/", async (req, res) => {
  if (!req.query.email) {
    res.status(400);
    res.send({ error: "Email is required!" });
    return;
  }
  const user = await userDb.getUser(req.query.email);
  if (!user) {
    res.status(404);
    res.send({ error: `${req.query.email} not found` });
  } else {
    res.status(200);
    res.send(user);
  }
});

router.delete("/", async (req, res) => {
  if (!req.query.email) {
    res.status(400);
    res.send({ error: "Email is required!" });
    return;
  }
  await userDb.deleteUser(req.query.email);
  res.sendStatus(200);
});

router.put("/", async (req, res) => {
  if (!req.query.email) {
    res.status(400);
    res.send({ error: "Email is required!" });
    return;
  }
  try {
    await userDb.updateUser(req.query.email, req.body);
    res.sendStatus(200);
  } catch (err) {
    if (err.errors) {
      res.status(400);
      res.send(err.errors.map((x) => x.message));
    } else {
      res.status(404);
      res.send({ error: err.message });
    }
  }
});

module.exports = router;
