const { ScheduledVisit } = require('../models');
const { enums } = require('../configs');

module.exports = {
    createSearchQuery: async (query) => {
        const searchQuery = {
            role: { $in: [enums.USER_ROLES.DOCTOR, enums.USER_ROLES.HEAD_DOCTOR] }
        };

        if (query.spec) {
            searchQuery.spec = query.spec;
        }

        if (query.timeSlotToDate) {
            const scheduledVisits = await ScheduledVisit.find({ date: timeSlotToDate }).select('doctor');
            const busyDoctorsIds = scheduledVisits.map(visit => visit.doctor);

            searchQuery._id = { $nin: busyDoctorsIds };
        }

        return searchQuery;
    },


}