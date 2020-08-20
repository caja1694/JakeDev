const express = require('express');
const expressHandlebars = require('express-handlebars');
const bodyParser = require('body-parser');

const hljs = require('highlightjs');

const db = require('./db');
const session = require('express-session');
const connectSqlite3 = require('connect-sqlite3');
const sqLiteStore = connectSqlite3(session);

const app = express();

const varRouter = require('./api/various-router');
const algoRouter = require('./api/algo-router');
const loginRouter = require('./api/login-router');
const projectRouter = require('./api/project-router');
const { request, response } = require('express');

// Store session
app.use(
  session({
    store: new sqLiteStore({ db: 'database.db' }),
    saveUninitialized: false,
    resave: false,
    secret: 'ioajrevoieac',
  })
);

app.engine(
  'hbs',
  expressHandlebars({
    defaultLayout: 'main.hbs',
  })
);

app.use(bodyParser.urlencoded({ extended: false }));

// Public files
app.use(express.static(__dirname + '/public'));

// Routers
app.use('/', varRouter);
app.use('/about', varRouter);
app.use('/contact', varRouter);
app.use('/algorithms', algoRouter);
app.use('/projects', projectRouter);
app.use('/login', loginRouter);
app.get('/logout', function (req, res) {
  req.session.destroy();
  res.redirect('/');
});

app.listen(8080, function () {
  console.log('Listeting on port 8080');
});
