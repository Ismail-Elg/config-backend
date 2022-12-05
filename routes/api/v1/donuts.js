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
  let donut = new Donuts({
    donut:{
      filling: req.body.filling,
      glaze: req.body.glaze,
      pattern: req.body.pattern,
      topping: req.body.topping,
      logoShape: req.body.logoShape,
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
 
    donut.donut.filling = req.body.filling;
    donut.donut.glaze = req.body.glaze;
    donut.donut.pattern = req.body.pattern;
    donut.donut.topping = req.body.topping;
    donut.donut.logoShape = req.body.logoShape;

    
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
