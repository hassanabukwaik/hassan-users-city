const express = require("express");
const route = express.Router();

const {
  createUser,
  editUser,
  deleteUser,
  getUsers,
} = require("../controllers/users");

route.get("/", getUsers);
route.post("/", createUser,);

route.put("/", editUser);
route.delete("/:userId", deleteUser);
module.exports = route;
