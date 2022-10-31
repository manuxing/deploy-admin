const { Router } = require('express');
const { Activity, Service, Client } = require('../db.js');
const db = require('../db.js');
const {getActivitys, getActivity, postActivity} = require("../controllers/activity.js");
const { validatePost } = require("../cValidations/activity.js");
const router = Router();

router.get('/:id', async(req, res, next) =>{
    //validate cosas de la pagina
    let {id} = req.params;
    return getActivity(res, next, Activity, [Client, Service], id);
});

router.get('/', async(req, res, next) =>{
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
    validatePost(copia, next, Client, Service);
    persons = persons.map(p => `${p.ageR}, Sexo: ${p.sexo}`);   
    return postActivity(req.body, res, next, Activity, Service, Client);
});

module.exports = router;