const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
  id: { type: String, required: true },
  name: { type: String, required: true },
  phone: { type: String, required: true },
  dogs: [{ type: Object, required: true }],
});

module.exports = mongoose.model("User", userSchema);
