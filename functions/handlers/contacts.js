const { db } = require("../util/admin");
const { validateEmail } = require("../util/validators");

exports.saveNewContact = (req, res) => {
  let contact = req.body;

  const newContact = {
    first_name: contact.first_name,
    last_name: contact.last_name,
    email: contact.email,
    title: contact.title,
    message: contact.message,
  };
  let emailValidation = validateEmail(contact.email);

  if (emailValidation === true) {
    db.collection("contacts")
      .add(newContact)
      .then(doc => {
        res.json({ message: `document ${doc.id} created successfully` });
      })
      .catch(err => {
        res.status(500).json({ error: "something went wrong" });
      });
  } else {
    res.status(400).json({ error: { message: emailValidation } });
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
