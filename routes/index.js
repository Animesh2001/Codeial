const express = require('express');

//remember this 
const router = express.Router();

//we need to import this homeController from controller
const homeController = require('../controllers/home_controller');

console.log('router loaded');

//here addding . in front of homeController we can access the objects containing function inside the controller files.
router.get('/',homeController.home);

//all the routes for user goes into this user route
router.use('/users',require('./users'));

router.use('/practice',require('./practice'));

router.use('/posts',require('./posts'));    

router.use('/comments',require('./comments'));

//for any further routes, access from here
//router.use('/routerName',require('./routerFile'));

module.exports=router;