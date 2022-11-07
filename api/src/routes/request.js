const { Router } = require('express');
const { Request, Service } = require('../db.js');
const {getRequests, deleteRequest, getRequest, postRequest, putRequest, searchRequest} = require("../controllers/request.js");
const {validatePost, validateDelete, validatePut, validateGet} = require("../cValidations/request.js");
const router = Router();

router.get('/search/:search?', async(req, res, next) =>{
    let {query} = req._parsedUrl;
    if(query) return searchRequest(res, next, Request, query );

    return res.json({status:400, message:"busqueda invalida"});
});

router.get('/:idR', async(req, res, next) =>{
    const {idR} = req.params;
    await validateGet(idR, Request, next);
    return getRequest(res, next, Request, [Service], idR);
});

router.get('/', async(req, res, next) =>{
    return getRequests(res, next, Request);
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

router.delete('/:id', async(req, res, next) =>{
    let {id} = req.params;
    await validateDelete(id,  next);
    return deleteRequest(res, next, Request, id);
});

router.put('/', async(req, res, next) => {
    const {body} = req;
    await validatePut(body, next, Request)
        .then(val =>{
            if(val.status === 200){
                console.log("bien")
                putRequest(body, res, next, Request);
            } else {
                console.log("mal")
                next(val);
            }
        })
});

module.exports = router;