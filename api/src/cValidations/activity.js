const validatePost = async(body, next, Client, Service) => {
    if(Object.values(body).includes(null))return {status: 400, message:"Hay Campos incompletos, todos los campos son obliigatorios"}

    if(body.name){
        let nameReg = new RegExp("^(?=.{4,50}$)(?=.+[a-zA-Z])[a-zA-Z]+$");
        if(!nameReg.test(body.name.split(' ').join('') ))return {status: 400, message:"El nombre de cliente no es Valido, modifiquelo"};
        
        let client = await Client.findOne({ where: { name: body.name}})
            .catch(err => next({status:400, message:"no se encontro el cliente validando"}));
        if(client === null) return {status: 400, message:"client dont exist"};
    } else { 
        if(parseInt(body.cId) !== Number(body.cId))return {status: 400, message:"el id del cliente es invalido"};
        let client = await Client.findOne({ where: { id: body.cId}})
            .catch(err => next({status:400, message:"no se encontro el cliente validando"}));
        if(client === null) return {status: 400, message:"el cliente ingresado no existe, modifiquelo"};
    }

    if(parseInt(body.sId) !== Number(body.sId))return {status: 400, message:"el id del servicio es invalido"};
    let service = await Service.findByPk(parseInt(body.sId))
        .catch(err => next({status:400, message:"no se encontro el servicio validando"}));
    if(service === null) return {status: 400, message:"el servicio ingresado no existe, modifiquelo"};

    let dateReg = new RegExp("^(19[0-9]{2}|2[0-9]{3})-(0[1-9]|1[012])-([123]0|[012][1-9]|31)$");
    if(!dateReg.test(body.date)) return {status: 400, message:"Fecha Invalida, modifiquela"};
    
    if(typeof body.persons !== "object") return {status: 400, message:"Los valores ingresados en el campo personas son invalidos"};
    if(body.persons.length < 1) return {status: 400, message:"ingrese valores en el campo personas por favor"};

    return {status: 200}
};

const validateGet = async(id, model, next) => {
    if(parseInt(id) !== Number(id))return next({status: 400, message:"ingrese un id valido"})
    let {count} = await model.findAndCountAll();
    if(count < parseInt(id))return next({status: 400, message:"La Actividad inexistente"});
};

const validateDelete = async(id, next) => {
    if(parseInt(id) !== Number(id))return next({status: 400, message:"ingrese un id valido"})
    return {status:200}
};

module.exports = {
    validatePost,
    validateGet,
    validateDelete
};



