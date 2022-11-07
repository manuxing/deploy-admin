const { Router } = require('express');
const { Client, Review, Activity, Service } = require('../db.js');
const {getClients, deleteClient, getClient, postClient, searchClients} = require("../controllers/client.js");
const {validatePost, validateGet, validateDelete} = require("../cValidations/client.js");
const router = Router();

router.get('/search/:search?', async(req, res, next) =>{
    let {query} = req._parsedUrl;

    if(query)return searchClients(req, res, next, Client, query);

    return res.json({status:400, message:"busqueda invalida"});
});

router.get('/:clientId', async(req, res, next) =>{
    const {clientId} = req.params;
    await validateGet(clientId, Client,next);
    return getClient(res, next, Client, [Activity, Review], clientId);
});

router.get('/', async(req, res, next) =>{
    return getClients(req, res, next, Client);
});


router.delete('/:id', async(req, res, next) =>{
    let {id} = req.params;
    await validateDelete(id, next);
    return deleteClient(res, next, Client, id);
});

router.post('/', async(req, res, next) => {
    let {body} = req;
    body.name = body.name.toLowerCase();
    await validatePost(body, next, Service, Client)
        .then(val =>{
            if(val.status === 200){
                body.contact = typeof body.contact === "object" ? body.contact.map(p => `${p.type}: ${p.value}`) : 0
                body.act.persons =  typeof body.act.persons === "object" ? body.act.persons.map(p => `${p.ageR}, Sexo: ${p.sexo}`) : Array.from(body.act.persons).map(p => `${p.ageR}, Sexo: ${p.sexo}`)
                postClient(body, res, next, Client, Activity, [Activity, Review]);
            } else {
                next(val);
            }
        })
});

module.exports = router;