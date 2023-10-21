const express = require("express");
const router = express.Router();
const userDb = require("../models/users");
const { SequelizeScopeError, ValidationErrorItem } = require("sequelize");

router.post("/", async (req, res) => {
  /*
    #swagger.summary = 'Create user'
    #swagger.tags = ['User']
    #swagger.parameters['user'] = {
        in: 'body',
        type: 'string',
        description: 'User information',
        schema: {
          $email: 'email@email.com',
          $firstname: 'first name',
          $lastname: 'last name'
        }
      } 
  */
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
  /*
    #swagger.summary = 'Get user by email'
    #swagger.tags = ['User']
    #swagger.parameters['email'] = {
        in: 'query',
        type: 'string',
        required: 'true',
        description: 'email of user',
      } 
    #swagger.responses[200] = {
          description: 'User successfully obtained.',
          schema: { 
            id: 1,
            email: 'email@email.com',
            firstname: 'firstname',
            lastname:' 'lastname'
          }
  */
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
  /*
    #swagger.summary = 'Delete user by email'
    #swagger.tags = ['User']
    #swagger.parameters['email'] = {
        in: 'query',
        type: 'string',
        required: 'true',
        description: 'email of user',
      } 
  */
  if (!req.query.email) {
    res.status(400);
    res.send({ error: "Email is required!" });
    return;
  }
  await userDb.deleteUser(req.query.email);
  res.sendStatus(200);
});

router.put("/", async (req, res) => {
  /*
    #swagger.summary = 'Edit user'
    #swagger.tags = ['User']
    #swagger.parameters['user'] = {
        in: 'body',
        type: 'string',
        description: 'User information',
        schema: {
          email: 'email@email.com',
          firstname: 'first name',
          lastname: 'last name'
        }
      }
    #swagger.parameters['email'] = {
        in: 'query',
        type: 'string',
        required: 'true',
        description: 'email of user',
    } 
  */
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
