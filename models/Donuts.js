let mongoose = require('mongoose');
const Schema = mongoose.Schema;
const donutSchema = new Schema({
  donut: {
    filling: {
      type: Number,
      required: true,
    },
    glaze:{
      type: Number,
      required: true,
    },
    pattern:{
      type: Number,
      required: true,
    },
    topping:{
      type: Number,
      required: true,
    },
    logoShape:{
      type: Number,
      required: true,
    },
  }
  });

const Donut = mongoose.model('Donut', donutSchema);

module.exports = Donut;