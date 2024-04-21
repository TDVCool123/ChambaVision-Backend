const express = require('express');

const gigRouter = express.Router();

const gigController = require('../controllers/gigController.js')


//! -------- GIG ROUTES --------
gigRouter.get('/getGigById/:gigId',gigController.getGigById)
gigRouter.post('/create', gigController.create);
gigRouter.put('/edit/:gigId',gigController.editGig)
gigRouter.delete('/eliminate/:gigId', gigController.deleteGig)

module.exports = gigRouter;

