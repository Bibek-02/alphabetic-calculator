// server/src/routes/calcRoutes.js
const express = require("express");
const router = express.Router();
const { calculate } = require("../controllers/calcController");

router.post("/calculate", calculate);

module.exports = router;
