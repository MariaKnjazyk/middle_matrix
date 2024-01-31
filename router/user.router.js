const router = require('express').Router();
const { celebrate } = require('celebrate');
const { userController} = require('../controllers');
const { userMiddleware, visitMiddleware } = require('../middlewares');
const { userValidator } = require ('../validators');

router.route('/')
    .get(celebrate(userValidator.getList), visitMiddleware.checkVisitingTime, userController.getUsers);


module.exports = router;
