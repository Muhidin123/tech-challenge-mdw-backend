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
