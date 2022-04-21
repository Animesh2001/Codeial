const express = require('express');
const router = express.Router();


const practice1 = require('../controllers/users_controller');
const practice2 = require('../controllers/home_controller');

router.get('/practice1',practice1.practice1);
router.get('/practice2',practice2.practice2)

module.exports=router;