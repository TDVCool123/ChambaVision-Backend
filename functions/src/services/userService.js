const admin = require("firebase-admin");
const logger = require("firebase-functions/logger");

// Ensure Firebase Admin SDK is initialized
if (!admin.apps.length) {
    var serviceAccount = require("../../chambavision-permissions.json");
    admin.initializeApp({
        credential: admin.credential.cert(serviceAccount)
    });
}

const db = admin.firestore(); // Now you can access Firestore


const getUserById = async(userId)=>{
  try{
    const user = await db.collection('users').doc(userId).get();
    logger.info("The user is " + user + " from userService")
    return user;
  }catch(error){
    logger.error('Error while fetching the user by id.', {
      error: err.message,
      problemId,
    });
  }
  
}

const createUser = async(userData) =>{
    const {id,bankAccount,lastName,number,bank,password,photoLink,birthDate,email,name} = userData;
    try {
        /*const existingUser = await getUserByEmail(email);
        if (existingUser) {
          logger.error(
            'Registration attempt failed: User with the given email already exists.',
            { email }
          );
          throw new Error('User with the given email already exists.');
        }*/
        await db.collection('users').doc('/' + id + '/')
        .create({
            name:name,
            lastName:lastName,
            email:email,
            number:number,
            birthDate: birthDate,
            photoLink:photoLink,
            bankAccount: bankAccount,
            bank: bank,
            password: password
          });
    } catch(error){
        logger.error('Registration attempt failed due to an error.', {
            error: error.message,
            email,
            name,
          });
    }
} 

const editUser= async (userId,userData)=>{
  const {bankAccount,lastName,number,bank,password,photoLink,birthDate,email,name} = userData;
  try {
    await db.collection('users').doc('/' + userId + '/').set({
      name:name,
      lastName:lastName,
      email:email,
      number:number,
      birthDate: birthDate,
      photoLink:photoLink,
      bankAccount: bankAccount,
      bank: bank,
      password: password  
    });
  } catch(error){
      logger.error('Update user attempt failed due to an error.', {
          error: error.message,
          email,
          name,
        });
  }
}


const deleteUser= async (userId)=>{
  
  try {
    const docRef = db.collection('users').doc('/' + userId + '/');
    await docRef.delete();
  } catch(error){
      logger.error('Update user attempt failed due to an error.', {
          error: error.message
        });
  }
}


module.exports = {
  createUser,
  editUser,
  deleteUser,
  getUserById
};