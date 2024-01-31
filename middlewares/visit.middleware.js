const moment = require('moment');
const {
    enums: { ERROR_CODES }
} = require('../configs');
const ErrorHandler = require('../errors/ErrorHandler');
const { ScheduledVisit } = require('../models');

module.exports = {
    checkVisitingTime: (req, res, next) => {
        try {
            if (req.query?.timeSlot) {
                req.query.timeSlotToDate = moment(req.query.timeSlot).toDate();

                if (moment(req.query.timeSlotToDate).isBefore(moment())) {
                    throw new ErrorHandler(ERROR_CODES.BAD_REQUEST, 'time is past');
                }
            }
            next();
        } catch (e) {
            next(e)
        }
    },

    isTimeSlotNotFree: async (req, res, next) => {
        try {
            const { timeSlot, doctor } = req.body;

            req.body.timeSlotToDate = moment(timeSlot).toDate();

            const scheduledVisit = await ScheduledVisit.findOne({ date: req.body.timeSlotToDate, doctor }).select('_id');

            if (scheduledVisit) {
                throw new ErrorHandler(ERROR_CODES.CONFLICT, 'timeSlot is not free');
            }

            next();
        } catch (e) {
            next(e)
        }
    }
};