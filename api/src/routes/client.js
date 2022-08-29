const { Router } = require('express');
const { Client, Review, Activity } = require('../db.js');
const router = Router();

router.get('/', async(req, res, next) =>{

    const {clientId} = req.body;

    if(!clientId){
        try {
            let peticionDB = await Client.findAll({include: [Activity, Review]});
            return res.json(peticionDB);
        }catch(e){
            return next({status: "500", message: 'Error en router Client get P'});
        }
    } 

    try {
        let peticionDB = await Client.findByPk(clientId,{include: [Activity, Review]});
        return res.json(peticionDB);
    }catch(e){
        return next({status: "500", message: 'Error en router Client get I'});
    }

});

router.post('/', async(req, res, next) => {
    const {  name, contact, act } = req.body;
    if(!name||!contact||!act){
        return res.next({status: "400", message: 'Ingrese los datos correctos'})
    }
    try{   
        let {act} = req.body;
        let hacer = await Client.create(req.body);
        act.cId = hacer.id;
        let activi = await Activity.create(act);
        await hacer.addActivity(activi);
        return res.json(hacer);
    } catch (e){
        return next({status: "500", message: 'Error en router Client Post'});
    };
});

module.exports = router;