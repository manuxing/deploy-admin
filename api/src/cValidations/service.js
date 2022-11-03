const validatePost = async(body, next, Service) => {
    let timeR = new RegExp("([01]?[0-9]|2[0-3]):[0-5][0-9]?");
    let nameR = new RegExp(/[a-zA-Z ]$/);

    let service = await Service.findOne({ where:{name:body.name} })
        .catch(err => next({status:400, message:"Error al validar nombre del servicio"}));
    if(service) return next({status: 400, message:"Ya existe un Servicio con ese nombre"});

    if(Object.values(body).includes(undefined)||Object.values(body).includes(null))return next({status: 400, message:"Hay Campos incompletos, todos los campos son obliigatorios"})
    if (body.name.length < 5 || nameR.test(body.name) === false)return next({status: 400, message:"Nombre invalido, modifiquelo"})
    if (typeof body.description !== "string"|| body.description.length < 15)return next({status: 400, message:"Descripcion invalida, modifiquela"})
    if (!timeR.test(body.tR))return next({status: 400, message:"Hora de apertura invalida"})
    if (!timeR.test(body.tR_))return next({status: 400, message:"Hora de apertur cierre invalida"})
};

const validateGet = async(id, model, next) => {
    if(parseInt(id) !== Number(id))return next({status: 400, message:"ingrese un id valido"})
    let {count} = await model.findAndCountAll();
    if(count < parseInt(id))return next({status: 400, message:"Servicio inexistente"});
};

module.exports = {
    validatePost,
    validateGet
};