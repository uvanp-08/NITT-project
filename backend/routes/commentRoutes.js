const express = require("express");
const router = express.Router();
const { getComments, postComment } = require("../controllers/commentController");

router.get("/:id", getComments);
router.post("/", postComment);

module.exports = router;
