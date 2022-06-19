const User = require("../models/user");

module.exports = {
  getUsersAtGarden: (req, res) => {
    const gardenID = req.params.gardenID;
    res
      .status(200)
      .json({ message: `[GET] - Users and dogs at the garden ${gardenID}.` });
  },
  assignUserToGarden: (req, res) => {
    const {} = req.body;
    console.log(req.body);
    const gardenID = req.params.gardenID;
    res.status(200).json({
      message: `[POST] - User has been assigned to the garden ${gardenID}.`,
    });
  },
  deleteUserFromGarden: (req, res) => {
    const gardenID = req.params.gardenID;
    res.status(200).json({
      message: `[DELETE] - User has been removed from the garden ${gardenID}.`,
    });
  },
  createNewUser: (req, res) => {
    const { phone, name, dogsName, dogsBreed, dogsGender, userID } = req.body;
    const dog = { dogsName, dogsBreed, dogsGender };
    const user = new User({
      id: userID,
      phone,
      name,
      dogs: dog,
    });
    user.save();
    res.status(200).json({
      message: `[POST] - User has been created.`,
    });
  },
  addDog: (req, res) => {},
  isUserExists: (req, res) => {},
  changeUserID: (req, res) => {
    const { phone, newID } = req.body;
    User.updateOne({ phone }, { $set: { id: newID } }).then(() => {
      res.status(200).json({
        message: `[PATCH] - User ID has been modified.`,
      });
    });
  },
};
