const express = require('express');
const { authRouter, userRouter, visitRouter} = require('./router');

const router = express.Router();

router.use('/auth', authRouter);
router.use('/users', userRouter);
router.use('/visits', visitRouter);
router.get('/ping', (req, res) => res.send('Pong'));

module.exports = router;