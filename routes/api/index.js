const router = require('express').Router();
const cpRoutes = require('./checkpoints');

router.use('/checkpoints', cpRoutes);

module.exports = router;