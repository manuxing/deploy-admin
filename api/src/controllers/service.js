const pre = require("../Tools");

const getServices = async(res, next, model) => {
    try {
        let peticionDB = await model.findAndCountAll()
            .catch(err => next({status: "500", message: 'could not find model values or related models'}));

        let respuesta = pre.setStat('Servicios', 'services', peticionDB.count, peticionDB.rows);

        return res.json(respuesta);
    }catch(e){
        return next({status: "500", message: 'Error en router Service get Plural'});
    }
};

const getService = async( res, next, model, id, related) => {
    try {
        let peticionDB = await model.findOne({ where:{id: id}, include: related})
            .catch(err => next({status: "500", message: 'could not find model values or related models'}));
        return res.json(peticionDB.dataValues);
    }catch(e){
        return next({status: "500", message: 'Error en router Service get Individual'});
    }
};

const postService = async(body, res, next, model) => {
    try{   
        let service = await model.create(body)
            .catch(err => next({status: "500", message: 'could not create model'}));
        return res.json(service);
    } catch (e){
        return next({status: "500", message: 'Error en router service post'});
    };
};

module.exports = {
    getService,
    getServices,
    postService,
};