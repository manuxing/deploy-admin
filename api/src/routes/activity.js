const { Router } = require('express');
const { Activity, Service, Client, Person } = require('../db.js');
const router = Router();

router.get('/', async(req, res, next) =>{

    const {id} = req.body;

    if(!id){
        try {
            let peticionDB = await Activity.findAll({include: [Client, Service, Person]});
            return res.json(peticionDB);
        }catch(e){
            return next({status: "500", message: 'Error en router Activity get P'});
        }
    } 

    try {
        let peticionDB = await Activity.findAll({
            where:{
                id: id
            },
            include: [Client, Service, Person]
        });
        return res.json(peticionDB);
    }catch(e){
        return next({status: "500", message: 'Error en router Activity get I'});
    }

});

router.post('/', async(req, res, next) => {
    const { name, date , persons, cId, sId } = req.body;
    console.log(req.body)
    if(!name||!date||!persons||!cId||!sId){
        return next({status: 400, message: 'Ingrese los datos correctos'})
    }
    try{   
        let hacer = await Activity.create(req.body);
        let servic = await Service.findAll({
            where :{
                id: sId
            }
        })
        await hacer.addService(servic);
        let promesas_ = persons.map(p => new Promise(async(resolve) => {let a = await Person.create(p); await hacer.addPerson(a);}));
        Promise.all(promesas_);
        let x = await Client.findAll({
            where: {
                id: cId
            }
        });
        x = x[0]
        console.log(x, hacer)
        await hacer.setClient(x);
        await x.addActivity(hacer);
        return res.json(hacer);
    } catch (e){
        return next({status: 500, message: 'Error en router Activity post'});
    };
});

module.exports = router;