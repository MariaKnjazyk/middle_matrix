const Joi = require('joi');
const { regex, enums: { USER_ROLES } } = require('../configs')

module.exports = {
    getList: {
        query: {
            spec: Joi.string().trim().optional(),
            timeSlot: Joi.string().optional()
        }
    },

    create: {
        body: {
            email: Joi.string().trim().regex(regex.EMAIL_REGEXP).required(),
            name: Joi.string().alphanum().trim().required().min(2),
            password: Joi.string().trim().regex(regex.PASSWORD_REGEXP).required(),
            role: Joi.string().valid(USER_ROLES.PATIENT, USER_ROLES.DOCTOR).required(),
            spec: Joi.when('role', {
                is: USER_ROLES.DOCTOR,
                then: Joi.string().trim().required(),
                otherwise: Joi.forbidden()
            })
        }
    },

    update: {
        body: {
            email: Joi.string().trim().regex(regex.EMAIL_REGEXP).required(),
            name: Joi.string().alphanum().trim().required().min(2),
            role: Joi.string().valid(USER_ROLES.PATIENT, USER_ROLES.DOCTOR).required(),
            spec: Joi.when('role', {
                is: USER_ROLES.DOCTOR,
                then: Joi.string().trim().required(),
                otherwise: Joi.forbidden()
            })
        }
    }
}