const bcrypt = require('bcrypt');

const { ErrorHandler } = require('../errors/ErrorHandler');
const { constants, enums: { ERRORS } } = require('../configs');

module.exports = {
    compare: async (hash, password) => {
        const isPasswordMath = await bcrypt.compare(password, hash);

        if (!isPasswordMath) {
            throw new ErrorHandler(
                ERRORS.NOT_FOUND.WRONG_PASSW_OR_EMAIL.status,
                ERRORS.NOT_FOUND.WRONG_PASSW_OR_EMAIL.message
            );
        }
    },

    hash: (password) => bcrypt.hash(password, constants.SALT)
};