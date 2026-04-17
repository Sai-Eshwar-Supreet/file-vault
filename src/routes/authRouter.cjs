const {Router} = require('express');
const logoutController = require('../controllers/logoutController.cjs');
const loginController = require('../controllers/loginController.cjs');
const signupController = require('../controllers/signupController.cjs');

const authRouter = Router();

authRouter.get('/login', loginController.get);
authRouter.post('/login', loginController.post);
authRouter.get('/signup', signupController.get);
authRouter.post('/signup', signupController.post);
authRouter.post('/logout', logoutController.post);

module.exports = authRouter;