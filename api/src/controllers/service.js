const getServices = async(res, next, model) => {
    try {
        let peticionDB = await model.findAll()
            .catch(err => next({status: "500", message: 'could not find model values or related models'}));
        peticionDB.push({name:'Servicios', url:'services',  vals:[{key:"size", value:peticionDB.length}]});
        return res.json(peticionDB);
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
        let service = await model.create(body);
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