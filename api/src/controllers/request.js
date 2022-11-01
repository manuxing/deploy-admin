const getRequests = async(res, next, model, related) => {
    try {
        let peticionDB = await model.findAll({include: related})
            .catch(err => next({status: "500", message: 'could not find model values or related models'}));
        peticionDB.push({name:'Solicitudes', url:'requests', vals:[{key:"size",value:peticionDB.length}]});
        return res.json(peticionDB);
    }catch(e){
        return next({status: "500", message: 'Error en router Request get Plural'});
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
            .catch(err => next({status: "500", message: 'could not find model values or related models'}));
        return res.json(peticionDB.dataValues);
    }catch(e){
        return next({status: "500", message: 'Error en router Request get Individual'});
    }
};

const postRequest = async(body, res, next, model, Service) => {
    try{
        let request = await model.create(body)
            .catch(err => next({status: "500", message: 'could not create Request model'})); 

        let service = await Service.findAll({
            where :{
                id: parseInt(body.sId)
            }
        }).catch(err => next({status: "500", message: 'could not find Service related model'}));

        await request.addService(service, {through:'Service_request'})
            .catch(err => next({status: "500", message: 'could not relate Request to Service'}));

        res.json(request);
    } catch (e){
        return next({status: 500, message: 'Error en router Request Post'});
    };
};

const putRequest = async(body, res, next, model) => {
    try { 
        await model.update({
            stat: body.stat,
        }, {
            where: {
                id: body.id,
            }
        }).catch(err => next({status: "500", message: 'could not update Request'}));
        return res.send("request actualizada");
    }catch(e){
        return next({status: "500", message: 'Error en router Request put'});
    }
};


module.exports = {
    getRequest,
    getRequests,
    postRequest,
    putRequest,
};