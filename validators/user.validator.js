const Joi = require('joi');
const { regex } = require('../configs')

module.exports = {
    getList: {
        query: {
            spec: Joi.string().trim().optional(),
            timeSlot: Joi.string().optional()
        }
    },

    create: {
        body: {

        }
    }
}