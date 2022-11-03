const validatePost = async(body, next, Service, Client) => {
    if(Object.values(body).includes(null))return {status: 400, message:"Hay Campos incompletos, todos los campos son obliigatorios"}

    let medios = [
        "telefono",
        "email",
        "presencial",
        "pagina",
        "booking",
        "otro",
    ];
    let nameReg = new RegExp("^(?=.{4,50}$)(?=.+[a-zA-Z])[a-zA-Z]+$");

    if(parseInt(body.sId) !== Number(body.sId))return {status: 400, message:"el id del servicio es invalido"};
    let service = await Service.findByPk(parseInt(body.sId))
        .catch(err => next({status:400, message:"no se encontro el servicio validando"}));
    if(service === null) return {status: 400, message:"El mServicio seleccionado no existe"};

    if(!nameReg.test(body.cName.split(' ').join('')))return {status: 400, message:"El nombre de cliente no es Valido, modifiquelo"};
    
    let client = await Client.findOne({where:{name:body.cName}})
        .catch(err => next({status:400, message:"no se encontro el cliente validando"}));
    if(client === null) return {status: 400, message:"El Cliente no existe"};
    
    if (typeof body.description !== "string"|| body.description.length < 15)return {status: 400, message:"Descripcion invalida, modifiquela"}

    let dateReg = new RegExp("^(19[0-9]{2}|2[0-9]{3})-(0[1-9]|1[012])-([123]0|[012][1-9]|31)$");
    if(!dateReg.test(body.dateP)) return {status: 400, message:"El valor ingresado en el campo Fecha de la solicitud es invalido"};
    if(!dateReg.test(body.dateR)) return {status: 400, message:"El valor ingresado en el campo Fecha de solicitada es invalido"};

    if(!medios.includes(body.thg)) return {status: 400, message:"medio invalido"};

    return {status: 200}
};

const validatePut = async(body, next, model) => {
    if(Object.values(body).includes(undefined)||Object.values(body).includes(null))return next({status: 400, message:"Hay Campos incompletos, todos los campos son obliigatorios"})
    
    if(parseInt(body.Id) !== Number(body.Id))return {status: 400, message:"el id de la reseña es invalido"};
    let review = await model.findByPk(parseInt(body.id))
        .catch(err => next({status:400, message:"no se encontro la Reseña a actualizar"}));
    if(review === null) return next({status: 400, message:"La Reseña no existe"});

    if(typeof body.stat !== "boolean") return next({status: 400, message:"stat should be boolean type"});
};

const validateGet = async(id, model, next) => {
    if(parseInt(id) !== Number(id))return next({status: 400, message:"ingrese un id valido"})
    let {count} = await model.findAndCountAll();
    if(count < parseInt(id))return next({status: 400, message:"Reseña inexistente"});
};
module.exports = {
    validatePost,
    validatePut,
    validateGet
};
