const express = require("express");
const router = express.Router();
const { getHolidays, getCountries } = require("../controllers/holiday.js");

router.get("/holidays", getHolidays);
router.get("/countries", getCountries);

module.exports = router;
