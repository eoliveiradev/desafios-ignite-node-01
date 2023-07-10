const express = require('express');
const cors = require('cors');

const { v4: uuidv4 } = require('uuid');

const app = express();

app.use(cors());
app.use(express.json());

const users = [
  {
    id: 'uuid',
    name: 'Zoiko',
    username: 'zoiko',
    todos: []
  }
];

function checksExistsUserAccount(request, response, next) {
  const { username } = request.headers;

  const user = users.find(user => user.username === username);

  if (!user) {
    return response.status(404).json({ error: "User not found!" })
  }

  request.user = user;

  return next();
}

app.post('/users', (request, response) => {
  const { name, username } = request.body;

  const userAlreadyExists = users.some(user => user.username === username);

  if (userAlreadyExists) {
    return response.status(400).json({ error: "Username is already in use!" })
  }

  const user = {
    id: uuidv4(),
    name,
    username,
    todos: []
  }

  users.push(user);

  return response.status(201).json(user);
});

app.get('/todos', checksExistsUserAccount, (request, response) => {
  const { user } = request;

  return response.status(200).json(user.todos);
});

app.post('/todos', checksExistsUserAccount, (request, response) => {
  const { user, body: { title, deadline } } = request;

  const todo = {
    id: uuidv4(),
    title,
    done: false,
    created_at: new Date(),
    deadline: new Date(deadline),
  }

  user.todos.push(todo);

  return response.status(201).json(todo);
});

app.put('/todos/:id', checksExistsUserAccount, (request, response) => {
  const { body: { title, deadline }, params: { id }, user } = request;

  let currentTodo = user.todos.find(todo => todo.id === id);

  if (!currentTodo) {
    return response.status(404).json({ error: "Todo not found!" })
  }

  user.todos = user.todos.map(todo => {
    if (todo.id === id) {
      const newTodo = {
        ...todo,
        ...(deadline && { deadline: new Date(deadline) }),
        title,
      }

      currentTodo = newTodo;

      return newTodo;
    }
    return todo;
  })

  return response.status(200).json(currentTodo);
});

app.patch('/todos/:id/done', checksExistsUserAccount, (request, response) => {
  const { params: { id }, user } = request;

  let currentTodo = user.todos.find(todo => todo.id === id);

  if (!currentTodo) {
    return response.status(404).json({ error: "Todo not found!" })
  }

  user.todos = user.todos.map(todo => {
    if (todo.id === id) {
      const newTodo = {
        ...todo,
        done: true,
      }

      currentTodo = newTodo;

      return newTodo;
    }
    return todo;
  })

  return response.status(200).json(currentTodo);
});

app.delete('/todos/:id', checksExistsUserAccount, (request, response) => {
  const { params: { id }, user } = request;

  const todo = user.todos.find(todo => todo.id === id);

  if (!todo) {
    return response.status(404).json({ error: "Todo not found!" })
  }

  user.todos = user.todos.filter(todo => todo.id !== id);

  return response.status(204).send();
});

module.exports = app;