const express = require('express');
const bodyParser = require('body-parser');
const crypto = require('crypto');
const db = require('../db');
const { response } = require('express');
const session = require('express-session');

const router = express.Router();

router.get('/', function (req, res) {
  const model = {
    admin: req.session.admin,
  };
  res.render('login.hbs', model);
});

router.post('/', function (req, res) {
  console.log('Login in', req.body);
  const username = req.body.username;
  const password = toHash(req.body.password);
  const query = 'SELECT * FROM admin WHERE username = (?)';
  const errorMessage = {
    message: 'Wrong username or password',
  };
  db.get(query, username, function (error, account) {
    if (error) {
      console.log('Error login in', error);
    } else if (!account) {
      res.render('login.hbs', errorMessage);
    } else {
      console.log('account: ', account);
      if (password == account.password) {
        req.session.admin = true;
        res.redirect('/');
      } else {
        console.log('Wrong password');
        res.redirect('login.hbs', errorMessage);
      }
    }
  });
});

function toHash(val) {
  const alg = 'sha256';
  const hash = crypto
    .createHmac(alg, val)
    .update('I love cupcakes')
    .digest('hex');
  return hash;
}

module.exports = router;
