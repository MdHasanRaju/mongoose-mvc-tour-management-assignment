const mongoose = require("mongoose");

// tour package schema
const packageSchema = mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please provide a name for this package."],
    trim: true,
    unique: [true, "Name must be unique"],
  },
  image: {
    type: String,
    required: [true, "Please provide a photo for the package"],
  },
  price: {
    type: Number,
    required: [true, "Please provide a price for the package"],
  },
  view: {
    type: Number,
    default: 0,
  },
});

const Package = mongoose.model("Package", packageSchema);
module.exports = Package;
