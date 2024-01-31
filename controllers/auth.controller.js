const { passwordService, jwtService } = require('../services');
const { OAuth } = require('../models');

module.exports = {
    login: async (req, res, next) => {
        try {
            const { user, body: { password } } = req;

            await passwordService.compare(user.password, password);

            const tokenPair = jwtService.generateTokenPair();

            await OAuth.create({ ...tokenPair, user: user._id });

            res.json({ ...tokenPair, user });
        } catch (e) {
            next(e);
        }
    },
}