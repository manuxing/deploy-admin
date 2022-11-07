const { Router } = require('express');
const { Client, Review, Service } = require('../db.js');
const {getReviews, getReview, postReview, putReview, searchReviews, deleteReview} = require("../controllers/review.js");
const {validatePost, validateDelete, validatePut, validateGet} = require("../cValidations/review.js");
const router = Router();

router.get('/search/:search?', async(req, res, next) =>{
    let {query} = req._parsedUrl;
    if(query) return searchReviews(res, next, Review, query );

    return res.json({status:400, message:"busqueda invalida"});
});

router.get('/:id', async(req, res, next) =>{
    const {id} = req.params;
    await validateGet(id, Review, next);
    return getReview(res, next, Review, [Client, Service], id);
});

router.get('/', async(req, res, next) =>{
    return getReviews(res, next, Review, [Service]);
}); 

router.post('/', async(req, res, next) => {
    let body = req.body.senr;
    validatePost(body, next, Service, Client)
        .then(val => {
            if(val.status === 200){
                postReview(body, res, next, Review, Service, Client);
            } else {
                next(val)
            }
        })
});

router.delete('/:id', async(req, res, next) =>{
    let {id} = req.params;
    await validateDelete(id,  next);
    return deleteReview(res, next, Review, id);
});


router.put('/', async(req, res, next) => {
    const {body} = req;
    await validatePut(body, next, Review)
        .then(val =>{
            if(val.status === 200){
                putReview(body, res, next, Review);
            } else {
                next(val);
            }
        })
});

module.exports = router;