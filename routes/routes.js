const express = require("express");
const todo_controller = require("../controllers/todo_controller");
const auth_controller = require("../controllers/auth_controller");
const validate = require("../middlewares/validation");
const authorize = require("../middlewares/auth");

const router = express();
router.get("/", todo_controller.getHome);
router.post("/register", validate, auth_controller.postRegister);
router.post("/login", validate, auth_controller.postLogin);
router.get("/is-verified", authorize, auth_controller.getAuthorization);
// router.post("/", authorize, todo_controller.getHome);
router.post("/create-todo", authorize, todo_controller.createTodo);
router.get("/todos", authorize, todo_controller.getTodos);
router.get("/todos/:id", authorize, todo_controller.getTodo);
router.put("/todo/:id", authorize, todo_controller.updateTodo);
router.delete("/todo/:id", authorize, todo_controller.deleteTodo);

module.exports = router;