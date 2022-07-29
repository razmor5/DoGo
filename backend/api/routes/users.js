const express = require("express");
const router = express.Router();

const {
  getUsersAtGarden,
  assignUserToGarden,
  deleteUserFromGarden,
  createNewUser,
  signInUser,
  addDog,
  changeUserID,
  getUsersDogs,
  deleteDog,
} = require("../controllers/users");

router.post("/sign-up", createNewUser);
router.post("/sign-in", signInUser);
router.post("/add-dog", addDog);
router.post("/delete-dog", deleteDog);
router.get("/:userID/dogs", getUsersDogs);
router.get("/:gardenID", getUsersAtGarden);
router.post("/:gardenID", assignUserToGarden);
router.delete("/:gardenID", deleteUserFromGarden);
router.patch("/", changeUserID);

module.exports = router;

//map screen -> garden information -> dogs picker
