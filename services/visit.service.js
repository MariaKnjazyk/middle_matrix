const moment = require(moment);
const { ScheduledVisit } = require('../models');
const { enums } = require('../configs');

module.exports = {
    createSearchQuery: (query) => {
        const searchQuery = {
            doctor: query.doctor
        };

        if (query.dayTimeSlot) {
            searchQuery.date = { $gte: moment(query.dayTimeSlot).startOf('day'), $lte: moment(query.dayTimeSlot).endOf('day') }
        }
        //
        // const scheduledVisits = await ScheduledVisit.find().select('doctor');
        //
        // if (query.timeSlotToDate) {
        //     const scheduledVisits = await ScheduledVisit.find({ date: timeSlotToDate }).select('doctor');
        //     const busyDoctorsIds = scheduledVisits.map(visit => visit.doctor);
        //
        //     searchQuery._id = { $nin: busyDoctorsIds };
        // }

        return searchQuery;
    },

    findFreeSlots: async (searchQuery = {}) => {
        const scheduledVisits = await ScheduledVisit.find(searchQuery).select('date');

        const notFreeHours = scheduledVisits.map(visit => {
            if (searchQuery.date) {
                return +moment(visit.date).hours();
            }

            return visit.date;
        });

        const freeHours = [8,9,10,11,12,13,14,15,16,17,18,19] // working hours 8-20

        if (searchQuery.date) {
            return freeHours.reduce((acc,hour) => {
                if(!notFreeHours.includes(hour)) {
                    acc.push(moment(searchQuery.dayTimeSlot).hours(hour));
                }

                return acc;
            }, []);
        }

        return notFreeHours; //if day was not selected
    }
}