const { Router } = require('express');
const { Request, Service } = require('../db.js');
const {getRequests, getRequest, postRequest, putRequest} = require("../controllers/request.js");
const {validatePost, validatePut, validateGet} = require("../cValidations/request.js");
const router = Router();

router.get('/:idR', async(req, res, next) =>{
    const {idR} = req.params;
    await validateGet(idR, Request, next);
    return getRequest(res, next, Request, [Service], idR);
});

router.get('/', async(req, res, next) =>{
    return getRequests(res, next, Request, [Service]);
});

router.post('/', async(req, res, next) => {
    let body = req.body.senr;
    await validatePost(body, next, Service)
        .then(val => {
        if(val.status === 200){
                body.thg = body.contact[0].type;
                body.contact = typeof body.contact === "object" ? body.contact.map(p => `${p.type}: ${p.value}`) : 0
                postRequest(body, res, next, Request, Service);
            } else {
                next(val)
            }
        })
});

router.put('/', async(req, res, next) => {
    const {body} = req;
    await validatePut(body, next, Request);
    return putRequest(body, res, next, Request)
});

module.exports = router;