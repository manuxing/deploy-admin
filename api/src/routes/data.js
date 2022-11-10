const { Router } = require('express');
const { Client, Service } = require('../db.js');
const {getData} = require("../controllers/data.js");
const router = Router();

router.get('/client', async(req, res, next) =>{
    return getData( res, next, Client, "client");
});

router.get('/service', async(req, res, next) =>{
    return getData( res, next, Service, "");
});

module.exports = router;