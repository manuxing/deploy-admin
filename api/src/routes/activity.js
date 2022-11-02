const { Router } = require('express');
const { Activity, Service, Client } = require('../db.js');
const db = require('../db.js');
const {getActivitys, getActivity, postActivity} = require("../controllers/activity.js");
const { validatePost, validateGet } = require("../cValidations/activity.js");
const router = Router();

router.get('/:id', async(req, res, next) =>{
    let {id} = req.params;
    validateGet(id, next);
    return getActivity(res, next, Activity, [Client, Service], id);
});

router.get('/', async(req, res, next) =>{
    console.log("id")
    return getActivitys(res, next, Activity, [Client, Service]);
});

router.post('/', async(req, res, next) => {
    let {name, persons, date, sId, cId} = req.body;
    let copia;
    if(cId === undefined){
        copia = {name, date, sId, persons};
    } else {
        copia = {cId, date, sId, persons};
    }
    await validatePost(copia, next, Client, Service);
    req.body.persons =  typeof req.body.persons === "object" ? req.body.persons.map(p => `${p.ageR}, Sexo: ${p.sexo}`) : 0  
    return postActivity(req.body, res, next, Activity, Service, Client);
});

module.exports = router;