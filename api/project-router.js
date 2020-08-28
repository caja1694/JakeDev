const express = require('express');
const router = express.Router();
const dummyData = require('../dummy-data');
const db = require('../db');

router.get('/', function (req, res) {
  getAllProject(function (err, projects) {
    if (err) {
      console.log('We got an error', err);
    } else {
      console.log('Got projects from db');
    }
    const model = {
      error: err,
      projects: projects,
      admin: req.session.admin,
    };
    res.render('project.hbs', model);
  });
});

router.post('/', function (req, res) {
  const project = {
    title: req.body.title,
    subtitle: req.body.subtitle,
    description: req.body.description,
    git: req.body.git,
    img: req.body.img,
  };

  addProject(project, function (err) {
    if (err) {
      console.log('Error creating new project');
      res.redirect('/projects/add', model);
    } else {
      console.log('Created new project');
      res.redirect('/projects');
    }
  });
});

router.get('/view/:id', function (req, res) {
  const id = req.params.id;
  getProjectById(id, function (err, project) {
    if (err) {
      console.log('Error retreving project', err);
    } else {
      console.log('Got project');
    }
    const model = {
      admin: req.session.admin,
      project: project,
      error: err,
    };
    res.render('single-project.hbs', model);
  });
});

router.get('/add', function (req, res) {
  const model = {
    admin: req.session.admin,
  };
  res.render('add-project.hbs', model);
});

function addProject(project, callback) {
  const query =
    'INSERT INTO projects (title, subtitle, description, git, img) VALUES(?, ?, ?, ?, ?)';
  db.run(
    query,
    project.title,
    project.subtitle,
    project.description,
    project.git,
    project.img,
    function (err) {
      callback(err);
    }
  );
}

function getProjectById(id, callback) {
  const query = 'SELECT * FROM projects WHERE id = (?)';
  db.get(query, id, function (err, project) {
    callback(err, project);
  });
}

function getAllProject(callback) {
  const query = 'SELECT * FROM projects ORDER BY id DESC';
  db.all(query, function (err, projects) {
    callback(err, projects);
  });
}

module.exports = router;
