const sqlite3 = require('sqlite3');
const db = new sqlite3.Database('./database.db');
const crypto = require('crypto');

/*
db.run('DROP TABLE projects', function (err) {
  console.log('Dropping table projects');
  if (err) {
    console.log('Error dropping table', err);
  }
});*/

//Project Table
db.run(
  'CREATE TABLE IF NOT EXISTS projects(id INTEGER PRIMARY KEY AUTOINCREMENT, title TEXT NOT NULL, subtitle TEXT NOT NULL, description TEXT NOT NULL, git TEXT NOT NULL, img TEXT)',
  function (error) {
    if (error) {
      console.log(error);
    } else {
      console.log('Created projects table');
    }
  }
);

// Admin account
db.run(
  'CREATE TABLE IF NOT EXISTS admin(id INTEGER PRIMARY KEY AUTOINCREMENT, username TEXT NOT NULL UNIQUE, password TEXT NOT NULL)',
  function (error) {
    if (error) {
      console.log('admin error', error);
    } else {
      console.log('Created admin table');
      const username = 'admin';
      const password = toHash('lazy');
      const query = 'INSERT INTO admin(username, password) VALUES(?, ?)';

      db.run(query, username, password, function (error) {
        if (error && error.errno != 19)
          // Errno 19 means user 'admin' already exists
          console.log('Error creating admin account: ', error);
        else console.log('Created admin account');
      });
    }
  }
);

// Algos table
db.run(
  'CREATE TABLE IF NOT EXISTS algos(id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT NOT NULL, code TEXT)',
  function (err) {
    if (err) {
      console.log('Error creating file table', err);
    } else {
      console.log('Created file table');
    }
  }
);

function toHash(val) {
  const alg = 'sha256';
  const hash = crypto
    .createHmac(alg, val)
    .update('I love cupcakes')
    .digest('hex');
  return hash;
}

module.exports = db;
