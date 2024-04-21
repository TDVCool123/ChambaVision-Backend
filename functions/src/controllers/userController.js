const userService = require("../services/userService.js");
const logger = require("firebase-functions/logger");


const register = async (req,res)=>{
    try{
        const userData = req.body;
        userService.createUser(userData)
        return res.status(200).send("The user " + req.body.id + " was create");
    } catch (error){
        logger.error('Registration attempt failed due to an error.', {
            error: error.message
        });
    }
}

module.exports = {
    register
  };