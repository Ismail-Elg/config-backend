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

  newUser
    .save()
    .then(user => {
   
      const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, {
        expiresIn: "60 days"
      });

      res.cookie('nToken', token, { maxAge: 900000, httpOnly: true });
      res.status(200).json({
        message: 'User successfully created!'
      });
    })
    .catch(err => {
      console.log(err);
      res.status(400).json({ error: err });
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
