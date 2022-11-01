const pre = require("../Tools");

const getReviews = async(res, next, model, related) => {
    try {

        let peticionDB = await model.findAndCountAll({include:related})
            .catch(err => next({status: "500", message: 'could not find model values or related models'}));

        let respuesta = pre.setStat('Reseñas', 'reviews', peticionDB.count, peticionDB.rows);

        return res.json(respuesta);
    }catch(e){
        return next({status: "500", message: 'Error en router Review get Plural'});
    }
};

const getReview = async( res, next, model, related, id) => {
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
        return next({status: 500, message: 'Error en router Review get Individual'});
    }
};

const postReview = async(body, res, next, model, Service, Client) => {
    try{
        let review = await model.create(body)
            .catch(err => next({status: 500, message: 'could not create Review model'})); 

        let service = await Service.findOne({
            where :{
                id: parseInt(body.sId)
            }
        })
            .catch(err => next({status: 500, message: 'could not find Service related review'}));

        let client = await Client.findOne({
            where :{
                name: body.cName
            }
        }).catch(err => next({status: 500, message: 'could not find Client related review'}));

        await review.addService(service)
            .catch(err => next({status: 500, message: 'could not relate Review to Service'}));

        await service.addReview(review)
            .catch(err => next({status: 500, message: 'could not relate Service to Review'}));

        await review.addClient(client)
            .catch(err => next({status: 500, message: 'could not relate Review to Client'}));

        await client.addReview(review)
            .catch(err => next({status: 500, message: 'could not relate Client to Review'}));

        res.json(review);
    } catch (e){
        return next({status: 500, message: 'Error en router Review Post'});
    };
};

const putReview = async(body, res, next, model) => {
    try { 
        await model.update({
            stat: body.stat,
        }, {
            where: {
                id: body.id,
            }
        }).catch(err => next({status: 500, message: 'could not update Review'}));
        return res.send("Review actualizada");
    }catch(e){
        return next({status: 500, message: 'Error en router Review put'});
    }
};


module.exports = {
    getReview,
    getReviews,
    postReview,
    putReview,
};