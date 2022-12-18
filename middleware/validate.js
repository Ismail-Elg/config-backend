let express = require("express");
let router = express.Router();

const jwt = require('jsonwebtoken');
const secretOrPrivateKey = 'GciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzd';

router.post('/', function (req, res, next) {
    jwt.verify(req.body.token, secretOrPrivateKey, function (err, decoded) {
        if (err) {
        res.status(200).json({ message: 'Token is not valid.', status: "error" });
        } else {
        res.status(200).json({ message: 'Token is valid.', status: "success" });
        }
    });
    }
);

module.exports = router;