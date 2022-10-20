const { Router } = require('express');
const { Client, Review, Service } = require('../db.js');
const router = Router();

router.get('/:id', async(req, res, next) =>{
    const {id} = req.params;
    try {
        let peticionDB = await Review.findAll({
            where:{
                id: id
            },
            include: [Client, Service]
        });
        return res.json(peticionDB);
    }catch(e){
        return next({status: "500", message: 'Error en router Review I'});
    }
});

router.get('/', async(req, res, next) =>{
        try {
            let peticionDB = await Review.findAll({include: [Client, Service]});
            return res.json(peticionDB);
        }catch(e){
            return next({status: "500", message: 'Error en router Review P'});
        }
}); 

router.post('/', async(req, res, next) => {
    const { description, thg, cName, sId } = req.body.senr;
    console.log(req.body.senr)
    if(!description||!thg||!cName||!sId){
        return next({status: 400, message: 'Ingrese los datos correctos'})
    }
    try{   
        let hacer = await Review.create(req.body.senr);
        let servicc = await Service.findAll({
            where :{
                id: sId
            }
        })
        await hacer.addService(servicc);
        let x = await Client.findAll({
            where: {
                name: cName
            }
        });
        await hacer.addClient(x);
        res.json(hacer)
    } catch (e){
        return next({status: "500", message: 'Error en router Review post'});
    };
});

router.put('/', async(req, res, next) => {
    const {id, stat} = req.body;
    if(!id){
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

router.delete('/:id', async(req, res, next) =>{
    const {id} = req.params;
    try {
        let peticionDB = await Review.destroy({
            where:{
                id: id
            },
        });
        return res.json(peticionDB);
    }catch(e){
        return next({status: "500", message: 'Error en router Review I'});
    }
});


module.exports = router;