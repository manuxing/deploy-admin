const validatePost = async(body, next, Client, Service) => {
    if(Object.values(body).includes(undefined)||Object.values(body).includes(null))return next({status: 400, message:"Hay Campos incompletos, todos los campos son obliigatorios"})

    if(body.name){
        let client = await Client.findOne({ where: { name: body.name}})
            .catch(err => next({status:400, message:"no se encontro el cliente validando"}));
        if(client === null) return next({status: 400, message:"client dont exist"});
    } else {
        let client = await Client.findOne({ where: { id: body.cId}})
            .catch(err => next({status:400, message:"no se encontro el cliente validando"}));
        if(client === null) return next({status: 400, message:"el cliente ingresado no existe, modifiquelo"});
    }

    let dateReg = new RegExp("^(19[0-9]{2}|2[0-9]{3})-(0[1-9]|1[012])-([123]0|[012][1-9]|31)$");
    if(!dateReg.test(body.date)) return next({status: 400, message:"Fecha Invalida, modifiquela"});
    
    if(typeof body.persons !== "object") return next({status: 400, message:"Los valores ingresados en el campo personas son invalidos"});
    if(body.persons.length < 1) return next({status: 400, message:"ingrese valores en el campo personas por favor"});

    let service = await Service.findByPk(parseInt(body.sId))
        .catch(err => next({status:400, message:"no se encontro el servicio validando"}));
    if(service === null) return next({status: 400, message:"el servicio ingresado no existe, modifiquelo"});
};

const validateGet = async(id, model, next) => {
    if(parseInt(id) !== Number(id))return next({status: 400, message:"ingrese un id valido"})
    let {count} = await model.findAndCountAll();
    if(count < parseInt(id))return next({status: 400, message:"La Actividad inexistente"});
};

module.exports = {
    validatePost,
    validateGet
};



