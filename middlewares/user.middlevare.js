const moment = require('moment');
const {
    constants: { NEED_ITEM, AUTH },
    dataIn: { BODY },
    errorMessage,
    statusCodes
} = require('../configs');
const { ErrorHandler } = require('../errors/ErrorHandler');
const { User } = require('../models');

module.exports = {
    checkUserAccess: (rolesArr = []) => (req, res, next) => {
        try {
            const { loginUser, user } = req;

            if (loginUser._id.toString() === user._id.toString()) return next();

            if (!rolesArr.length) return next();

            if (!rolesArr.includes(loginUser.role)) {
                throw new ErrorHandler(statusCodes.FORBIDDEN, errorMessage.FORBIDDEN);
            }

            next();
        } catch (e) {
            next(e);
        }
    },

    getUserByDynamicParam: (paramName, dataIn = BODY, dbFiled = paramName) => async (req, res, next) => {
        try {
            let data = req[dataIn][paramName];

            if (!data) return next();

            if (paramName === 'email') data = data.toLowerCase();

            req.user = await User.findOne({ [dbFiled]: data });

            next();
        } catch (e) {
            next(e);
        }
    },

    isUserPresent: (isUserNeed = true, auth = false) => (req, res, next) => {
        try {
            const { user } = req;

            if (!user && isUserNeed) {
                if (!auth) throw new ErrorHandler(statusCodes.NOT_FOUND, errorMessage.NOT_FOUND);

                throw new ErrorHandler(statusCodes.NOT_FOUND, errorMessage.WRONG_PASSW_OR_EMAIL);
            }

            if (user && !isUserNeed) {
                throw new ErrorHandler(statusCodes.CONFLICT, errorMessage.EXIST_EMAIL);
            }

            next();
        } catch (e) {
            next(e);
        }
    },
};