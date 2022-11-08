const pre = require("../Tools");
const { Op } = require("sequelize");

const searchClients = async(req, res, next, model) => {
    try {

        const { page, size } = req.query;
        const sValue = req.query.query;
        const { limit, offset } = pre.getPagination(page, size);

        if(sValue.length === 0){
            let respuesta  = await model.findAndCountAll({
                limit,
                offset,
            }).catch(err => next({status: 500, message: 'could not find model values or related models'}));
            let resp = pre.getPagingData(respuesta, page, limit);
            return res.json(resp);
        }

        let peticionDB = await model.findAndCountAll({
            where: {
                [Op.or]: [
                    { 'name': { [Op.like]: '%' + sValue + '%' } },
                  ]
              },
            limit,
            offset,
        }).catch(err => next({status: 500, message: 'could not find model searched'}));
        
        const response = pre.getPagingData(peticionDB, page, limit);

        return res.json(response);
    }catch(e){
        return next({status: 500, message: 'Error en router search'});
    }
};

const deleteClient = async(res, next, model, id) => {
    try {
        let peticionDB = await model.destroy({where:{id: id}})
            .catch(err => next({status: 500, message: 'could not delete model'}));

        return res.json("succesfully deleted");
    }catch(e){
        return next({status: 500, message: 'Error en router Activity delete'});
    }
};

const getClients = async(req, res, next, model) => {
    try {
        const { page, size } = req.query;
        const { limit, offset } = pre.getPagination(page, size);
        let peticionDB = await model.findAndCountAll({
            limit,
            offset,
        }).catch(err => next({status: 500, message: 'could not find model values or related models'}));
        const response = pre.getPagingData(peticionDB, page, limit);
        let stat = pre.setStat('Clientes', 'clients', peticionDB.count);
        return res.json({actual:response, stat});
    }catch(e){
        return next({status: 500, message: 'Error en router Client get Plural'});
    }
};

const getClient = async( res, next, model, related, id) => {
    
    try {
        let peticionDB = await model.findOne({
            where:{
                id: id
            },
            include: related
        }).catch(err => next({status: 500, message: 'could not find model values or related models'}));

        let name = peticionDB.dataValues.name.charAt(0).toUpperCase() + peticionDB.dataValues.name.slice(1);
        peticionDB.dataValues.name = name;
        
        return res.json(peticionDB.dataValues);
    }catch(e){
        return next({status: 500, message: 'Error en router Request get Individual'});
    }
};

const postClient = async(body, res, next, model, Activity) => {
    try{   
        let client = await model.create(body)
            .catch(err => next({status: 500, message: 'could not create Client model'}));
        
        let {act} = body;
        act.cId = client.id;

        let activity = await Activity.create(act)
            .catch(err => next({status: 500, message: 'could not create Activity model'}));
            
        await client.addActivity(activity)
            .catch(err => next({status: 500, message: 'could not find relate client to activity'}));

        await activity.setClient(client)
                .catch(err => next({status: 500, message: 'could not find relate activity to client'}));

        return res.json(client);
    } catch (e){
        return next({status: 500, message: 'Error en router Client Post'});
    };
};

module.exports = {
    getClient,
    getClients,
    postClient,
    searchClients,
    deleteClient
};