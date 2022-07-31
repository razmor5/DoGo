const express = require("express");
const router = express.Router();

const { getAllGardens, createNewGarden } = require("../controllers/gardens");

router.get("/", getAllGardens);
router.post("/add-garden", createNewGarden);

module.exports = router;
