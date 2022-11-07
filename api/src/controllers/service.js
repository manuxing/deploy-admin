const pre = require("../Tools");
const { Op } = require("sequelize");

const searchService = async(res, next, model, query ) => {
    try {
        if(query.length === 1){
            let respuesta = await model.findAll();
            return res.json(respuesta)
        }
        query = Array.from(query).slice(1).join("").toLocaleLowerCase();
        let peticionDB = await model.findAll({
            where: {
                [Op.or]: [
                    { 'name': { [Op.like]: '%' + query + '%' } },
                    { 'description': { [Op.like]: '%' + query + '%' } },
                  ]
                },
        }).catch(err => next({status: 500, message: 'could not find model searched'}));

        let respuesta = peticionDB.length > 0 ? peticionDB : [0]
        return res.json(respuesta);
    }catch(e){
        return next({status: 500, message: 'Error en router search'});
    }
};

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
            
        let name = peticionDB.dataValues.name.charAt(0).toUpperCase() +  peticionDB.dataValues.name.slice(1);
        peticionDB.dataValues.name = name;

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

const deleteService = async(res, next, model, id) => {
    try {
        let peticionDB = await model.destroy({where:{id: id}})
            .catch(err => next({status: 500, message: 'could not delete model'}));

        return res.json("succesfully deleted");
    }catch(e){
        return next({status: 500, message: 'Error en router Activity delete'});
    }
};

const putService = async(body, res, next, model) => {
    try { 
        await model.update({
            name: body.name,
            description: body.description,
            tR: body.tR,
            tR_: body.tR_,
        }, {
            where: {
                id: body.id,
            }
        }).catch(err => next({status: 500, message: 'could not update Service'}));

        let respuesta = await model.findOne({where:{id:body.id}})
            .catch(err => next({status: 500, message: 'could not return updated servicio'}));

        return res.send(respuesta);
    }catch(e){
        return next({status: 500, message: 'Error en router Review put'});
    }
};

module.exports = {
    getService,
    getServices,
    postService,
    searchService,
    putService,
    deleteService
};