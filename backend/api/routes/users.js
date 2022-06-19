const express = require("express");
const router = express.Router();

const {
  getUsersAtGarden,
  assignUserToGarden,
  deleteUserFromGarden,
  createNewUser,
  addDog,
  isUserExists,
  changeUserID,
} = require("../controllers/users");

router.post("/sign-up", createNewUser);
router.post("/add-dog", addDog);
router.get("/exists", isUserExists);
router.get("/:gardenID", getUsersAtGarden);
router.post("/:gardenID", assignUserToGarden);
router.delete("/:gardenID", deleteUserFromGarden);
router.patch("/", changeUserID);

module.exports = router;
