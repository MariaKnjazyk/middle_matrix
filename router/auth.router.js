const router = require('express').Router();
const { celebrate } = require('celebrate');
const { authController } = require('../controllers');
const { userMiddleware } = require('../middlewares');
const { authValidator } = require ('../validators');

router.route('/login')
    .post(celebrate(authValidator.login), userMiddleware.getUserByDynamicParam('email'), userMiddleware.isUserPresent(true, true), authController.login);

module.exports = router;
