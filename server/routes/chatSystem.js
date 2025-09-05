
const express = require("express");
const { getChatresponse } = require("../controllers/chatSystem.js");

const router = express.Router();

router.post("/", getChatresponse);

module.exports = router;
