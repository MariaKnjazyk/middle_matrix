const router = require('express').Router();
const { celebrate } = require('celebrate');
const { authMiddleware, userMiddleware, visitMiddleware  } = require('../middlewares');
const { visitController} = require('../controllers');
const { visitValidator } = require ('../validators');
const { enums: { USER_ROLES } } = require('../configs')

router.route('/')
    .get(celebrate(visitValidator.getList), visitController.getTimeSlots)
    .post(
        celebrate(visitValidator.create),
        authMiddleware.validateToken(),
        userMiddleware.checkUserAccess([]),
        visitMiddleware.isTimeSlotNotFree,
        userMiddleware.getUserByDynamicParam('doctor', 'body', '_id'),
        userMiddleware.isUserPresent(),
        visitController.create
    );


module.exports = router;
