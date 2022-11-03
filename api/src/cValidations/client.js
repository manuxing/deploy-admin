const validatePost = async(body, next, Service, Client) => {
    if(Object.values(body).includes(undefined)||Object.values(body).includes(null))return next({status: 400, message:"Hay Campos incompletos, todos los campos son obliigatorios"})

    let nameReg = new RegExp("^(?=.{4,50}$)(?=.+[a-zA-Z])[a-zA-Z]+$");
    if(!nameReg.test(body.name.split(' ').join('') ))return next({status: 400, message:"El nombre de cliente no es Valido, modifiquelo"});

    let client = await Client.findOne({ where:{name:body.name}})
        .catch(err => next({status:400, message:"error validando Nombre del cliente"}));

        console.log(client)
    if(client !== null) return next({status: 400, message:"El nombre de cliente esta en uso"});

    if(typeof body.contact !== "object") return next({status: 400, message:"los valores ingresados en el campo Contacto son invalidos, modifiquelos"});
    if(body.contact.length < 1) return next({status: 400, message:"no se puede postear sin Contacto"});
    await validatePostAct(body.act, next, Service);

};

const validatePostAct = async(act, next, Service) => {
    if(Object.values(act).includes(undefined)||Object.values(act).includes(null))return next({status: 400, message:"Hay Campos incompletos, todos los campos son obliigatorios"})
    
    let dateReg = new RegExp("^(19[0-9]{2}|2[0-9]{3})-(0[1-9]|1[012])-([123]0|[012][1-9]|31)$");
    if(!dateReg.test(act.date)) return next({status: 400, message:"Fecha Invalida"});

    if(typeof act.persons !== "object") return next({status: 400, message:"Los valores ingresados en el campo Persona son invalidos"});
    if(act.persons.length < 1) return next({status: 400, message:"No se puede postear sin personas"});

    let service = await Service.findByPk(parseInt(act.sId))
        .catch(err => next({status:400, message:"no se encontro el servicio validando"}));
    if(service === null) return next({status: 400, message:"El Servicio seleccionado no existe"});
};

const validateGet = async(id, model, next) => {
    if(parseInt(id) !== Number(id))return next({status: 400, message:"ingrese un id valido"})
    let {count} = await model.findAndCountAll();
    if(count < parseInt(id))return next({status: 400, message:"Cliente inexistente"});
};

module.exports = {
    validatePost,
    validateGet
};



