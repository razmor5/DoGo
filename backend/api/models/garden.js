const mongoose = require("mongoose");

const gardenSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  name: { type: String, required: true },
  coords: { type: Object, required: true },
  users: [{ type: Object, required: true }],
  pressed: { type: Boolean, required: true, default: false },
});

module.exports = mongoose.model("Garden", gardenSchema);
