const userService = require("../services/userService.js");
const logger = require("firebase-functions/logger");


const getGigById = async (req,res) =>{
    try{
        const userId = req.params.userId
        const user = await userService.getUserById(userId)
        logger.info("The user is " + user + " from userController")
        if (!user.exists) {
            return res.status(404).json({
                success: false,
                message: 'Item not found',
            });
        }
        return res.status(200).json({
            success: true,
            data: user.data(),
        });
    } catch(error){
        logger.error("Obtain user Attempt failed ",{
            error: error.message
        })
    }
}

const register = async (req,res)=>{
    try{
        const userData = req.body;
        userService.createUser(userData)
        return res.status(200).send("The user " + req.body.id + " was created");
    } catch (error){
        logger.error('Registration attempt failed due to an error.', {
            error: error.message
        });
    }
}

const editUser = async(req,res)=>{
    try{
        const userData = req.body;
        const userId = req.params.userId
        userService.editUser(userId,userData)
        return res.status(200).send("The user " + userId + " was updated");
    } catch (error){
        logger.error('Registration attempt failed due to an error.', {
            error: error.message
        });
    }
}

const deleteUser = async(req,res)=>{
    try{
        const userId = req.params.userId;
        userService.deleteUser(userId)
        return res.status(200).send("The user " + userId + " was eleminated");
    } catch (error){
        logger.error('Registration attempt failed due to an error.', {
            error: error.message
        });
    }
}


module.exports = {
    register,
    editUser,
    deleteUser,
    getUserById
  };