const functions = require("firebase-functions");
const admin = require("firebase-admin");

admin.initializeApp();

const db = admin.firestore();

const app = require("express")();

app.get("/pages", (_req, res) => {
  db.collection("data")
    .get()
    .then(data => {
      let pages = [];
      data.forEach(doc => {
        pages.push({
          id: doc.id,
          ...doc.data(),
        });
      });
      return res.json(pages);
    })
    .catch(err => console.error(err));
});

app.post("/contacts", (req, res) => {
  let contact = req.body;

  const newContact = {
    first_name: contact.first_name,
    last_name: contact.last_name,
    email: contact.email,
    title: contact.email,
    message: contact.message,
  };
  db.collection("contacts")
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
  db.collection("contacts")
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
