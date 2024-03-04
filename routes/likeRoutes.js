const express = require("express");
const router = express.Router();
const likeController = require("../controllers/likeController");

router.post("/", likeController.likePost);
router.delete("/", likeController.unlikePost);

module.exports = router;
