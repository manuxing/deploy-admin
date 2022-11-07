const pre = require("../Tools");

const searchActivity = async(res, next, model, query, Client) => {
    //corregir con modelos bien
    try {
        if(query.length === 1){
            let respuesta = await model.findAll();
            return res.json(respuesta)
        }
        query = Array.from(query).slice(1).join("").toLocaleLowerCase();
        let peticionDB = await model.findAll({
              include: [{model:Client}]
        }).catch(err => next({status: 500, message: 'could not find model searched'}));
        let respuesta = peticionDB.filter(p=> {
            if(p.dataValues.client && p.dataValues.client.dataValues){
                if(p.dataValues.client.dataValues.name.includes(query))return p
            }
        })
        respuesta = respuesta.length > 0 ? respuesta : [0]

        return res.json(respuesta);
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

const getActivitys = async(res, next, model, related) => {
    try {
        let peticionDB = await model.findAndCountAll({include: related})
            .catch(err => next({status: 500, message: 'could not find model values or related models'}));

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