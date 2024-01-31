const {
    enums: { ERROR_CODES }
} = require('../configs');
const ErrorHandler = require('../errors/ErrorHandler');
const { User } = require('../models');
const {USER_ROLES} = require("../configs/enums");

module.exports = {
    checkUserAccess: (rolesArr = []) => (req, res, next) => {
        try {
            const { loginUser, user } = req;

            if (!rolesArr.length) return next();

            if (!rolesArr.includes(loginUser.role)) {
                throw new ErrorHandler(ERROR_CODES.FORBIDDEN, 'forbidden');
            }

            next();
        } catch (e) {
            next(e);
        }
    },

    getUserByDynamicParam: (paramName, dataIn = 'body', dbFiled = paramName) => async (req, res, next) => {
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
                if (!auth) throw new ErrorHandler(ERROR_CODES.NOT_FOUND, 'not found');

                throw new ErrorHandler(ERROR_CODES.NOT_FOUND, 'wrong password or email');
            }

            if (user && !isUserNeed) {
                throw new ErrorHandler(ERROR_CODES.CONFLICT, 'exists email');
            }

            next();
        } catch (e) {
            next(e);
        }
    },

    checkUserRole: (req, res, next) => {
        try {
            const { loginUser, body } = req;

            if (loginUser.role === USER_ROLES.HEAD_DOCTOR) {
                return next();
            }

            if (body.role === USER_ROLES.DOCTOR) {
                throw new ErrorHandler(ERROR_CODES.FORBIDDEN, 'forbidden');
            }

            next();
        } catch (e) {
            next(e);
        }
    },
};