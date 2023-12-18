const mongoose = require('mongoose');

//defining tour Schema
const tourSchema = new mongoose.Schema({
  name: {
    type: String,
    unique: true,
    required: [true, 'Tour name is required!'] // [value, "msg when error occurs"]
  },
  rating: {
    type: Number,
    default: 4.7
  },
  price: {
    type: Number,
    required: true
  }
});

//creating tour model
const Tour = mongoose.model('Tour', tourSchema);

module.exports = Tour;
