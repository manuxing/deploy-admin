const { Router } = require('express');
const { Client, Review, Activity, Service } = require('../db.js');
const {getClients, getClient, postClient} = require("../controllers/client.js");
const {validatePost, validateGet} = require("../cValidations/client.js");
const router = Router();

router.get('/:clientId', async(req, res, next) =>{
    const {clientId} = req.params;
    validateGet(clientId, next);
    return getClient(res, next, Client, [Activity, Review], clientId);
});

router.get('/', async(req, res, next) =>{
    return getClients(res, next, Client, [Activity, Review]);
});

router.post('/', async(req, res, next) => {
    let {body} = req;
    await validatePost(body, next, Service);
    body.contact = typeof body.contact === "object" ? body.contact.map(p => `${p.type}: ${p.value}`) : 0
    body.act.persons =  typeof body.act.persons === "object" ? body.act.persons.map(p => `${p.ageR}, Sexo: ${p.sexo}`) : Array.from(body.act.persons).map(p => `${p.ageR}, Sexo: ${p.sexo}`)
    return postClient(body, res, next, Client, Activity, [Activity, Review]);
});

module.exports = router;