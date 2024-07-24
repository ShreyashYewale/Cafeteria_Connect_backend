const express=require('express');
const router=express.Router();
const {createCategory, getAllCategories}=require("../controllers/category")


router.post("/category/create",createCategory);

router.get("/categories",getAllCategories);
router.delete("/deleteCategory",deleteCategory);


module.exports=router;