const { model, Schema } = require('mongoose');

const { enums, constants: { OMIT_FIELD } } = require('../configs');

const scheduledVisitSchema = new Schema({
    doctor: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },

    patient: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },

    date: { type: Date, required: true }
}, {
    timestamps: true,
    toJSON: {
        virtuals: true
    },
    toObject: {
        virtuals: true
    }
});

scheduledVisitSchema.statics = {
    // async createWithHashPassword(userObject) {
    //     const hashPassword = await passwordService.hash(userObject.password);
    //
    //     return this.create({ ...userObject, password: hashPassword });
    // }
};

module.exports = model('ScheduledVisit', scheduledVisitSchema);