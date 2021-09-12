const { db } = require("../util/admin");

exports.getAllPages = (_req, res) => {
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
};

exports.getContactPage = (_req, res) => {
  let ref = db.collection("data");
  ref
    .where("page_id", "==", 2)
    .get()
    .then(data => {
      let pages = [];
      data.forEach(doc => {
        pages.push(doc.data());
      });
      return res.json(pages);
    })
    .catch(err => {
      res.status(err.status).json({ error: err.body });
    });
};

exports.getHomePage = (_req, res) => {
  let ref = db.collection("data");
  ref
    .where("page_id", "==", 1)
    .get()
    .then(data => {
      let pages = [];
      data.forEach(doc => {
        pages.push(doc.data());
      });
      return res.json(pages);
    })
    .catch(err => {
      res.status(err.status).json({ error: err.body });
    });
};
