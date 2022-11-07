const pre = require("../Tools");
const { Op } = require("sequelize");

const searchReviews = async(res, next, model, query) => {
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
                    { 'description': { [Op.like]: '%' + query + '%' } },
                    { 'thg': { [Op.like]: '%' + query + '%' } },
                  ]
              }
        }).catch(err => next({status: 500, message: 'could not find model searched'}));

        let respuesta = peticionDB.length > 0 ? peticionDB : [0]
        return res.json(respuesta);
    }catch(e){
        return next({status: 500, message: 'Error en router search'});
    }
};

const getReviews = async(res, next, model, related) => {
    try {
        let peticionDB = await model.findAndCountAll({include:related})
            .catch(err => next({status: "500", message: 'could not find model values or related models'}));

        let respuesta = pre.setStat('Reseñas', 'reviews', peticionDB.count, peticionDB.rows);

        return res.json(respuesta);
    }catch(e){
        return next({status: 500, message: 'Error en router Review get Plural'});
    }
};

const getReview = async( res, next, model, related, id) => {
    try {
        let peticionDB = await model.findOne({
            where:{
                id: id
            },
            include: related
        }).catch(err => next({status: 500, message: 'could not find model values or related models'}));
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
        }).catch(err => next({status: 500, message: 'could not find Service related review'}));
        
        let client = await Client.findOne({
            where :{
                name: body.cName
            }
        }).catch(err => next({status: 500, message: 'could not find Client related review'}));
        
        await review.setService(service)
            .catch(err => next({status: 500, message: 'could not relate Review to Service'}));
        
        await service.addReview(review)
            .catch(err => next({status: 500, message: 'could not relate Service to Review'}));
            
            console.log("aca")
        await review.setClient(client)
            .catch(err => next({status: 500, message: 'could not relate Review to Client'}));

        await client.addReview(review)
            .catch(err => next({status: 500, message: 'could not relate Client to Review'}));

        res.json(review);
    } catch (e){
        return next({status: 500, message: 'Error en router Review Post'});
    };
};

const deleteReview = async(res, next, model, id) => {
    try {
        let peticionDB = await model.destroy({where:{id: id}})
            .catch(err => next({status: 500, message: 'could not delete model'}));

        return res.json("succesfully deleted");
    }catch(e){
        return next({status: 500, message: 'Error en router Activity delete'});
    }
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

        let respuesta = await model.findOne({where:{id:body.id}})
            .catch(err => next({status: 500, message: 'could not return updated review'}));
        return res.send(respuesta);
    }catch(e){
        return next({status: 500, message: 'Error en router Review put'});
    }
};


module.exports = {
    getReview,
    getReviews,
    postReview,
    putReview,
    searchReviews,
    deleteReview
};