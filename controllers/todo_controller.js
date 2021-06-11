const TODO = require("../models/TODO")
exports.getHome = async (req, res) => {
    try {
        const todos = await TODO.find();
        res.status(200).json({
            message: 'WELCOME - TODOS:)',
            todos
        });
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Server Error...");
    }
};
exports.createTodo = async (req, res) => {
    try {
        const { title, description, createdBy } = req.body;
        var newTodo = new TODO({
            title: title,
            description: description,
            createdBy: createdBy,
        });
        const todo = await newTodo.save();
        res.status(200).json({
            message: "Successfully created:)",
            todo,
        });
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Server Error...");
    }
};
exports.getTodos = async (req, res) => {
    try {
        const todos = await TODO.find();
        res.status(200).json({
            message: 'TODOS',
            todos
        });
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Server Error...");
    }
};
exports.getTodo = async (req, res) => {
    try {
        const todo_id = req.params.id;
        const todo = await TODO.findById(todo_id);
        res.status(200).json({
            message: 'TODO',
            todo
        });
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Server Error...");
    }
};
exports.updateTodo = async (req, res) => {
    try {
        const todo_id = req.params.id;
        const todo = await TODO.findByIdAndUpdate(todo_id, {
            title: title,
            description: description,
            createdBy: createdBy
        });
        res.status(200).json({
            message: 'TODO UPDATED:)',
            todo
        });
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Server Error...");
    }
};
exports.deleteTodo = async (req, res) => {
    try {
        const todo_id = req.params.id;
        const todo = await TODO.findByIdAndDelete(todo_id);
        res.status(200).json({
            message: 'To-Do has been removed',
            todo
        });
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Server Error...");
    }
};
