const functions = require("firebase-functions");
const app = require("express")();
const {
  saveNewContact,
  getAllContacts,
  getPageContact,
} = require("./handlers/contacts");
const { getAllPages } = require("./handlers/pages");
const { db } = require("./util/admin");
app.use((_req, res, next) => {
  // it will accept all requests but we can change this to accept only the ones we want
  res.setHeader("Access-Control-Allow-Origin", "*");
  // Here we allow all the HTTP methods you want
  res.header("Access-Control-Allow-Methods", "GET,POST");
  // Here we allow the headers for the HTTP requests to your server
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  // Method to reference to the next Node.js function in our flow
  next();
});

// pages route
app.get("/pages", getAllPages);

// contacts post and get routes
app.post("/contacts", saveNewContact);
app.get("/contacts", getAllContacts);

exports.api = functions.https.onRequest(app);
