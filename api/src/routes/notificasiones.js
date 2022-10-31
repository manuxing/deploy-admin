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
        peticionReview = peticionReview.map(p => p.dataValues);
        peticionRequest = peticionRequest.map(p => p.dataValues)
        peticionRequest = peticionRequest.concat(peticionReview);
        return res.json(peticionRequest);
    }catch(e){
        return next({status: 500, message: 'Error en router Request get p'});
    }
});

module.exports = router;