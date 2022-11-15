const { Router } = require('express');
const { getAbout, postAbout, putAbout} = require("../controllers/about.js");
const { validatePost, validatePut } = require("../cValidations/about.js");
const {About} = require("../db.js");

const router = Router();

router.get('/', async(req, res, next) =>{
    return getAbout(res, next, About); 
});

router.post('/', async(req, res, next) => {
    let {body} = req;
    await validatePost(body, About)
        .then(val =>{
            if(val.status === 200){
            body.contact = typeof body.contact === "object" ? body.contact.map(p => `${p.type}: ${p.value}`) : 0
            postAbout(res, next, About, body); 
            } else {
                next(val);
            }
        })
});

router.put('/', async(req, res, next) => {
    let {body} = req;
    await validatePut(body, About)
        .then(val =>{
            if(val.status === 200){
                body.contact = typeof body.contact === "object" ? body.contact.map(p => `${p.type}: ${p.value}`) : 0
                putAbout(res, next, About, body); 
            } else {
                next(val);
            }
        })
});

module.exports = router;
