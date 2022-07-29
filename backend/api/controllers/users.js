const User = require("../models/user");
const Garden = require("../models/garden");
const { use } = require("../routes/gardens");

module.exports = {
  //DONE
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
  //DONE
  assignUserToGarden: (req, res) => {
    const { userID, dogs } = req.body;
    const gardenID = req.params.gardenID;
    console.log(dogs);
    User.findOne({ id: userID })
      .then((usr) => {
        console.log(usr);
        let list = usr.dogs.filter((dog) => dogs.includes(dog.id));
        let newList = list.map((item) => {
          item.gardenID = gardenID;
          return { userID: usr.id, name: usr.name, dog: item };
        });
        Garden.findOne({ id: gardenID }).then((garden) => {
          garden.users = [...garden.users, ...newList];
          garden.save().then(() => {
            console.log(garden.users);
            res.status(200).json({
              message: `[POST] - User has been assigned to the garden ${gardenID} with his dogs: ${dogs}`,
            });
          });
        });
      })
      .catch((error) => res.status(500).json({ error }));
  },
  //DONE
  deleteUserFromGarden: (req, res) => {
    const { userID } = req.body;
    const gardenID = req.params.gardenID;
    Garden.findOne({ id: gardenID })
      .then((garden) => {
        let newUsersList = garden.users.filter(
          (user) => user.userID !== userID
        );
        garden.users = newUsersList;
        garden.save().then(() => {
          res.status(200).json({
            message: `[DELETE] - User has been left the garden ${gardenID} with his dogs.`,
          });
        });
      })
      .catch((error) => res.status(500).json({ error }));
  },
  createNewUser: (req, res) => {
    const { email, name, dogsName, dogsBreed, dogsGender, userID, phone } =
      req.body;
    const dog = { id: 0, dogsName, dogsBreed, dogsGender, gardenID: -1 };
    const user = new User({
      id: userID,
      email,
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
      .catch((error) => {
        console.log(error, error.message);
        res.status(500).json({ error })
      }
      );
  },
  addDog: (req, res) => { },
  isUserExists: (req, res) => { },
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
  login: (req, res) => { },
};
