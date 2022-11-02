const pre = require("../Tools");

const getActivitys = async(res, next, model, related) => {
    try {
        let peticionDB = await model.findAndCountAll({include: related})
            .catch(err => next({status: "500", message: 'could not find model values or related models'}));

        let respuesta = pre.setStat('Actividades', 'activitys', peticionDB.count, peticionDB.rows);

        return res.json(respuesta);
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
            client = await Client.findAll({
                where: {
                    name: body.name
                }
            }).catch(err => next({status: 500, message: 'could not find related client'}));
        }
        client = client[0];

        await create.addService(service)
            .catch(err => next({status: 500, message: 'could not find relate activity to service'}));
        await create.setClient(client)
            .catch(err => next({status: 500, message: 'could not find relate activity to client'}));
        await client.addActivity(create)
            .catch(err => next({status: 500, message: 'could not find relate client to activity'}));
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
};