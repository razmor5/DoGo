const User = require("../models/user");
const Garden = require("../models/garden");

module.exports = {
  getUsersAtGarden: (req, res) => {
    const gardenID = req.params.gardenID;
    let users = [];
    Garden.findOne({ id: gardenID }).then((garden) => {
      users = [...garden.users];
      res.status(200).json({
        message: `[GET] - Users and dogs at the garden ${gardenID}.`,
        users,
      });
    });
  },
  assignUserToGarden: (req, res) => {
    //unfinished
    const { userID, dogs } = req.body;
    const gardenID = req.params.gardenID;
    const user = User.findById(userID).then((usr) => usr);
    console.log(user);
    // Garden.findById(gardenID).then(garden => {

    // })
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
    user
      .save()
      .then(() => {
        res.status(200).json({
          message: `[POST] - User has been created.`,
        });
      })
      .catch((error) => res.status(500).json({ error }));
  },
  addDog: (req, res) => {},
  isUserExists: (req, res) => {},
  changeUserID: (req, res) => {
    const { phone, newID } = req.body;
    User.updateOne({ phone }, { $set: { id: newID } })
      .then(() => {
        res.status(200).json({
          message: `[PATCH] - User ID has been modified.`,
        });
      })
      .catch((error) => res.status(500).json({ error }));
  },
  getUsersDogs: (req, res) => {
    const userID = req.params.userID;
    console.log(userID);
    let dogs = [];
    User.findOne({ id: userID })
      .then((user) => {
        console.log("user.dogs: ", user.dogs);
        dogs = [...user.dogs];
        console.log(dogs);
        res.status(200).json({
          message: `[GET] - User's dogs list.`,
          dogs,
        });
      })
      .catch((error) => res.status(500).json({ error }));
  },
};
