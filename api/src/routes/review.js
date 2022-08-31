const { Router } = require('express');
const { Client, Review } = require('../db.js');
const router = Router();

router.get('/', async(req, res, next) =>{

    const {id} = req.body;

    if(!id){
        try {
            let peticionDB = await Review.findAll({include: Client});
            return res.json(peticionDB);
        }catch(e){
            return next({status: "500", message: 'Error en router Review P'});
        }
    } 

    try {
        let peticionDB = await Review.findByPk(id,{include: Client})
        return res.json(peticionDB);
    }catch(e){
        return next({status: "500", message: 'Error en router Review I'});
    }

});

router.post('/', async(req, res, next) => {
    const { description, thg, contact, cId, sId } = req.body;
    if(!description||!thg||!contact||!cId||!sId){
        return next({status: 400, message: 'Ingrese los datos correctos'})
    }
    try{   
        let hacer = await Review.create(req.body);
        let servicc = await Service.findAll({
            where :{
                id: sId
            }
        })
        await hacer.addService(servicc);
        let x = await Client.findAll({
            where: {
                id: cId
            }
        });
        await hacer.addClient(x);
        console.log("aca")
        res.json(hacer)
    } catch (e){
        return next({status: "500", message: 'Error en router Review post'});
    };
});

router.put('/', async(req, res, next) => {
    const {id, stat} = req.body;
    if(!id||!stat){
        return next({status:400, message:"ingrese los datos correctos"})
    }
    try {
        let up = await Review.update({
            stat: stat,
        }, {
            where: {
                id: id,
            }
        });
        return res.json(up);
    }catch(e){
        return next({status: "500", message: 'Error en router Review put'});
    }
});


module.exports = router;