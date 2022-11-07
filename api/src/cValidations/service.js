const validatePost = async(body, next, Service) => {
    if(Object.values(body).includes(null))return{status: 400, message:"Hay Campos incompletos, todos los campos son obliigatorios"}
    
    let timeR = new RegExp("([01]?[0-9]|2[0-3]):[0-5][0-9]?");
    let nameR = new RegExp(/[a-zA-Z ]$/);

    if (body.name.length < 5 || nameR.test(body.name) === false)return {status: 400, message:"Nombre invalido, modifiquelo"}
    let service = await Service.findOne({ where:{name:body.name} })
        .catch(err => next({status:400, message:"Error al validar nombre del servicio"}));
    if(service) return {status: 400, message:"Ya existe un Servicio con ese nombre"};

    if (typeof body.description !== "string"|| body.description.length < 15)return {status: 400, message:"Descripcion invalida, modifiquela"}
    if (!timeR.test(body.tR))return {status: 400, message:"Hora de apertura invalida"}
    if (!timeR.test(body.tR_))return {status: 400, message:"Hora de apertur cierre invalida"}

    return {status: 200}
};

const validatePut = async(body) => {
    if(Object.values(body).includes(null))return{status: 400, message:"Hay Campos incompletos, todos los campos son obliigatorios"}
    
    let timeR = new RegExp("([01]?[0-9]|2[0-3]):[0-5][0-9]?");
    let nameR = new RegExp(/[a-zA-Z ]$/);

    if (body.name.length < 5 || nameR.test(body.name) === false)return {status: 400, message:"Nombre invalido, modifiquelo"}

    if (typeof body.description !== "string"|| body.description.length < 15)return {status: 400, message:"Descripcion invalida, modifiquela"}
    if (!timeR.test(body.tR))return {status: 400, message:"Hora de apertura invalida"}
    if (!timeR.test(body.tR_))return {status: 400, message:"Hora de apertur cierre invalida"}

    return {status: 200}
};

const validateGet = async(id, model, next) => {
    if(parseInt(id) !== Number(id))return next({status: 400, message:"ingrese un id valido"})
    let {count} = await model.findAndCountAll();
    if(count < parseInt(id))return next({status: 400, message:"Servicio inexistente"});
};

const validateDelete = async(id, next) => {
    if(parseInt(id) !== Number(id))return next({status: 400, message:"ingrese un id valido"})
    return {status:200}
};


module.exports = {
    validatePost,
    validateGet,
    validatePut,
    validateDelete
};