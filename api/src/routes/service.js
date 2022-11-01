const { Router } = require('express');
const { Service, Review, Request } = require('../db.js');
const { getService, getServices, postService} = require("../controllers/service.js");
const {validatePost} = require("../cValidations/service.js");
const router = Router();

router.get('/:id', async(req, res, next) =>{
    const {id} = req.params
    return getService(res, next, Service, id, [Review, Request]);
});

router.get('/', async(req, res, next) =>{
    return getServices(res, next, Service);
});

router.post('/', async(req, res, next) => {
    const {body} = req;
    validatePost(body, next);
    return postService(body, res, next, Service);
});

module.exports = router;