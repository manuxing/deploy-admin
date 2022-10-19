const { Router } = require('express');
const { Activity, Service, Client, Person } = require('../db.js');
const router = Router();

router.get('/:id', async(req, res, next) =>{
    let {id} = req.params
    try {
        let peticionDB = await Activity.findAll({
            where:{
                id: id
            },
            include: [Client, Service, Person]
        });
        let r = peticionDB[0].dataValues;
        return res.json(peticionDB[0].dataValues);
    }catch(e){
        return next({status: "500", message: 'Error en router Activity get I'});
    }
});

router.get('/', async(req, res, next) =>{
    try {
        let peticionDB = await Activity.findAll({include: [Client, Service, Person]});
        console.log("aca", peticionDB)
        return res.json(peticionDB);
    }catch(e){
        return next({status: "500", message: 'Error en router Activity get P'});
    }
});

router.post('/', async(req, res, next) => {
    const { date , persons, name, cId, sId } = req.body.senr;
    console.log(req.body.senr)
    if(!date||!persons||!sId){
        return next({status: 400, message: 'Ingrese los datos correctos'})
    }
    try{   
        let hacer = await Activity.create(req.body.senr);
        console.log("wwww ", date);
        let servic = await Service.findAll({
            where :{
                id: sId
            }
        });
        console.log("service: ",servic);
        await hacer.addService(servic);
        console.log("todo ok antes de c");
        let x;
        // let promesas_ = persons.map(p => new Promise(async(resolve) => {let a = await Person.create(p); await hacer.addPerson(a);}));
        // Promise.all(promesas_);
        if(cId){
            x = await Client.findAll({
                where: {
                    id: cId
                }
            });
        } else {
            x = await Client.findAll({
                where: {
                    name: name
                }
            });
        }
        x = x[0]
        console.log(x, hacer)
        console.log("todo ok antes de seteat");
        await hacer.setClient(x);
        await x.addActivity(hacer);
        return res.json(hacer);
    } catch (e){
        return next({status: 500, message: 'Error en router Activity post', e});
    };
});

module.exports = router;