const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const User = require('../../../models/Users');
const bcrypt = require('bcrypt');

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

router.post('/', async (req, res) => {
  try {
    // Check if the request body contains a name and password
    if (!req.body.name || !req.body.password) {
      return res.status(400).json({ message: 'Missing name or password.' });
    }
    const user = await User.findOne({ name: req.body.name });
    if (!user) {
      return res.status(401).json({ message: 'Invalid name or password.' });
    }

    const passwordMatch = await bcrypt.compare(req.body.password, user.password);
    if (!passwordMatch) {
      return res.status(401).json({ message: 'Invalid name or password.' });
    }

    // If the name and password are valid, return a success message to the client
    res.json({ message: 'Logged in successfully.', status: "success", token: jwt.sign({ name: user.name }, secretOrPrivateKey)});
  } catch (err) {
    // Return a server error message to the client
    res.status(500).json({ message: 'Error logging in.' });
  }
});

router.post('/register', async (req, res) => {
  try {
    // Check if the request body contains a name and password
    if (!req.body.name || !req.body.password) {
      return res.status(400).json({ message: 'Missing name or password.' });
    }

    // Hash the password using bcrypt
    const hash = await bcrypt.hash(req.body.password, 10);

    // Check if a user with the same name already exists
    const user = await User.findOne({ name: req.body.name });
    if (user) {
      return res.status(409).json({ message: 'Already taken, try other credentials' });
    }

    // Create a new user with the hashed password
    const newUser = new User({
      name: req.body.name,
      password: hash
    });

    // Save the new user to the database
    await newUser.save();

    // Return a success message to the client
    res.status(201).json({ message: 'User created.' });
  } catch (err) {
    // Return a server error message to the client
    res.status(500).json({ message: 'Error creating user.' });
  }
});

router.put('/:id', function (req, res, next) {
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
