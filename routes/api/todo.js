const express = require('express');
const uuid = require('uuid');
const router = express.Router();
const todoList = require('../../Todos');

//Get all ToDos
router.get('/', (req, res) => res.json(todoList));

//Get single toDo with specified id
router.get('/:id', (req, res) => {
    const found = todoList.some(todo => todo.id === parseInt(req.params.id));
    if (found) {
        res.json(todoList.filter(todo => todo.id === parseInt(req.params.id)));
    } else {
        res.status(400).json({ reason: `No todo found with the id of ${req.params.id}` });
    }
});

//Add ToDo
router.post('/', (req, res) => {
    const newToDo = {
        id: uuid.v4(),
        msg: req.body.msg,
        status: 'active'
    };
    if (!newToDo.msg) {
        return res.status(400).json({ reason: 'No msg present' });
    }
    todoList.push(newToDo);
    res.json({ msg: 'ToDo Added', todoList: todoList});
});

//update Todo
router.put('/:id', (req, res) => {
    const found = todoList.some(todo => todo.id === parseInt(req.params.id));
    if (found) {
        const updToDo = req.body;
        todoList.map(toDo => {
            if (toDo.id === parseInt(req.params.id)) {
                toDo.msg = updToDo.msg ? updToDo.msg : toDo.msg;
                toDo.status = updToDo.status ? updToDo.status : toDo.status;
                res.json({ msg: 'ToDo updated', toDo });
            }
        });
    } else {
        res.status(400).json({ reason: `No todo found with the id of ${req.params.id}` });
    }
});

//Delete ToDo
router.delete('/:id', (req, res) => {
    const found = todoList.some(todo => todo.id === parseInt(req.params.id));
    if (found) {
        res.json({ msg: 'ToDo deleted', todoList: todoList.filter(todo => todo.id !== parseInt(req.params.id))});
    } else {
        res.status(400).json({ reason: `No todo found with the id of ${req.params.id}` });
    }
});

module.exports = router;