const pre = require("../Tools");
const { Op } = require("sequelize");

const searchRequest = async(res, next, model, query) => {
    try {
        if(query.length === 1){
            let respuesta = await model.findAll();
            return res.json(respuesta)
        }
        query = Array.from(query).slice(1).join("")
        // .toLocaleLowerCase();
        let peticionDB = await model.findAll({
            where: {
                [Op.or]: [
                    { 'thg': { [Op.like]: '%' + query + '%' } },
                    { 'solicitante': { [Op.like]: '%' + query + '%' } },
                  ]
                },
        }).catch(err => next({status: 500, message: 'could not find model searched'}));
        let respuesta = peticionDB.length > 0 ? peticionDB : [0]
        return res.json(respuesta);
    }catch(e){
        return next({status: 500, message: 'Error en router search'});
    }
};

const getRequests = async(res, next, model) => {
    try {
        let peticionDB = await model.findAndCountAll()
            .catch(err => next({status: "500", message: 'could not find model values or related models'}));

        let respuesta = pre.setStat('Solicitudes', 'requests', peticionDB.count, peticionDB.rows);

        return res.json(respuesta);
    }catch(e){
        return next({status: 500, message: 'Error en router Request get Plural'});
    }
};

const getRequest = async( res, next, model, related, id) => {
    try {
        let peticionDB = await model.findOne({
            where:{
                id: id
            },
            include: related
        })
            .catch(err => next({status: 500, message: 'could not find model values or related models'}));
        return res.json(peticionDB.dataValues);
    }catch(e){
        return next({status: 500, message: 'Error en router Request get Individual'});
    }
};

const postRequest = async(body, res, next, model, Service) => {
    try{
        let request = await model.create(body)
            .catch(err => next({status: 500, message: 'could not create Request model'})); 

        let service = await Service.findOne({
            where :{
                id: parseInt(body.sId)
            }
        }).catch(err => next({status: "500", message: 'could not find Service related model'}));

        await request.setService(service)
        .catch(err => next({status: "500", message: 'could not relate Request to Service'}));

        await service.addRequest(request)
            .catch(err => next({status: 500, message: 'could not relate Service to Review'}));

        res.json(request);
    } catch (e){
        return next({status: 500, message: 'Error en router Request Post'});
    };
};

const deleteRequest = async(res, next, model, id) => {
    try {
        let peticionDB = await model.destroy({where:{id: id}})
            .catch(err => next({status: 500, message: 'could not delete model'}));

        return res.json("succesfully deleted");
    }catch(e){
        return next({status: 500, message: 'Error en router Activity delete'});
    }
};

const putRequest = async(body, res, next, model) => {
    try { 
        await model.update({
            stat: body.stat,
        }, {
            where: {
                id: body.id,
            }
        }).catch(err => next({status: 500, message: 'could not update Request'}));

        let respuesta = await model.findOne({where:{id:body.id}})
            .catch(err => next({status: 500, message: 'could not return updated review'}));

        return res.send(respuesta);
    }catch(e){
        return next({status: 500, message: 'Error en router Request put'});
    }
};


module.exports = {
    getRequest,
    getRequests,
    postRequest,
    putRequest,
    searchRequest,
    deleteRequest
};