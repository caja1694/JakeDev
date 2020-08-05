const dummyData = require('./dummy-data');
const express = require('express');
const expressHandlebars = require('express-handlebars');

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

app.listen(8080);
