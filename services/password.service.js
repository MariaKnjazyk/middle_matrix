const bcrypt = require('bcrypt');

const ErrorHandler = require('../errors/ErrorHandler');
const { constants, enums: { ERROR_CODES } } = require('../configs');

module.exports = {
    compare: async (hash, password) => {
        const isPasswordMath = await bcrypt.compare(password, hash);

        if (!isPasswordMath) {
            throw new ErrorHandler( ERROR_CODES.NOT_FOUND, 'wrong password or email' );
        }
    },

    hash: (password) => bcrypt.hash(password, constants.SALT)
};