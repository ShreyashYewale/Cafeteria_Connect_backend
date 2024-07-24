var express = require("express");
var router = express.Router();

const {getAllItems,createNewItem,deleteItem}=require('../controllers/item')


//Route to create item
router.post('/item/create',createNewItem)

//Route to delete item
router.delete('/item/delete',deleteItem)


//Route to get all the products
router.get('/items',getAllItems)