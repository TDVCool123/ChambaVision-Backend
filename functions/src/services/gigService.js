const admin = require("firebase-admin");
const logger = require("firebase-functions/logger");

// Ensure Firebase Admin SDK is initialized
if (!admin.apps.length) {
  const serviceAccount = require("../../chambavision-permissions.json");
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
  });
}

const db = admin.firestore(); // Now you can access Firestore

const getAllGigs = async ()=>{
  try {
    const gigs = await db.collection("gig").get();
    const gigsData = gigs.docs.map((doc) => doc.data());
    logger.info("All gigs: " + JSON.stringify(gigsData) + " from gigService");
    return gigsData;
  } catch (error) {
    logger.error("Error while fetching all gigs.", {
      error: error.message,
    });
  }
};

const getGigById = async (gigId)=>{
  try {
    const gig = await db.collection("gig").doc(gigId).get();
    logger.info("The user is " + gig + " from gigService");
    return gig;
  } catch (error) {
    logger.error("Error while fetching the gig by id.", {
      error: error.message,
      gigId,
    });
  }
};

const createGig = async (gigData) =>{
  const {id, ownerId, title, photoLink, shortDescription,
    largeDescription, price} = gigData;
  try {
    await db.collection("gig").doc("/" + id + "/")
        .create({
          title: title,
          photoLink: photoLink,
          shortDescription: shortDescription,
          largeDescription: largeDescription,
          price: price,
          ownerId: ownerId,
        });
  } catch (error) {
    logger.error("Registration attempt failed due to an error.", {
      error: error.message,
      id,
      title,
    });
  }
};

const editGig= async (gigId, gigData)=>{
  const {id, title, photoLink, shortDescription,
    largeDescription, price} = gigData;
  try {
    await db.collection("gig").doc("/" + gigId + "/").set({
      title: title,
      photoLink: photoLink,
      shortDescription: shortDescription,
      largeDescription: largeDescription,
      price: price,
    });
  } catch (error) {
    logger.error("Update gig attempt failed due to an error.", {
      error: error.message,
      title,
      id,
    });
  }
};


const deleteGig= async (gigId)=>{
  try {
    const docRef = db.collection("gig").doc("/" + gigId + "/");
    await docRef.delete();
  } catch (error) {
    logger.error("Update user attempt failed due to an error.", {
      error: error.message,
    });
  }
};

const userAppling = async (gigId, userId, userAppling)=>{
  try {
    const userRef = db.collection("gig").doc(gigId);
    const applicationsRef = userRef.collection("applications").doc(userId);
    applicationsRef.create({
      userApplig: userAppling.data(),
    });
  } catch (error) {
    logger.error("GigService: Apply a job failed succesfully", {
      error: error.message,
    });
  }
};


const getUsersApplying = async (gigId) =>{
  try {
    const usersApplying = await db.collection("gig").
        doc(gigId).collection("applications").get();
    const usersApplyingData = usersApplying.docs.map((doc) => doc.data());
    logger.
        info("Users applying to gig " +
          gigId + ": " + JSON.stringify(usersApplyingData));
    return usersApplyingData;
  } catch (error) {
    logger.error(`GigService: Retriving users whom apply to this job 
      failed succesfully`, {
      error: error.message,
    });
  }
};

module.exports = {
  createGig,
  editGig,
  deleteGig,
  getGigById,
  userAppling,
  getAllGigs,
  getUsersApplying,
};
