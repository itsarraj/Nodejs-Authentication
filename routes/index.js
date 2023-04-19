const express = require('express');
const router = express.Router();
const passport = require('passport');

const homeController = require('../controllers/home_controller.js');

router.get('/', homeController.home);
router.use('/users', require('./userRoutes.js'));
router.use('/password', require('./passwordRoutes.js'));
module.exports = router;
