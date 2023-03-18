const mongoose = require("mongoose");

const TravelSchema = new mongoose.Schema({
  place: {
    type: String,
    required: true,
  },
  img: {
    type: String,
  },
  visitWith: {
    type: String,
    required: true,
  },
  visitByDate: {
    type: Date,
  },
  updated_date: {
    type: Date,
    default: Date.now,
  },
  createdBy: {
    type: mongoose.Types.ObjectId,
    ref: "User", //model u r refering
    // required: true,
  },
});

module.exports = Travel = mongoose.model("travel", TravelSchema);
