const Joi = require('joi');
// const { regex } = require('../configs')

module.exports = {
    getList: {
        query: {
            doctor: Joi.string().regex(/^[a-fA-F0-9]{24}$/).required().error(new Error('Mongo ID is not valid')),
            dayTimeSlot: Joi.string().optional()
        }
    },

    create: {
        body: {
            doctor: Joi.string().regex(/^[a-fA-F0-9]{24}$/).required().error(new Error('Mongo ID is not valid')),
            timeSlot: Joi.string().required()
        }
    }
}