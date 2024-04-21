const express = require('express');

const userRouter = express.Router();

const userController = require('../controllers/userController.js')


//! -------- USERS ROUTES --------
userRouter.post('/register', userController.register);

module.exports = userRouter;

