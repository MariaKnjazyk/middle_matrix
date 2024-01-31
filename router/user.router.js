const router = require('express').Router();
const { celebrate } = require('celebrate');
const { userController} = require('../controllers');
const { userMiddleware, visitMiddleware, authMiddleware } = require('../middlewares');
const { userValidator } = require ('../validators');

router.route('/')
    .get(celebrate(userValidator.getList), visitMiddleware.checkVisitingTime, userController.getUsers)
    .post(celebrate(userValidator.create), authMiddleware.validateToken(), userMiddleware.checkUserRole, userMiddleware.getUserByDynamicParam('email'), userMiddleware.isUserPresent(false),  userController.create);

module.exports = router;
