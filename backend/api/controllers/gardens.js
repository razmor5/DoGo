const Garden = require("../models/garden");

module.exports = {
  getAllGardens: (req, res) => {
    Garden.find()
      .then((gardens) => {
        res.status(200).json({
          message: "[GET] - All gardens.",
          gardens,
        });
      })
      .catch((error) => res.status(500).json({ error }));
  },
};
