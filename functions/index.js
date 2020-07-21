const functions = require("firebase-functions");
const { onRequest } = require("firebase-functions/lib/providers/https");
const admin = require("firebase-admin");
const app = require("express")();

admin.initializeApp();

var firebaseConfig = {
  apiKey: "AIzaSyA_F9_DcIF4RK9errfU5jH55JGlVIJ8sG8",
  authDomain: "socialape-23b23.firebaseapp.com",
  databaseURL: "https://socialape-23b23.firebaseio.com",
  projectId: "socialape-23b23",
  storageBucket: "socialape-23b23.appspot.com",
  messagingSenderId: "657736486764",
  appId: "1:657736486764:web:dcf2606b6ab338bf4d2d49",
  measurementId: "G-J5X0N0BEVH",
};

const firebase = require("firebase");
firebase.initializeApp(firebaseConfig);

const db = admin.firestore();

app.get("/screams", (req, res) => {
  db.collection("screams")
    .orderBy("createdAt", "desc")
    .get()
    .then((data) => {
      let screams = [];
      data.forEach((doc) => {
        screams.push({
          screamId: doc.id,
          body: doc.data().body,
          userHandle: doc.data().userHandle,
          createdAt: doc.data().createAt,
        });
      });
      return res.json(screams);
    })
    .catch((err) => console.error(err));
});

app.post("/scream", (req, res) => {
  if (req.method !== "POST") {
    return res.status(400).json({ error: "Method not allowed" });
  }
  const newScream = {
    body: req.body.body,
    userHandle: req.body.userHandle,
    createAt: new Date().toISOString(),
  };

  db.collection("screams")
    .add(newScream)
    .then((doc) => {
      res.json({ message: `document ${doc.id} created successfully` });
    })
    .catch((err) => {
      res.status(500).json({ error: "something went wrong" });
      console.error(err);
    });
});

// Signup route
app.post("/signup", (req, res) => {
  const newUser = {
    email: req.body.email,
    password: req.body.password,
    confirmPassword: req.body.confirmPassword,
    handle: req.body.handle,
  };
  // TODO: validate data
  let token, userId;
  db.doc(`/users/${newUser.handle}`)
    .get()
    .then((doc) => {
      if (doc.exist) {
        return res.status(400).json({ handle: "this handle is already taken" });
      } else {
        return firebase
          .auth()
          .createUserWithEmailAndPassword(newUser.email, newUser.password);
      }
    })
    .then((data) => {
      userId = data.user.uid;
      return data.user.getIdToken();
    })
    .then((idToken) => {
      token = idToken;
      const userCredentials = {
        handle: newUser.handle,
        email: newUser.email,
        createdAt: new Date().toISOString(),
        userId,
      };
      return db.doc(`/users/${newUser.handle}`).set(userCredentials);
    })
    .then(() => {
      return res.status(201).json({ token });
    })
    .catch((err) => {
      console.error(err);
      if (err.code === "auth/email-already-in-use") {
        return res.status(400).json({ email: "Email is already is use" });
      } else {
        return res.status(500).json({ error: err.code });
      }
    });
});

exports.api = functions.region("europe-west3").https.onRequest(app);
