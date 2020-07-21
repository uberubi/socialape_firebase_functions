const functions = require('firebase-functions');
const { onRequest } = require('firebase-functions/lib/providers/https');
const admin = require('firebase-admin')

admin.initializeApp()

const express = require('express')
const app = express() 

app.get('/screams', (req, res) => {
  admin.firestore()
  .collection('screams')
  .orderBy('createdAt', 'desc')
  .get()
  .then(data => {
    let screams = []
    data.forEach(doc => {
      screams.push({
        screamId: doc.id,
        body: doc.data().body,
        userHandle: doc.data().userHandle,
        createdAt: doc.data().createAt
      })
    })
    return res.json(screams)
  })
  .catch(err => console.error(err))
})

app.post('/scream', (req, res) => {
  if (req.method !== 'POST') {
    return res.status(400).json({error: "Method not allowed"})
  }
  const newScream = {
    body: req.body.body,
    userHandle: req.body.userHandle,
    createAt: new Date().toISOString()
  }

  admin.firestore().collection('screams').add(newScream)
  .then(doc => {
    res.json({message: `document ${doc.id} created successfully`})
  })
  .catch(err => {
    res.status(500).json({error: 'something went wrong'})
    console.error(err)
  })
})

// https://baseurl.com/api

exports.api = functions.region('europe-west3').https.onRequest(app)