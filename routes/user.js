const express = require('express');
const { getUserById, updateUser ,getUser} = require('../controllers/user');
const router = express.Router();

router.param('userId',getUserById);
router.get('/user/:userId',getUser);
router.put('./user/:userId',updateUser);


module.exports=router;