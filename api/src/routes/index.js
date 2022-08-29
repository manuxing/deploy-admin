const { Router } = require('express');
const client = require('./client.js');
const review = require('./review.js');
const request = require('./request.js');
const service = require('./service.js');
const activity = require('./activity.js');

const router = Router();
router.use('/client', client);
router.use('/review', review);
router.use('/request', request);
router.use('/service', service);
router.use('/activity', activity);

module.exports = router;
