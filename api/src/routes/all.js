const { Router } = require('express');
const { stat } = require('fs');
const db = require('../db.js');
const {Activity, Client, Request, Review, Service } = require('../db.js');
const router = Router();
const {setDisplayModels} = require('../Tools.js');

router.get('/', async(req, res, next) =>{

    try {
        let modelss = db.conn.models;
        
        let models_ = Object.keys(modelss).filter(p =>{
            if(!Array.from(p).includes("_"))return p    
        });

        let respuesta = models_.map(p => setDisplayModels(p));

        // let cant = models_.map((p)=>{
        //     return new Promise(async(resolve)=>{
        //         let res = await db[p].findAll().length;
        //         console.log(res)
        //         return res
        //     })
        //     // function getDateXDaysAgo(numOfDays, date = new Date()) {
        //     //   const daysAgo = new Date(date.getTime());
        //     //   daysAgo.setDate(date.getDate() - numOfDays);
        //     //   return daysAgo;
        //     // }
        //     //let haceX = getDateXDaysAgo(15, Date.now)
        //     // last15Days = all.filter(p=> p.createdAt > haceX && p.createdAt < Date.now).length;
        // });
        
        // let i = await Promise.all(cant);
        // console.log(i)

        return res.json({display:respuesta});

    }catch(e){
        return next({status: 500, message: 'Error en router All get', e});
    }
});

module.exports = router;
