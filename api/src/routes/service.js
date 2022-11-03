const { Router } = require('express');
const { Service, Review, Request } = require('../db.js');
const { getService, getServices, postService} = require("../controllers/service.js");
const {validatePost, validateGet} = require("../cValidations/service.js");
const router = Router();

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
    await validatePost(body, next, Service)
        .then(val => {
            val.status === 200 ?
                postService(body, res, next, Service) :
                next(val)
            })
});

module.exports = router;