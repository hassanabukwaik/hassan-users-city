const mongoose = require("mongoose");

const City = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  country: {
    type: String,
    required: [true],
  },
});

module.exports = mongoose.model("City", City);
