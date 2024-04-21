const express = require('express');

const userRouter = require('../routes/userRouter.js');


const router = express.Router();


router.use('/users', userRouter);

module.exports = router;

