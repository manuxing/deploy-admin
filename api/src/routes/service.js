const { Router } = require('express');
const { Service, Review, Request } = require('../db.js');
const { getService, getServices, postService, searchService, putService} = require("../controllers/service");
const {validatePost, validatePut, validateGet} = require("../cValidations/service.js");
const router = Router();

router.get('/search/:search?', async(req, res, next) =>{
    let {query} = req._parsedUrl;
    if(query) return searchService(res, next, Service, query);

    return res.json({status:400, message:"busqueda invalida"});
});

router.get('/:id', async(req, res, next) =>{
    const {id} = req.params
    await validateGet(id, Service,next);
    return getService(res, next, Service, id, [Review, Request]);
});

router.get('/', async(req, res, next) =>{
    return getServices(res, next, Service);
});

router.post('/', async(req, res, next) => {
    const {body} = req;
    body.name = body.name.toLowerCase();
    await validatePost(body, next, Service)
        .then(val => {
            val.status === 200 ?
                postService(body, res, next, Service) :
                next(val)
            })
});

router.put('/', async(req, res, next) => {
    const {body} = req;
    await validatePut(body, next, Service)
        .then(val => {
            val.status === 200 ?
                putService(body, res, next, Service) :
                next(val)
            })
});

module.exports = router;