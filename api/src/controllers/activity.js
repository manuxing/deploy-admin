const pre = require("../Tools");

const searchActivity = async(req, res, next, model, related) => {
    try {
        const { page, size } = req.query;
        const sValue = req.query.query;
        const { limit, offset } = pre.getPagination(page, size);

        if(sValue.length === 0){
            let respuesta  = await model.findAndCountAll({
                limit,
                offset,
                include: related,
            }).catch(err => next({status: 500, message: 'could not find model values or related models'}));
            let resp = pre.getPagingData(respuesta, page, limit);
            return res.json(resp)
        }
        
        let peticionDB = await model.findAndCountAll({
            limit,
            offset,
            include: related
        }).catch(err => next({status: 500, message: 'could not find model searched'}));
        console.log(peticionDB)

        peticionDB.rows = peticionDB.rows.filter(p=> {
            if(p.dataValues.client && p.dataValues.client.dataValues){
                if(p.dataValues.client.dataValues.name.includes(sValue))return p
            }
        });
        peticionDB.count = peticionDB.rows.length

        const response = pre.getPagingData(peticionDB, page, limit);

        return res.json(response);
    }catch(e){
        return next({status: 500, message: 'Error en router search'});
    }
};

const deleteActivity = async(res, next, model, id) => {
    try {
        let peticionDB = await model.destroy({where:{id: id}})
            .catch(err => next({status: 500, message: 'could not delete model'}));

        return res.json("succesfully deleted");
    }catch(e){
        return next({status: 500, message: 'Error en router Activity delete'});
    }
};

const getActivitys = async(res, req,next, model, related) => {
    try {
        const { page, size } = req.query;
        const { limit, offset } = pre.getPagination(page, size);
        let peticionDB = await model.findAndCountAll({
            limit,
            offset,
            include: related,
        }).catch(err => next({status: 500, message: 'could not find model values or related models'}));
        const response = pre.getPagingData(peticionDB, page, limit);
        let stat = pre.setStat('Actividades', 'activitys', peticionDB.count);
        return res.json({actual:response, stat});
    }catch(e){
        return next({status: 500, message: 'Error en router Activity get Plural'});
    }
};

const getActivity = async( res, next, model, related, id) => {
    try {
        let peticionDB = await model.findOne({
            where:{
                id: id
            },
            include: related
        }).catch(err => next({status: 500, message: 'could not find model values or related models'}));

        return res.json(peticionDB.dataValues);
    }catch(e){
        return next({status: 500, message: 'Error en router Activity get Individual'});
    }
};

const postActivity = async(body, res, next, model, Service, Client) => {
    try{   
        let create = await model.create(body)
            .catch(err => next({status: 500, message: 'could not create Activity model'}));

        let service = await Service.findOne({
            where :{
                id: body.sId
            }
        }).catch(err => next({status: 500, message: 'could not find related services'}));

        let client;

        if(body.cId){
            client = await Client.findOne({
                where: {
                    id: cId
                }
            }).catch(err => next({status: 500, message: 'could not find related client'}));
        } else {
            client = await Client.findOne({
                where: {
                    name: body.name
                }
            }).catch(err => next({status: 500, message: 'could not find related client'}));
        }

        await create.setService(service)
            .catch(err => next({status: 500, message: 'could not find relate activity to service'}));
        await client.addActivity(create)
                .catch(err => next({status: 500, message: 'could not find relate client to activity'}));
        await create.setClient(client)
            .catch(err => next({status: 500, message: 'could not find relate activity to client'}));
        await service.addActivity(create)
                .catch(err => next({status: 500, message: 'could not find relate activity to service'}));

        return res.json(create);
    } catch (e){
        return next({status: 500, message: 'Error en router Activity post', e});
    };
};

module.exports = {
    getActivity,
    getActivitys,
    postActivity,
    searchActivity,
    deleteActivity
};