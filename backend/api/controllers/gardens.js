const Garden = require("../models/garden");

module.exports = {
  getAllGardens: (req, res) => {
    res.status(200).json({
      message: "[GET] - All gardens.",
    });
  },
};
