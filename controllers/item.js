const Item = require("../models/item");
const formidable = require("formidable"); //This library can handle form data

//This controller is used to create the item for eg.Sheera its price and description etc
exports.createNewItem = (req, res) => {
  let form = new formidable.IncomingForm();
  form.keepExtensions = true;

  form.parse(req, (err, fields) => {
    if (err) {
      return res.status(400).json({
        error: "problem with details",
      });
    }

    //Destructuring the form fields
    const { name, status,category } = fields;

    if (!name || !status|| !category) {
      return res.status(400).json({ error: "Please include all fields" });
    }

    let item = new Item(fields);

    //Save the form details to DB
    item.save((err, item) => {
      if (err) {
        res.status(400).json({ error: "Saving item in DB failed" });
      }
      res.json(item);
    });
  });
};

//This controller is used to delete the item.
exports.deleteItem = (req, res) => {
  let item = req.item;
  item.remove((err, deleteditem) => {
    if (err) {
      return res.status(400).json({ error: "Failed to delete the item" });
    }
    res.json({ message: "Deletion of item was successful", deleteditem });
  });
};

// This controller is used to get all the items
exports.getAllItems = (req, res) => {
  Item.find()
    .populate("category")
    .exec((items, err) => {
      if (err) {
        return res.status(400).json({ error: "No Product Found" });
      }
      res.json(items);
    });
};
