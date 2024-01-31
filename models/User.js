const { model, Schema } = require('mongoose');
const _ = require('lodash');

const { enums, constants: { OMIT_FIELD } } = require('../configs');
const passwordService = require('../services/password.service');

const userSchema = new Schema({
    name: { type: String, trim: true, required: true },

    phone: { type: String, trim: true },

    email: { type: String, trim: true, lowercase: true, required: true },

    spec: { type: String, trim: true },

    password: { trim: true, type: String, required: true },

    role: { type: String, default: enums.USER_ROLES.PATIENT, enum: Object.values(enums.USER_ROLES) },

}, {
    timestamps: true,
    toJSON: {
        virtuals: true,
        transform: function (doc, ret) {
            return _.omit(ret, ...OMIT_FIELDS);
        }
    },
    toObject: {
        virtuals: true,
        transform: function (doc, ret) {
            return _.omit(ret, ...OMIT_FIELDS);
        }
    }
});

userSchema.statics = {
    async createWithHashPassword(userObject) {
        const hashPassword = await passwordService.hash(userObject.password);

        return this.create({ ...userObject, password: hashPassword });
    }
};

module.exports = model('User', userSchema);