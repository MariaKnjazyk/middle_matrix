const jwt = require('jsonwebtoken');

const {
    constants: { TOKEN_TYPE_ACCESS },
    configs: { ACCESS_SECRET_KEY, REFRESH_SECRET_KEY },
    enums: { ERROR_CODES }
} = require('../configs');
const ErrorHandler = require('../errors/ErrorHandler');

module.exports = {
    generateTokenPair: () => {
        const access_token = jwt.sign({}, ACCESS_SECRET_KEY, { expiresIn: '15m' });
        const refresh_token = jwt.sign({}, REFRESH_SECRET_KEY, { expiresIn: '31d' });

        return {
            access_token,
            refresh_token
        };
    },

    verifyToken: async (token, tokenType) => {
        try {
            const secret = tokenType === TOKEN_TYPE_ACCESS ? ACCESS_SECRET_KEY : REFRESH_SECRET_KEY;

            await jwt.verify(token, secret);
        } catch (e) {
            throw new ErrorHandler(ERROR_CODES.NOT_VALID_TOKEN, 'not valid token');
        }
    }
};