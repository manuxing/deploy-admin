const { Router } = require('express');
const { Request, Service } = require('../db.js');
const router = Router();

router.get('/:idR', async(req, res, next) =>{
    const {idR} = req.params
    try {
        let peticionDB = await Request.findAll({
            where:{
                id: idR
            },
            include: Service
        });
        console.log(peticionDB)
        return res.json(peticionDB);
    }catch(e){
        return next({status: "500", message: 'Error en router Request get I'});
    }

});

router.get('/', async(req, res, next) =>{
    try {
        let peticionDB = await Request.findAll();
        return res.json(peticionDB);
    }catch(e){
        return next({status: 500, message: 'Error en router Request get p'});
    }
});


router.post('/', async(req, res, next) => {
    const { dateR, dateP , thg, contact, sId } = req.body.senr;
    if(!dateR||!dateP||!contact||!sId){
        return next({status: "400", message: 'Ingrese los datos correctos'})
    }
    try{   
        let x = req.body.senr;
        x.thg === contact[0].type;
        x.contact = contact.map(p => `${p.type}: ${p.value}`);
        let hacer = await Request.create(x);
        let servicc = await Service.findAll({
            where :{
                id: parseInt(sId)
            }
        })
        await hacer.addService(servicc);
        console.log(hacer);
        res.json(hacer);
    } catch (e){
        return next({status: "500", message: 'Error en router Request Post', e});
    };
});


router.put('/', async(req, res, next) => {
    const {id, stat} = req.body;
    if(!id){
        console.log(req.body)
        return next({status:400, message:"ingrese los datos correctos"})
    }
    try {
        let up = await Request.update({
            stat: stat,
        }, {
            where: {
                id: id,
            }
        });
        return res.json(up);
    }catch(e){
        return next({status: "500", message: 'Error en router Request put'});
    }
});


module.exports = router;