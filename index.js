const express = require('express');
const mongoose = require('mongoose');

const app = express();

app.get('/', (req, res) => {
  res.json('Hello');
});

app.get('/todos', (req, res) => {
  Todo.find()
    .then((todos) => {
      console.log(todos);
      res.json(todos);
    });
});

app.get('/todo', (req, res) => {
  Todo.create({
    title: req.query.title,
    desc: req.query.desc,
  }).then(todo => {
    res.json(todo);
  });

});

app.listen(8080, () => console.log('App is running on 8080...'));

mongoose.connect('mongodb://localhost:27017', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

mongoose.connection.on('open', () => console.log('DB con is open...'));

const Todo = mongoose.model('Todo', new mongoose.Schema({
  title: String,
  desc: String,
}));

