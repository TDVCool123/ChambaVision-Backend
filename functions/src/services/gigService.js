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


const getGigById = async(gigId)=>{
  try{
    const gig = await db.collection('gig').doc(gigId).get();
    logger.info("The user is " + gig + " from gigService")
    return gig;
  }catch(error){
    logger.error('Error while fetching the gig by id.', {
      error: err.message,
      problemId,
    });
  }
}

const createGig = async(gigData) =>{
    const {id,title,photoLink,shortDescription,largeDescription,price} = gigData;
    try {
        /*const existingUser = await getUserByEmail(email);
        if (existingUser) {
          logger.error(
            'Registration attempt failed: User with the given email already exists.',
            { email }
          );
          throw new Error('User with the given email already exists.');
        }*/
        await db.collection('gig').doc('/' + id + '/')
        .create({
            title:title,
            photoLink:photoLink,
            shortDescription:shortDescription,
            largeDescription:largeDescription,
            price: price
          });
    } catch(error){
        logger.error('Registration attempt failed due to an error.', {
            error: error.message,
            id,
            title,
          });
    }
} 

const editGig= async (gigId,gigData)=>{
  const {id,title,photoLink,shortDescription,largeDescription,price} = gigData;
  try {
    await db.collection('gig').doc('/' + gigId + '/').set({
      title:title,
      photoLink:photoLink,
      shortDescription:shortDescription,
      largeDescription:largeDescription,
      price: price
    });
  } catch(error){
      logger.error('Update gig attempt failed due to an error.', {
          error: error.message,
          title,
          id,
        });
  }
}


const deleteGig= async (gigId)=>{
  
  try {
    const docRef = db.collection('gig').doc('/' + gigId + '/');
    await docRef.delete();
  } catch(error){
      logger.error('Update user attempt failed due to an error.', {
          error: error.message
        });
  }
}


module.exports = {
  createGig,
  editGig,
  deleteGig,
  getGigById
};