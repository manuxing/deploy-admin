const { Router } = require('express');
const { Request, Service } = require('../db.js');
const router = Router();

router.get('/', async(req, res, next) =>{

    const {idR} = req.body;

    if(!idR){
        try {
            let peticionDB = await Request.findAll();
            return res.json(peticionDB);
        }catch(e){
            return next({status: 500, message: 'Error en router Request get p'});
        }
    } 

    try {
        let peticionDB = await Request.findByPk(idR,{ include: Service });
        return res.json(peticionDB);
    }catch(e){
        return next({status: "500", message: 'Error en router Request get I'});
    }

});

router.post('/', async(req, res, next) => {
    const { dateR, dateP , thg, contact, sId } = req.body;
    if(!dateR||!dateP||!thg||!contact||!sId){
        return res.next({status: "400", message: 'Ingrese los datos correctos'})
    }
    try{   
        let hacer = await Request.create(req.body);
        let servicc = await Service.findAll({
            where :{
                id: sId
            }
        })
        //hacer un map para todos los servicios
        await hacer.addService(servicc);
        res.json(hacer);
    } catch (e){
        return next({status: "500", message: 'Error en router Request Post'});
    };
});


router.put('/', async(req, res, next) => {
    const {id, stat} = req.body;
    if(!id||!stat){
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