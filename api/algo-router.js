const express = require('express');
const router = express.Router();
const db = require('../db');
const fs = require('fs');
const formidable = require('formidable');
const hljs = require('highlightjs');

router.get('/', function (req, res) {
  getFiles(function (err, files) {
    if (err) {
      console.log('Error fetching files', err);
    } else {
      console.log('Got files from db');
    }
    const model = {
      error: err,
      files: files,
      admin: req.session.admin,
    };
    res.render('algorithm.hbs', model);
  });
});

router.post('/', function (req, res) {
  const form = new formidable.IncomingForm();
  form.parse(req, function (err, fields, file) {
    if (err) {
      console.log('Error parsing file', err);
    }
    const path = file.choose_btn.path;
    var name = file.choose_btn.name;
    fs.readFile(path, function (err, buf) {
      if (err) {
        console.log('Error reading file', err);
      } else {
        addFile(name, buf.toString(), function (err) {
          if (err) {
            console.log('Error saving file', err);
          } else {
            console.log('Successfully stored file');
          }
        });
      }
    });
  });
  res.redirect('/algorithms');
});

router.get('/:id', function (req, res) {
  const id = req.params.id;
  getFile(id, function (err, file) {
    if (err) {
      console.log('Error fetching file: ', err);
    } else {
      console.log('Got file: ', file.name);
    }
    const model = {
      admin: req.session.admin,
      file: file.code,
      name: file.name,
    };
    res.render('single-algorithm.hbs', model);
  });
});

function getFiles(callback) {
  const query = 'SELECT * FROM algos ORDER BY id DESC';
  db.all(query, function (err, algos) {
    callback(err, algos);
  });
}

function getFile(id, callback) {
  const query = 'SELECT * FROM algos WHERE id = (?)';
  db.get(query, id, function (err, file) {
    callback(err, file);
  });
}

function addFile(name, file, callback) {
  const query = 'INSERT INTO algos (name, code) VALUES(?, ?)';
  db.run(query, name, file, function (err) {
    callback(err);
  });
}

module.exports = router;
