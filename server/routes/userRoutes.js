const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const { validateSignup, validateLogin } = require('../middlewares/authenticationValidation');
const { validateNewPassword } = require('../middlewares/passwordChangeMiddleware');
const { authenticateUser } = require('../middlewares/authenticateMiddleware');

router.get('/profile', userController.getProfile);

router.post('/signup', validateSignup, userController.signup);

router.post('/login', validateLogin, userController.login);

router.get('/user-details', authenticateUser, userController.getUserDetails);

router.put('/edit/user-details', authenticateUser, userController.editUserDetails);

router.put('/change-password', authenticateUser, validateNewPassword, userController.changeUserPassword);

router.get('/projects', authenticateUser, userController.getUserProjects);

router.post('/logout', userController.logout);

router.get('/backed-projects', authenticateUser, userController.getBackedProjects);

module.exports = router;
