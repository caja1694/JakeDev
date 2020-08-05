const dummyData = require('./dummy-data');
const express = require('express');
const expressHandlebars = require('express-handlebars');
const { response } = require('express');

const app = express();

app.engine(
  'hbs',
  expressHandlebars({
    defaultLayout: 'main.hbs',
  })
);

app.use(express.static(__dirname + '/public'));

app.get('/', function (request, response) {
  const model = {
    humans: dummyData.humans,
  };
  response.render('home.hbs', model);
});

app.get('/about', function (req, res) {
  res.render('about.hbs');
});

app.get('/algorithms', function (req, res) {
  res.render('algorithm.hbs');
});

app.get('/projects', function (req, res) {
  res.render('project.hbs');
});

app.get('/login', function (req, res) {
  res.render('login.hbs');
});

app.listen(8080);
