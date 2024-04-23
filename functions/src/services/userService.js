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


const getUserById = async (userId)=>{
  try {
    const user = await db.collection("users").doc(userId).get();
    logger.info("The user is " + user + " from userService");
    return user;
  } catch (error) {
    logger.error("Error while fetching the user by id.", {
      error: error.message,
      userId,
    });
  }
};

const createUser = async (userData) =>{
  const {id, bankAccount, lastName, number, bank, password,
    photoLink, birthDate, email, name, money, skill} = userData;
  try {
    await db.collection("users").doc("/" + id + "/")
        .create({
          name: name,
          lastName: lastName,
          email: email,
          number: number,
          birthDate: birthDate,
          photoLink: photoLink,
          bankAccount: bankAccount,
          bank: bank,
          password: password,
          money: money,
          skill: skill,
        });
  } catch (error) {
    logger.error("Registration attempt failed due to an error.", {
      error: error.message,
      email,
      name,
    });
  }
};

const editUser= async (userId, userData)=>{
  const {bankAccount, lastName, number, bank, password,
    photoLink, birthDate, email, name, money, skill} = userData;
  try {
    await db.collection("users").doc("/" + userId + "/").set({
      name: name,
      lastName: lastName,
      email: email,
      number: number,
      birthDate: birthDate,
      photoLink: photoLink,
      bankAccount: bankAccount,
      bank: bank,
      password: password,
      money: money,
      skill: skill,
    });
  } catch (error) {
    logger.error("Update user attempt failed due to an error.", {
      error: error.message,
      email,
      name,
    });
  }
};


const deleteUser = async (userId)=>{
  try {
    const docRef = db.collection("users").doc("/" + userId + "/");
    await docRef.delete();
  } catch (error) {
    logger.error("Update user attempt failed due to an error.", {
      error: error.message,
    });
  }
};

const applyAGig = async (userId, gigId, gigApplied)=>{
  try {
    const userRef = db.collection("users").doc(userId);
    const applicationsRef = userRef.collection("applications");
    applicationsRef.doc(gigId).create({
      gigApplied: gigApplied.data(),
    });
  } catch (error) {
    logger.error("UserCService: Apply a job failed succesfully", {
      error: error.message,
    });
  }
};


module.exports = {
  createUser,
  editUser,
  deleteUser,
  getUserById,
  applyAGig,
};
