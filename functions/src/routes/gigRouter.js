const express = require('express');

const gigRouter = express.Router();

const gigController = require('../controllers/gigController.js')


//! -------- USERS ROUTES --------
userRouter.get('/getGigById/:gigId',gigController.getGigById)
userRouter.post('/create', gigController.createGig);
userRouter.put('/edit/:gigId',gigController.editGig)
userRouter.delete('/eliminate/:gigId', gigController.deleteGig)

module.exports = gigRouter;

