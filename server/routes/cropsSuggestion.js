
const express = require("express");
const { getCropSuggestion } = require("../controllers/cropsSuggestionController.js");

const router = express.Router();

router.post("/", getCropSuggestion);

module.exports = router;
