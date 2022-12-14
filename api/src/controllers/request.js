const pre = require("../Tools");
const { Op } = require("sequelize");

const searchRequest = async(req, res, next, model) => {
    try {

        const { page, size, ord } = req.query;
        const sValue = req.query.query;
        const { limit, offset } = pre.getPagination(page, size);

        if(sValue.length === 0){
            let respuesta  = await model.findAndCountAll({
                limit,
                offset,
                order:[['dateR', ord === "DESC" ? ord : 'ASC']]
            }).catch(err => next({status: 500, message: 'could not find model values or related models'}));
            let resp = pre.getPagingData(respuesta, page, limit);
            resp.search = sValue;
            return res.json(resp);
        }

        let peticionDB = await model.findAndCountAll({
            where: {
                [Op.or]: [
                    { 'thg': { [Op.like]: '%' + sValue + '%' } },
                    { 'solicitante': { [Op.like]: '%' + sValue + '%' } },
                  ]
                },
                limit,
                offset,
                order:[['dateR', ord === "DESC" ? ord : 'ASC']]
        }).catch(err => next({status: 500, message: 'could not find model searched'}));

        const response = pre.getPagingData(peticionDB, page, limit);
        response.search = sValue;
        return res.json(response);
    }catch(e){
        return next({status: 500, message: 'Error en router search'});
    }
};

const getRequests = async(req, res, next, model) => {
    try {
        const { page, size, ord } = req.query;
        const { limit, offset } = pre.getPagination(page, size);
        let peticionDB = await model.findAndCountAll({
            limit,
            offset,
            order:[['dateR', ord === "DESC" ? ord : 'ASC']]
        }).catch(err => next({status: 500, message: 'could not find model values or related models'}));
        const response = pre.getPagingData(peticionDB, page, limit);
        let stat = pre.setStat('Request', 'requests', peticionDB.count);
        return res.json({actual:response, stat});
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
        }).catch(err => next({status: 500, message: 'could not find model values or related models'}));
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