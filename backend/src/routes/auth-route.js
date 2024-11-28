const express = require('express');
const authController = require('../controllers/auth-controller.js')

const router = express.Router();

router.post(
    '/api/users/register',
    authController.register
)
router.post( 
    '/api/users/login' , 
    authController.login
)
router.patch(
    '/api/users/password-reset' ,
     authController.reset
)

module.exports =  router
