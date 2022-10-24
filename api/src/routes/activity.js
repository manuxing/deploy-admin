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
            include: [Client, Service]
        });
        let r = peticionDB[0].dataValues;
        return res.json(peticionDB[0].dataValues);
    }catch(e){
        return next({status: "500", message: 'Error en router Activity get I'});
    }
});

router.get('/', async(req, res, next) =>{
    try {
        let peticionDB = await Activity.findAll({include: [Client, Service]});
        console.log("aca", peticionDB)
        return res.json(peticionDB);
    }catch(e){
        return next({status: "500", message: 'Error en router Activity get P'});
    }
});

router.post('/', async(req, res, next) => {
    const { date, persons, name, cId, sId } = req.body;
    console.log(req.body)
    if(!date||!persons||!sId){
        return next({status: 400, message: 'Ingrese los datos correctos'})
    }
    try{   
        let y = req.body;
        y.persons = persons.map(p => `${p.ageR}, Sexo: ${p.sexo}`);        
        let hacer = await Activity.create(y);
        console.log("secreo activity");
        let servic = await Service.findAll({
            where :{
                id: sId
            }
        });
        await hacer.addService(servic);
        console.log("service");
        let x;
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
        await hacer.setClient(x);
        console.log("se agrego client",x, hacer)
        await x.addActivity(hacer);
        return res.json(hacer);
    } catch (e){
        return next({status: 500, message: 'Error en router Activity post', e});
    };
});

module.exports = router;