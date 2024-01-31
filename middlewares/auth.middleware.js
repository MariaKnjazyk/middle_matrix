const {
    constants: { TOKEN_TYPE_ACCESS },
    enums: { ERROR_CODES }
} = require('../configs');
const ErrorHandler = require('../errors/ErrorHandler');
const { jwtService: { verifyToken } } = require('../services');
const { OAuth } = require('../models');

module.exports = {
    validateToken: (tokenType = TOKEN_TYPE_ACCESS) => async (req, res, next) => {
        try {
            const token = req.get('Authorization');

            if (!token) {
                throw new ErrorHandler(ERROR_CODES.NOT_VALID_TOKEN, 'no token');
            }

            const splitToken = token.split(' ')[1];

            await verifyToken(splitToken, tokenType);

            const tokenFromDB = await OAuth.findOne({ [tokenType]: splitToken }).populate('user');

            if (!tokenFromDB) {
                throw new ErrorHandler(ERROR_CODES.NOT_VALID_TOKEN, 'not valid token');
            }

            req.loginUser = tokenFromDB.user;

            next();
        } catch (e) {
            next(e);
        }
    },
};