const { db } = require("../util/admin");
const { emailValidation } = require("../util/validators");

exports.saveNewContact = (req, res) => {
  const newContact = {
    first_name: req.body.first_name,
    last_name: req.body.last_name,
    email: req.body.email,
    title: req.body.title,
    message: req.body.message,
  };

  if (emailValidation(newContact.email) === true) {
    db.collection("contacts")
      .add(newContact)
      .then(doc => {
        res.json({ message: `document ${doc.id} created successfully` });
      })
      .catch(err => {
        res.status(500).json({ error: "something went wrong" });
      });
  } else {
    res
      .status(400)
      .json({ error: { message: emailValidation(newContact.email) } });
  }
};

exports.getAllContacts = (_req, res) => {
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
};
