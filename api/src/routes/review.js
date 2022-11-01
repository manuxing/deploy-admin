const { Router } = require('express');
const { Client, Review, Service } = require('../db.js');
const {getReviews, getReview, postReview, putReview} = require("../controllers/review.js");
const {validatePost, validatePut} = require("../cValidations/review.js");
const router = Router();

router.get('/:id', async(req, res, next) =>{
    const {id} = req.params;
    return getReview(res, next, Review, [Client, Service], id);
});

router.get('/', async(req, res, next) =>{
    return getReviews(res, next, Review, [Client, Service]);
}); 

router.post('/', async(req, res, next) => {
    let body = req.body.senr;
    validatePost(body, next, Service, Client)
    return postReview(body, res, next, Review, Service, Client);
});

router.put('/', async(req, res, next) => {
    const {body} = req;
    await validatePut(body, next, Review);
    return putReview(body, res, next, Review);
});

module.exports = router;