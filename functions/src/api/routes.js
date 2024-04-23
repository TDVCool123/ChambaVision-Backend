const express = require("express");
const userRouter = require("../routes/userRouter.js");
const gigRouter = require("../routes/gigRouter.js");
// eslint-disable-next-line new-cap
const router = express.Router();

router.use("/users", userRouter);
router.use("/gig", gigRouter);

module.exports = router;

