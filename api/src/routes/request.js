const { Router } = require('express');
const { Request, Service } = require('../db.js');
const {getRequests, getRequest, postRequest, putRequest} = require("../controllers/request.js");
const {validatePost, validatePut} = require("../cValidations/request.js");
const router = Router();

router.get('/:idR', async(req, res, next) =>{
    const {idR} = req.params
    return getRequest(res, next, Request, [Service], idR);
});

router.get('/', async(req, res, next) =>{
    return getRequests(res, next, Request, [Service]);
});

router.post('/', async(req, res, next) => {
    let body = req.body.senr;
    body.thg = body.contact[0].type;
    await validatePost(body, next, Service);
    body.contact = typeof body.contact === "object" ? body.contact.map(p => `${p.type}: ${p.value}`) : 0
    return postRequest(body, res, next, Request, Service);
});

router.put('/', async(req, res, next) => {
    const {body} = req;
    await validatePut(body, next, Request);
    return putRequest(body, res, next, Request)
});

module.exports = router;