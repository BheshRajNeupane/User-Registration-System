const express = require('express');
const userController = require('../controllers/users-controller.js')
const authController = require('../controllers/auth-controller.js')

const router = express.Router();

router.get(
    '/api/users', 
    authController.isLoggedIn, 
    userController.getUsers
)
router.patch(
    '/api/users/:id',  
    authController.isLoggedIn,
    userController.editUser
)
router.delete(
    '/api/users/:id',
     authController.isLoggedIn,
     userController.deleteUser
)

module.exports =  router