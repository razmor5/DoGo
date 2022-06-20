const mongoose = require("mongoose");

const gardenSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  name: { type: String, required: true },
  coordinates: [{ type: Number, required: true }],
  users: [{ type: Object, required: true }],
});

module.exports = mongoose.model("Garden", gardenSchema);
