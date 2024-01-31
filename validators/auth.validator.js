const Joi = require('joi');
const { regex } = require('../configs')

module.exports = {
    login: {
        body: {
            email: Joi.string().trim().regex(regex.EMAIL_REGEXP).required(),
            password: Joi.string().trim().regex(regex.PASSWORD_REGEXP).required(),
        }
    }
}