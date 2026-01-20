const express = require("express");
const { getQueueStatus } = require("../controllers/redisQueue.controller");
const router = express.Router();

router.get("/status/:serviceId/:tokenId", getQueueStatus);

module.exports = router;
