const express = require("express");
const router = express.Router();

const { getAllGardens } = require("../controllers/gardens");

router.get("/", getAllGardens);

module.exports = router;
