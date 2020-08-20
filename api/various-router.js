const express = require('express');

const router = express.Router();

router.get('/', function (req, res) {
  console.log('Responding with home.hbs');
  console.log('Admin session?', req.session.admin);
  const model = {
    admin: req.session.admin,
  };
  res.render('home.hbs', model);
});

router.get('/about', function (req, res) {
  const model = {
    admin: req.session.admin,
  };
  res.render('about.hbs', model);
});

router.get('/contact', function (req, res) {
  const model = {
    admin: req.session.admin,
  };
  res.render('contact.hbs', model);
});

module.exports = router;
