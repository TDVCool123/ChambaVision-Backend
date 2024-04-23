const express = require("express");

// eslint-disable-next-line new-cap
const userRouter = express.Router();

const userController = require("../controllers/userController.js");


//  ! -------- USERS ROUTES --------
userRouter.get("/getUserById/:userId", userController.getUserById);
userRouter.post("/register", userController.register);
userRouter.put("/edit/:userId", userController.editUser);
userRouter.delete("/eliminate/:userId", userController.deleteUser);

userRouter.post("/apply/:userId/:gigId", userController.applyAGig);

module.exports = userRouter;

