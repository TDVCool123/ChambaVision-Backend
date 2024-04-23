const express = require("express");

// eslint-disable-next-line new-cap
const gigRouter = express.Router();

const gigController = require("../controllers/gigController.js");


//  ! -------- GIG ROUTES --------
gigRouter.get("/getAllGigs", gigController.getAllGigs);
gigRouter.get("/getGigById/:gigId", gigController.getGigById);
gigRouter.post("/create", gigController.create);
gigRouter.put("/edit/:gigId", gigController.editGig);
gigRouter.delete("/eliminate/:gigId", gigController.deleteGig);

gigRouter.get("/getUsersApplying/:gigId", gigController.getUsersApplying);


module.exports = gigRouter;

