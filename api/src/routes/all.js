const { Router } = require('express');
const db = require('../db.js');
const router = Router();
const {setDisplayModels} = require('../Tools.js');

router.get('/', async(req, res, next) =>{

    try {
        let modelss = db.conn.models;

        let models_ = Object.keys(modelss).filter(p =>{
            if(!Array.from(p).includes("_"))return p    
        });

        let respuesta = models_.map(p => setDisplayModels(p));
        
        return res.json({display:respuesta, stats:[]});

    }catch(e){
        return next({status: 500, message: 'Error en router All get', e});
    }
});

module.exports = router;