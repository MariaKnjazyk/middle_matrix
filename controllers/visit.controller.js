const { visitService } = require('../services');
const { ScheduledVisit } = require('../models');

module.exports = {
    getTimeSlots: async (req, res, next) => {
        try {
            const searchQuery = visitService.createSearchQuery(req.query);

            const timeslots = await visitService.findFreeSlots(searchQuery)

            const responseKey = req.query.dayTimeSlot ? 'freeTimeSlots' : 'notFreeTimeSlots';

            res.json({ [responseKey]: timeslots });
        } catch (e) {
            next(e);
        }
    },

    create: async (req, res, next) => {
        try {
            const { body: { doctor, timeSlotToDate }, user } = req;

            const scheduledVisit = await ScheduledVisit.create({ doctor, date: timeSlotToDate, user: user._id });

            res.json({ scheduledVisit });
        } catch (e) {
            next()
        }
    }
}