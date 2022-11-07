const { Router } = require('express');
const client = require('./client.js');
const review = require('./review.js');
const request = require('./request.js');
const about = require('./about.js');
const service = require('./service.js');
const activity = require('./activity.js');
const all = require('./all.js');
const notificasiones = require('./notificasiones.js');

const router = Router();
router.use('/all', all);
router.use('/client', client);
router.use('/about', about);
router.use('/review', review);
router.use('/request', request);
router.use('/service', service);
router.use('/activity', activity);
router.use('/notif', notificasiones);

module.exports = router;
