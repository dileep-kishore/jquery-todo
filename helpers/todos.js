let db = require('../models')

exports.getTodos = (request, response) => {
    db.Todo.find()
      .then(todos => response.json(todos))
      .catch(err => response.send(err));
}

exports.createTodo = (request, response) => {
    db.Todo.create(request.body)
      .then(newTodo => response.status(201).json(newTodo))
      .catch(err => response.send(err));
}

exports.getTodo = (request, response) => {
    db.Todo.findById(request.params.todoId)
      .then(foundTodo => response.json(foundTodo))
      .catch(err => response.send(err));
}

exports.updateTodo = (request, response) => {
    db.Todo.findOneAndUpdate({ _id: request.params.todoId }, request.body, { new: true })
      .then(todo => response.json(todo))
      .catch(err => response.send(err));
}

exports.deleteTodo = (request, response) => {
    db.Todo.remove({ _id: request.params.todoId })
      .then(() => response.json({ msg: "Todo deleted!" }))
      .catch(err => response.send(err));
}