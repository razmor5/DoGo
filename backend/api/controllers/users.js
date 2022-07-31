const User = require("../models/user");
const Garden = require("../models/garden");
const { use } = require("../routes/gardens");

module.exports = {
  //DONE
  getUsersAtGarden: (req, res) => {
    const gardenID = req.params.gardenID;
    let users = [];
    Garden.findOne({ _id: gardenID }).then((garden) => {
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
    User.findOne({ id: userID })
      .then((usr) => {
        let list = usr.dogs.filter((dog) => dogs.includes(dog.id));
        let newList = list.map((item) => {
          return {
            userID: usr.id,
            name: usr.name,
            dog: { ...item, gardenID: gardenID },
          };
        });
        usr.dogs = usr.dogs.map((dog) =>
          dogs.includes(dog.id) ? { ...dog, gardenID } : dog
        );

        usr.save().then(() => {
          Garden.findOne({ _id: gardenID }).then((garden) => {
            garden.users = [...garden.users, ...newList];
            garden.save().then(() => {
              res.status(200).json({
                message: `[POST] - User has been assigned to the garden ${gardenID} with his dogs: ${dogs}`,
              });
            });
          });
        });
      })
      .catch((error) => res.status(500).json({ error }));
  },
  //DONE
  deleteUserFromGarden: (req, res) => {
    const { userID, dogs } = req.body;
    const gardenID = req.params.gardenID;
    User.findOne({ id: userID })
      .then((user) => {
        let list = user.dogs.filter((dog) => dogs.includes(dog.id));
        let newList = list.map((item) => {
          return {
            userID: user.id,
            name: user.name,
            dog: { ...item, gardenID },
          };
        });
        user.dogs = user.dogs.map((dog) =>
          dogs.includes(dog.id) ? { ...dog, gardenID: -1 } : dog
        );
        console.log(user.dogs);

        user.save().then(() => {
          Garden.findOne({ _id: gardenID }).then((garden) => {
            let newUsersList = garden.users.filter(
              (user) => user.userID !== userID || !dogs.includes(user.dog.id)
            );
            garden.users = newUsersList;
            garden.save().then(() => {
              res.status(200).json({
                message: `[DELETE] - User has been left the garden ${gardenID} with his dogs.`,
              });
            });
          });
        });
      })
      .catch((error) => {
        console.log(error);
        res.status(500).json({ error });
      });
  },
  createNewUser: (req, res) => {
    const { email, name, dogsName, dogsBreed, dogsGender, userID } = req.body;
    const dog = { id: 0, dogsName, dogsBreed, dogsGender, gardenID: -1 };
    const user = new User({
      id: userID,
      email,
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
        res.status(500).json({ error });
      });
  },
  signInUser: (req, res) => {
    const { userID } = req.body;
    User.findOne({ id: userID })
      .then((user) =>
        res.status(200).json({
          message: `[GET] - Logged in to user ${user.name}`,
          user,
        })
      )
      .catch((error) => res.status(500).json({ error }));
  },
  addDog: (req, res) => {
    const { userID, dogsName, dogsBreed, dogsGender } = req.body;
    User.findOne({ id: userID })
      .then((user) => {
        console.log(user);
        const newID = user.dogs[user.dogs.length - 1].id + 1;
        const dog = {
          id: newID,
          dogsName,
          dogsBreed,
          dogsGender,
          gardenID: -1,
        };
        user.dogs = [...user.dogs, dog];
        console.log(user.dogs);
        user.save().then(() => {
          res.status(200).json({
            message: `[POST] - The dog ${dog.dogsName} has been added to user ${user.name}`,
            user,
          });
        });
      })
      .catch((error) => {
        res.status(500).json({ error });
      });
  },
  deleteDog: (req, res) => {
    const { userID, dogsID, dogsName } = req.body;
    User.findOne({ id: userID })
      .then((user) => {
        user.dogs = user.dogs.filter((dog) => dog.id !== dogsID);
        user.save().then(() => {
          res.status(200).json({
            message: `[POST] - The dog ${dogsName} has been removed from user ${user.name}`,
            user,
          });
        });
      })
      .catch((error) => {
        res.status(500).json({ error });
      });
  },
  //NOT NEEDED:
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
