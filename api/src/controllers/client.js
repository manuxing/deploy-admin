const pre = require("../Tools");
const { Op } = require("sequelize");

const searchClients = async(res, next, model, query) => {
    try {
        let peticionDB = await model.findAll({
            where: {
                [Op.or]: [
                    { 'name': { [Op.like]: '%' + query + '%' } },
                  ]
              }
        }).catch(err => next({status: 500, message: 'could not find model searched'}));
        let respuesta = peticionDB.length > 0 ? peticionDB : [0]
        return res.json(respuesta);
    }catch(e){
        return next({status: 500, message: 'Error en router search'});
    }
};

const getClients = async(res, next, model, related) => {
    try {
        let peticionDB = await model.findAndCountAll()
            .catch(err => next({status: "500", message: 'could not find model values or related models'}));
        let respuesta = pre.setStat('Clientes', 'clients', peticionDB.count, peticionDB.rows);

        return res.json(respuesta);
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
        })
        .catch(err => next({status: 500, message: 'could not find model values or related models'}));
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
    searchClients
};