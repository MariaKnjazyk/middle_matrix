const { User } = require('../models');
const { userService } = require('../services');

module.exports = {
    getUsers: async (req, res, next) => {
        try {
            const searchQuery = await userService.createSearchQuery(req.query);

            const users = await User.find(searchQuery);

            res.json(users);
        } catch (e) {
            next(e);
        }
    },
}