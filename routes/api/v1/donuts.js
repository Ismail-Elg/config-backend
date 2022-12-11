let express = require("express");
let router = express.Router();
const Donuts = require("../../../models/Donuts");

router.get("/", function (req, res, next) {
  if (req.query.user) {
    Donuts.find({ user: req.query.user }, function (err, donuts) {
      if (err) {
        return next(err);
      }
      if (donuts.length === 0) {
        return res.status(404).json({
          status: "error",
          donuts: "no donut found", 
        });
      }
      res.json(donuts);
    });
  } else {
    Donuts.find(function (err, donuts) {
      if (err) {
        return next(err);
      }
      res.json(donuts);
    });
  }
});

router.get("/:id", function (req, res, next) {
  if (!req.params.id.match(/^[0-9a-fA-F]{24}$/)) {
    res.status(404).json({
      status: "error",
      message: "Invalid ID",
    });
  }
  Donuts.findById(req.params.id, function (err, donuts) {
    if (err) return console.error(err); 
    res.json(donuts);
  });
  
});

router.post("/", function (req, res, next) {
  console.log(req.body);
  let donut = new Donuts({
    donut:{
      dough: req.body.dough,
      glaze: req.body.glaze,
      pattern: {
        shape: req.body.pattern.shape,
        color: req.body.pattern.color,
      },
      topping: {
        shape: req.body.topping.shape,
        color: req.body.topping.color,
      },
      logo: {
        shape: req.body.logo.shape,
        img: req.body.logo.img,
      },
      user: {
        name: req.body.user.name,
        email: req.body.user.email,
        phone: req.body.user.phone,
        message: req.body.user.message,
      }
    }
  });
  donut.save((err, doc) => {
    if (err) {
      res.json({
        status: "error",
        message: "Error saving donut, make sure you have selected everything",
      });
    } else {
      res.json({
        status: "success",
        message: "donut saved",
        data: doc,
      });
    }
  });
});

router.put("/:id", function (req, res, next) {
  //check if id is valid
  if (!req.params.id.match(/^[0-9a-fA-F]{24}$/)) {
    res.status(404).json({
      status: "error",
      message: "Invalid ID",
    });
  }
  Donuts.findById(req.params.id, function (err, donut) {
    if (err) return console.error(err);
    
    donut.donut.dough = req.body.dough;
    donut.donut.glaze = req.body.glaze;
    donut.donut.pattern.shape = req.body.pattern.shape;
    donut.donut.pattern.color = req.body.pattern.color;
    donut.donut.topping.shape = req.body.topping.shape;
    donut.donut.topping.color = req.body.topping.color;
    donut.donut.logo.shape = req.body.logo.shape;
    donut.donut.logo.img = req.body.logo.img;
    donut.donut.user.name = req.body.user.name;
    donut.donut.user.email = req.body.user.email;
    donut.donut.user.phone = req.body.user.phone;
    donut.donut.user.message = req.body.user.message;
    
    // donut.donut.filling = req.body.filling;
    // donut.donut.glaze = req.body.glaze;
    // donut.donut.pattern = req.body.pattern;
    // donut.donut.topping = req.body.topping;
    // donut.donut.logoShape = req.body.logoShape;

    
    donut.save((err, doc) => {
      if (err) {
        res.json({
          status: "error",
          message: "Error updating donut",
        });
      } else {
        res.json({
          status: "success",
          message: "Donuts updated",
          data: doc,
        });
      }
    });
  });
});

router.delete("/:id", function (req, res, next) {
  if (!req.params.id.match(/^[0-9a-fA-F]{24}$/)) {
    res.status(404).json({
      status: "error",
      message: "Invalid ID",
    });
  }
  Donuts.findByIdAndRemove(req.params.id, function (err, donut) {
    if (err) return console.error(err);
    res.json({
      status: "success",
      message: "Donut deleted",
      data: donut,
    });
  });
});

module.exports = router;
