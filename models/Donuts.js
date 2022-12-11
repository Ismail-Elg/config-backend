let mongoose = require('mongoose');
const Schema = mongoose.Schema;
const donutSchema = new Schema({
  donut: {
    dough: {
      type: Number,
      required: true,
    },
    glaze:{
      type: Number,
      required: true,
    },
    pattern:{
      shape: {
        type: Number,
        required: true,
      },
      color:{
        type: Number,
        required: true,
      },
    },
    topping:{
      shape: {
        type: Number,
        required: true,
      },
      color:{
        type: Number,
        required: true,
      },
    },
    logo:{
      shape: {
        type: Number,
        required: true,
      },
      img:{
        type: String,
        required: true,
      },
    },
    user: {
      name: {
        type: String,
        required: true,
      },
      email: {
        type: String,
        required: true,
      },
      phone: {
        type: String,
        required: true,
      },
      message: {
        type: String,
        required: true,
      }
    }
  }
  });

const Donut = mongoose.model('Donut', donutSchema);

module.exports = Donut;