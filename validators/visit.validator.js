const Joi = require('joi');
// const { regex } = require('../configs')

module.exports = {
    getList: {
        query: {
            doctor: Joi.string().regex(/^[a-fA-F0-9]{24}$/).required(),
            dayTimeSlot: Joi.string().optional()
        }
    },

    create: {
        body: {
            doctor: Joi.string().regex(/^[a-fA-F0-9]{24}$/).required(),
            timeSlot: Joi.string().required()
        }
    }
}