const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const User = require('../../../models/Users');

//const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c';
const secretOrPrivateKey = 'GciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzd';

// GET route for reading data
router.get('/', function (req, res, next) {

  User.find()
    .then(users => {
      res.json(users);
    })
    .catch(err => {
      res.status(500).json({ error: err });
    });
});

//get id
router.get('/:id', function (req, res, next) {
    User.findById(req.params.id)
        .then(user => {
            res.json(user);
        })
        .catch(err => {
            res.status(500).json({ error: err });
        });
});


// POST route for creating data
router.post('/', function (req, res, next) {
  // create user here
  const newUser = new User({
    name: req.body.name,
    password: req.body.password
  });

  //make sure user doesn't already exist
    User.findOne
    ({ name
    : req.body.name })
    .then(user => {
        if (user) {
            // User already exists
            return res.status(400).json({ name: "User already exists" });
        } else {
            // Save user
            newUser.save()
                .then(user => res.json(user))
                .catch(err => console.log(err));
        }
    });
});


// PUT route for updating data
router.put('/:id', function (req, res, next) {
  // update user here
  User.findByIdAndUpdate(req.params.id, req.body, { new: true })
    .then(user => {
      res.json(user);
    })
    .catch(err => {
      res.status(500).json({ error: err });
    });
});

// DELETE route for deleting data
router.delete('/:id', function (req, res, next) {
  // delete user here
  User.findByIdAndRemove(req.params.id)
    .then(user => {
      res.json({ message: 'User successfully deleted.' });
    })
    .catch(err => {
      res.status(500).json({ error: err });
    });
});

module.exports = router;
