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

const createUser = async(userdata) =>{
    const {id,bankAccount,lastName,number,bank,password,photoLink,birthDate,email,name} = userdata;
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
        .create({name:name,
            lastName:lastName,
            email:email,
            number:number,
            birthDate: birthDate,
            photoLink:photoLink,
            bankAccount: bankAccount,
            bank: bank,
            password: password});
    } catch(error){
        logger.error('Registration attempt failed due to an error.', {
            error: error.message,
            email,
            name,
          });
    }
} 

module.exports = {
  createUser
};