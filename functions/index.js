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

app.get('/getById/:userID', async (req, res) => {
    
    try{
        const user = await db.collection('users').doc(req.params.userID).get();
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
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: 'Internal server error. Please try again.',
        });
    }
});

// create
app.post('/api/create', (req, res) => {
    (async () => {
        try {
          await db.collection('items').doc('/' + req.body.id + '/')
              .create({item: req.body.item});
          return res.status(200).send();
        } catch (error) {
          console.log(error);
          return res.status(500).send(error);
        }
      })();
  });

  //update
  app.put('/api/update/:id', (req, res) => {
    (async () => {
      try{
        const docRef = db.collection('items').doc(req.params.id);
        await docRef.update({ item: req.body.item });
        return res.status(200).send("Updated");
      }catch(error){
        console.log(error);
        return res.status(500).send(error)
      }
    })();
  });
  
  //delete
  app.delete('/api/delete/:id', (req, res) => {
    (async () => {
      try{
        const docRef = db.collection('items').doc(req.params.id);
        await docRef.delete();
        return res.status(200).send("Delete " + req.params.id);
      }catch(error){
        console.log(error);
        return res.status(500).send(error)
      }
    })();
  });

  //users

  app.post('/api/createUser', (req, res) => {
    (async () => {
        try {
          await db.collection('users').doc('/' + req.body.id + '/').set({
            name:req.body.name,
            email:req.body.email
          }); 
          return res.status(200).send("The user " + req.body.id + " was create");
        } catch (error) {
          console.log(error);
          return res.status(500).send(error);
        }
      })();
  });

  //update
  app.put('/api/updateUser/:id', (req, res) => {
    (async () => {
      try{
        const docRef = db.collection('users').doc(req.params.id);
        await docRef.update({ 
          name:req.body.name,
          email:req.body.email
         });
        return res.status(200).send("The user: " + req.params.id + " was update");
      }catch(error){
        console.log(error);
        return res.status(500).send(error)
      }
    })();
  });
  
  //delete
  app.delete('/api/deleteUser/:id', (req, res) => {
    (async () => {
      try{
        const docRef = db.collection('users').doc(req.params.id);
        await docRef.delete();
        return res.status(200).send("The user: " + req.params.id + " Deleted ");
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
