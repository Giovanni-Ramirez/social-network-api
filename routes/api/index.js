const router = require('express').Router();
const usersRoutes = require('./usersRoutes.js');
const thoughtsRoutes = require('./thoughtsRoutes.js');

router.use('/users', usersRoutes);
router.use('/thoughts', thoughtsRoutes);

module.exports = router;
