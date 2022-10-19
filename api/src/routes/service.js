const { Router } = require('express');
const { Service } = require('../db.js');
const router = Router();

router.get('/:id', async(req, res, next) =>{
    const {id} = req.params
    try {
        let peticionDB = await Service.findAll({
            where:{
                id: id
            },
        });
        return res.json(peticionDB);
    }catch(e){
        return next({status: "500", message: 'Error en router service get i'});
    }
});

router.get('/', async(req, res, next) =>{
        try {
            let peticionDB = await Service.findAll();
            return res.json(peticionDB);
        }catch(e){
            console.log(req.body)
            return next({status: "500", message: 'Error en router service get p'});
        }
});

router.post('/', async(req, res, next) => {
    const { name, description, tR } = req.body;
    if(!name||!description||!tR){
        return next({status: "400", message: 'Ingrese los datos correctos'})
    }
    try{   
        let hacer = await Service.create(req.body);
        return res.json(hacer);
    } catch (e){
        return next({status: "500", message: 'Error en router service post'});
    };
});

module.exports = router;