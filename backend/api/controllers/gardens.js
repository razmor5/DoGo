const Garden = require("../models/garden");
const mongoose = require("mongoose");

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
  createNewGarden: (req, res) => {
    const { name, latitude, longitude } = req.body;
    const garden = new Garden({
      _id: new mongoose.Types.ObjectId(),
      name,
      users: [],
      coords: { latitude, longitude },
      pressed: false,
    });
    garden
      .save()
      .then(() => {
        res.status(200).json({
          message: `[POST] - Garden has been created. Garden name: ${garden.name}.`,
        });
      })
      .catch((error) => {
        console.log(error, error.message);
        res.status(500).json({ error });
      });
  },
};
