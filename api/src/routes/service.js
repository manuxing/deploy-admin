const { Router } = require('express');
const { Service } = require('../db.js');
const router = Router();

router.get('/', async(req, res, next) =>{
    
    const {sName} = req.body;
    
    console.log(req.body)
    if(!sName){
        try {
            let peticionDB = await Service.findAll();
            return res.json(peticionDB);
        }catch(e){
            return next({status: "500", message: 'Error en router service get p'});
        }
    } 

    try {
        let peticionDB = await Service.findAll({
            where:{
                name: sName
            }
        });
        return res.json(peticionDB);
    }catch(e){
        return next({status: "500", message: 'Error en router service get i'});
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