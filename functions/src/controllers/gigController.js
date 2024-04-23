const gigService = require("../services/gigService.js");
const logger = require("firebase-functions/logger");


const getAllGigs = async (req, res) =>{
  try {
    const gigs = await gigService.getAllGigs();
    logger.info("The gigs are " + JSON.stringify(gigs) + " from gigController");
    if (!gigs) {
      return res.status(404).json({
        success: false,
        message: "Items not found",
      });
    }
    return res.status(200).json({
      success: true,
      data: gigs,
    });
  } catch (error) {
    logger.error("Obtain gigs Attempt failed ", {
      error: error.message,
    });
  }
};


const getGigById = async (req, res) =>{
  try {
    const gigId = req.params.gigId;
    const gig = await gigService.getGigById(gigId);
    logger.info("The gig is " + gig + " from userController");
    if (!gig.exists) {
      return res.status(404).json({
        success: false,
        message: "Item not found",
      });
    }
    return res.status(200).json({
      success: true,
      data: gig.data(),
    });
  } catch (error) {
    logger.error("Obtain user Attempt failed ", {
      error: error.message,
    });
  }
};

// create
const create = async (req, res)=>{
  try {
    const gigData = req.body;
    gigService.createGig(gigData);
    return res.status(200).send("The gig " + req.body.id + " was created");
  } catch (error) {
    logger.error("Registration attempt failed due to an error.", {
      error: error.message,
    });
  }
};

const editGig = async (req, res)=>{
  try {
    const gigData = req.body;
    const gigId = req.params.gigId;
    gigService.editGig(gigId, gigData);
    return res.status(200).send("The gig " + gigId + " was updated");
  } catch (error) {
    logger.error("Registration attempt failed due to an error.", {
      error: error.message,
    });
  }
};

const deleteGig = async (req, res)=>{
  try {
    const gigId = req.params.gigId;
    gigService.deleteGig(gigId);
    return res.status(200).send("The gig " + gigId + " was eleminated");
  } catch (error) {
    logger.error("Registration attempt failed due to an error.", {
      error: error.message,
    });
  }
};


const getUsersApplying = async (req, res) =>{
  const gigId = req.params.gigId;
  try {
    const usersApplying = await gigService.getUsersApplying(gigId);
    return res.status(200).json({
      success: true,
      data: usersApplying,
    });
  } catch (error) {
    logger.error("Apply a job falied succesfully!", {
      error: error.message,
    });
  }
};


module.exports = {
  create,
  editGig,
  deleteGig,
  getGigById,
  getAllGigs,
  getUsersApplying,
};
