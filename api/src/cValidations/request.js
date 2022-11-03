const validatePost = async(body, next, Service) => {
    if(Object.values(body).includes(null))return {status: 400, message:"Hay Campos incompletos, todos los campos son obliigatorios"}

    if(parseInt(body.sId) !== Number(body.sId))return {status: 400, message:"el id del servicio es invalido"};
    let service = await Service.findOne({ where:{ id:parseInt(body.sId)}})
        .catch(err => {return{status:400, message:"no se encontro el servicio validando"}});
    if(service === null) return {status: 400, message:"El Servicio solicitado no existe"};
        
    let dateReg = new RegExp("^(19[0-9]{2}|2[0-9]{3})-(0[1-9]|1[012])-([123]0|[012][1-9]|31)$");
    if(!dateReg.test(body.dateP)) return {status: 400, message:"El valor ingresado en el campo Fecha de la solicitud es invalido"};
    if(!dateReg.test(body.dateR)) return {status: 400, message:"El valor ingresado en el campo Fecha de solicitada es invalido"};
        
    if(typeof body.contact !== "object") return {status: 400, message:"Los valores del campo contacto son invalidos, modifiquelos"};
    if(body.contact.length < 1) return {status: 400, message:"no se puede postear sin contacto"};
    // if(body.thg !== body.contact[0].type) return {status: 400, message:"el medio no coincide con el contacto"};
        
    return {status: 200}
};

const validatePut = async(body, next, model) => {
    if(Object.values(body).includes(null))return next({status: 400, message:"Hay Campos incompletos, todos los campos son obliigatorios"})

    if(parseInt(body.Id) !== Number(body.Id))return {status: 400, message:"el id de la reseña es invalido"};

    let request = await model.findByPk(parseInt(body.id))
        .catch(err => next({status:400, message:"no se encontro la Request a actualizar"}));
    if(request === null) return next({status: 400, message:"La Solicitud no existe"});

    if(typeof body.stat !== "boolean") return next({status: 400, message:"stat deberia ser un booleano"});
};

const validateGet = async(id, model, next) => {
    if(parseInt(id) !== Number(id))return next({status: 400, message:"ingrese un id valido"})
    let {count} = await model.findAndCountAll();
    if(count < parseInt(id))return next({status: 400, message:"Solicitud inexistente"});
};

module.exports = {
    validatePost,
    validatePut,
    validateGet
};

