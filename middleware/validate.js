let express = require("express");
let router = express.Router();

const jwt = require('jsonwebtoken');
const secretOrPrivateKey = 'GciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzd';

router.post('/', function (req, res, next) {
    // Extract the user's name from the request body
    const userName = req.body.name;
  
    // Verify the token using the user's name and the secret or private key
    jwt.verify(req.body.token, secretOrPrivateKey, { subject: userName }, function (err, decoded) {
      if (err) {
        res.status(200).json({ message: 'Token is not valid.', status: "error" });
      } else {
        res.status(200).json({ message: 'Token is valid.', status: "success" });
      }
    });
  });

module.exports = router;