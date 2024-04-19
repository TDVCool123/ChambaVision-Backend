/**
 * Import function triggers from their respective submodules:
 *
 * const {onCall} = require("firebase-functions/v2/https");
 * const {onDocumentWritten} = require("firebase-functions/v2/firestore");
 *
 * See a full list of supported triggers at https://firebase.google.com/docs/functions
 */
var admin = require("firebase-admin");
var serviceAccount = require("./chambavision-permissions.json");
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});
const db = admin.firestore();

const {onRequest} = require("firebase-functions/v2/https");
const logger = require("firebase-functions/logger");

const functions = require('firebase-functions');
const express = require('express');
const cors = require('cors');
const app = express();
app.use(cors({ origin: true }));

app.get('/gig', (req, res) => {
  return res.status(200).send('Hello World!');
});

// create
app.post('/gig', (req, res) => {
    (async () => {
        try {
          await db.collection('gig').doc('/' + req.body.id + '/').set({
            title:req.body.title,
            photoLink:req.body.photoLink,
            shortDescription:req.body.shortDescription,
            largeDescription: req.body.largeDescription,
            mount: req.body.mount
          }); 
          return res.status(200).send("The new object has been created");
        } catch (error) {
          console.log(error);
          return res.status(500).send(error);
        }
      })();
  });

  //update
  app.put('/gig/:gigID', (req, res) => {
    (async () => {
      try{
        const docRef = db.collection('gig').doc('/' + req.params.gigID + '/');
        await docRef.update({ 
          title:req.body.title,
          photoLink:req.body.photoLink,
          shortDescription:req.body.shortDescription,
          largeDescription: req.body.largeDescription,
          mount: req.body.mount
        }); 
        return res.status(200).send("Updated");
      }catch(error){
        console.log(error);
        return res.status(500).send(error)
      }
    })();
  });
  
  //delete
  app.delete('/gig/:gigID', (req, res) => {
    (async () => {
      try{
        const docRef = db.collection('gig').doc('/' + req.params.gigID + '/');
        await docRef.delete();
        return res.status(200).send("Delete " + req.params.gigID);
      }catch(error){
        console.log(error);
        return res.status(500).send(error)
      }
    })();
  });

  //users

  app.post('/user', (req, res) => {
    (async () => {
        try {
          await db.collection('users').doc('/' + req.body.id + '/').set({
            name:req.body.name,
            lastName:req.body.lastName,
            email:req.body.email,
            number:req.body.number,
            birthDate: req.body.birthDate,
            photoLink: req.body.photoLink,
            bankAccount: req.body.bankAccount,
            bank: req.body.bank,
            password: req.body.password
          }); 
          return res.status(200).send("The user " + req.body.id + " was create");
        } catch (error) {
          console.log(error);
          return res.status(500).send(error);
        }
      })();
  });

  //update
  app.put('/user/:userID', (req, res) => {
    (async () => {
      try{
        const docRef = db.collection('users').doc('/' + req.params.userID + '/');
        await docRef.update({ 
            name:req.body.name,
            lastName:req.body.lastName,
            email:req.body.email,
            number:req.body.number,
            birthDate: req.body.birthDate,
            photoLink: req.body.photoLink,
            bankAccount: req.body.bankAccount,
            bank: req.body.bank,
            password: req.body.password
         });
        return res.status(200).send("The user: " + req.params.userID + " was update");
      }catch(error){
        console.log(error);
        return res.status(500).send(error)
      }
    })();
  });
  
  //delete
  app.delete('/user/:userID', (req, res) => {
    (async () => {
      try{
        const docRef = db.collection('users').doc('/' + req.params.userID + '/');
        await docRef.delete();
        return res.status(200).send("The user: " + req.params.userID + " Deleted ");
      }catch(error){
        console.log(error);
        return res.status(500).send(error)
      }
    })();
  });

  app.get('/hello-world', (req, res) => {
    return res.status(200).send('Hello World!');
  });


exports.app = functions.https.onRequest(app);
// Create and deploy your first functions
// https://firebase.google.com/docs/functions/get-started

// exports.helloWorld = onRequest((request, response) => {
//   logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });
