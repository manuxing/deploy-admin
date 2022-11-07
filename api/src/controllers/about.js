const pre = require("../Tools");

const getAbout = async(res, next, model) => {
    try {
        let peticionDB = await model.findAll()
            .catch(err => next({status: 500, message: 'could not find model values'}));

        return res.json(peticionDB[0].dataValues);
    }catch(e){
        return next({status: 500, message: 'Error en router About get'});
    }
};

const postAbout = async( res, next, model, body ) => {
    try {
        let about = await model.create(body)
            .catch(err => next({status: 500, message: 'could not create model'}));
        return res.json(about);
    }catch(e){
        return next({status: 500, message: 'Error en router About post'});
    }
};

const putAbout = async(res, next, model, body) => {
    try{   
        let about = await model.update({
            info: body.info,
            contact: body.contact,
            changed: true,
        }, {where: {id:body.id}})
            .catch(err => next({status: 500, message: 'could not update model'}));
        return res.json(body);
    } catch (e){
        return next({status: 500, message: 'Error en router About put'});
    };
};

module.exports = {
    getAbout,
    postAbout,
    putAbout,
};