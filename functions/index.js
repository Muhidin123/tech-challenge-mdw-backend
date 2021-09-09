const functions = require("firebase-functions");
const admin = require("firebase-admin");

admin.initializeApp();

const app = require("express")();

app.get("/pages", (_req, res) => {
  admin
    .firestore()
    .collection("data")
    .get()
    .then(data => {
      let pages = [];
      data.forEach(doc => {
        pages.push(doc.data());
      });
      return res.json(pages);
    })
    .catch(err => console.error(err));
});

app.post("/contacts", (req, res) => {
  const newContact = {
    first_name: req.body.first_name,
    last_name: req.body.last_name,
    email: req.body.email,
    title: req.body.email,
    message: req.body.message,
  };
  admin
    .firestore()
    .collection("contacts")
    .add(newContact)
    .then(doc => {
      res.json({ message: `document ${doc.id} created successfully` });
    })
    .catch(err => {
      res.status(500).json({ error: "something went wrong" });
      console.error(err);
    });
});

app.get("/contacts", (_req, res) => {
  admin
    .firestore()
    .collection("contacts")
    .get()
    .then(data => {
      let contacts = [];
      data.forEach(doc => {
        contacts.push(doc.data());
      });
      return res.json(contacts);
    })
    .catch(err => console.error(err));
});

exports.api = functions.https.onRequest(app);
