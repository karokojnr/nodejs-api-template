const express = require("express");
const todo_controller = require("../controllers/todo.controller");
const auth_controller = require("../controllers/auth.controller");
const validate = require("../middlewares/validation.middleware");
const authorize = require("../middlewares/auth.middleware");

const router = express();
router.get("/", todo_controller.getHome);

router.post("/register", validate, auth_controller.postRegister);
router.post("/login", validate, auth_controller.postLogin);

router.get("/is_verified", authorize, auth_controller.getAuthorization);

router.post("/todos", authorize, todo_controller.createTodo);
router.get("/todos", authorize, todo_controller.getTodos);
router.get("/todos/:id", authorize, todo_controller.getTodo);
router.put("/todos/:id", authorize, todo_controller.updateTodo);
router.delete("/todos/:id", authorize, todo_controller.deleteTodo);

module.exports = router;