const gigService = require("../services/gigService.js");
const logger = require("firebase-functions/logger");


const getGigById = async (req,res) =>{
    try{
        const gigId = req.params.gigId
        const gig = await gigService.getGigById(gigId)
        logger.info("The user is " + gig + " from userController")
        if (!gig.exists) {
            return res.status(404).json({
                success: false,
                message: 'Item not found',
            });
        }
        return res.status(200).json({
            success: true,
            data: gig.data(),
        });
    } catch(error){
        logger.error("Obtain user Attempt failed ",{
            error: error.message
        })
    }
}

//create
const create = async (req,res)=>{
    try{
        const gigData = req.body;
        gigService.createGig(gigData)
        return res.status(200).send("The user " + req.body.id + " was created");
    } catch (error){
        logger.error('Registration attempt failed due to an error.', {
            error: error.message
        });
    }
}

const editGig = async(req,res)=>{
    try{
        const gigData = req.body;
        const gigId = req.params.gigId
        gigService.editGig(gigId,gigData)
        return res.status(200).send("The user " + gigId + " was updated");
    } catch (error){
        logger.error('Registration attempt failed due to an error.', {
            error: error.message
        });
    }
}

const deleteGig = async(req,res)=>{
    try{
        const gigId = req.params.gigId;
        gigService.deleteGig(gigId)
        return res.status(200).send("The user " + gigId + " was eleminated");
    } catch (error){
        logger.error('Registration attempt failed due to an error.', {
            error: error.message
        });
    }
}


module.exports = {
    create,
    editGig,
    deleteGig,
    getGigById
  };