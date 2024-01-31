module.exports = {
    USER_ROLES: {
        PATIENT: 'patient',
        DOCTOR: 'doctor',
        HEAD_DOCTOR: 'headDoctor'
    },

    ERRORS: {
        BAD_REQUEST: {
            NOT_VALID_DATA: {
                message: 'not valid data',
                status: 400
            },

            WRONG_ROLE: {
                message: 'wrong role',
                status: 400
            }
        },

        CONFLICT: {
            EXIST_EMAIL: {
                message: 'email is already exist',
                status: 409
            }
        },

        FORBIDDEN: {
            FORBIDDEN: {
                message: 'forbidden',
                status: 403
            }
        },

        INTERNAL_SERVER_ERROR: {
            INTERNAL_SERVER_ERROR: {
                message: 'internal server error',
                status: 500
            },

            // WRONG_TOKEN_TYPE: {
            //     message: 'wrong token type',
            //     status: 500
            // },
        },

        NOT_FOUND: {
            ACCOUNT_IS_NOT_ACTIVATED: {
                message: 'account is not activated',
                status: 404
            },

            NOT_FOUND: {
                message: 'not found',
                status: 404
            },

            WRONG_PASSW_OR_EMAIL: {
                message: 'wrong email or password',
                status: 404
            },
        },

        NOT_VALID_TOKEN: {
            NO_TOKEN: {
                message: 'no token',
                status: 401
            },

            NOT_VALID_TOKEN: {
                message: 'not valid token',
                status: 401
            },
        },
    }
};