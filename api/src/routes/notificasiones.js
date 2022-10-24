const { Router } = require('express');
const { Request, Review } = require('../db.js');
const router = Router();

router.get('/', async(req, res, next) =>{
    try {
        let peticionRequest = await Request.findAll({
            where:{
                stat: false
            }
        });
        peticionReview = await Review.findAll({
            where:{
                stat: false
            }
        });
        peticionRequest = [...peticionRequest, peticionReview]
        peticionRequest = peticionRequest.map(p => p.dataValues)
        return res.json(peticionRequest);
    }catch(e){
        return next({status: 500, message: 'Error en router Request get p'});
    }
});

module.exports = router;