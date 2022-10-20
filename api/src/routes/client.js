const { Router } = require('express');
const { Client, Review, Activity } = require('../db.js');
const router = Router();

router.get('/', async(req, res, next) =>{
    let all = await Client.findAll({include: [Activity, Review]});
    try {
        return res.json(all);
    }catch(e){
        return next({status: "500", message: 'Error en router Client get P'});
    }
});

router.get('/:clientId', async(req, res, next) =>{

    const {clientId} = req.params;
    let all = await Client.findAll({include: [Activity, Review]});
    
    try {
        let to = all.find(p => p.dataValues.id === parseInt(clientId)).dataValues;
        let peticionDB = await Client.findByPk(clientId);
        peticionDB.dataValues.activities = to.activities;
        peticionDB.dataValues.reviews = to.reviews;
        return res.json(peticionDB.dataValues);
    }catch(e){
        return next({status: "500", message: 'Error en router Client get I'});
    }

});

router.post('/', async(req, res, next) => {
    const {name, contact, act} = req.body;
    if(!name||!contact||!act){
        return next({status: "400", message: 'Ingrese los datos correctos'})
    }
    try{   
        let {act} = req.body;
        let x = req.body;
        x.contact = contact.map(p => `${p.type}: ${p.value}`);        
        let hacer = await Client.create(req.body);
        act.cId = hacer.id;
        let activi = await Activity.create(act);
        await hacer.addActivity(activi);
        let respuesta = await Client.findAll({where:{
            id:hacer.id
        }});
        return res.json(respuesta);
    } catch (e){
        return next({status: "500", message: 'Error en router Client Post'});
    };
});

module.exports = router;