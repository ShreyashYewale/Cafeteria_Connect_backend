const Category = require("../models/category");

//This controller is used to create the category
exports.createCategory = (req, res) => {
  const category = new Category(req.body);
  category.save((err, category) => {
    if (err) {
      return res.json({ error: "Not able to save category" });
    }
    return res.json(category);
  });
};

//This controller is used to delete the category
exports.deleteCategory=(req,res)=>{
    const category=req.category;

    category.remove((err,category)=>{
        if(err){
            return res.status(400).json({error:"Failed to delete category"})
        }

        res.json({message:"Successully Deleted the item"});
    });
}

//This contoller is used to get all the categories
exports.getAllCategories = (req, res) => {
  Category.find().exec((err, categories) => {
    if (err) {
      return res.status(400).json({ error: "No Categories Found" });
    }
    res.json(categories);
  });
};
