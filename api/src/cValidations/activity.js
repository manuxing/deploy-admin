const validatePost = async(body, next, Client, Service) => {
    if(Object.values(body).includes(undefined)||Object.values(body).includes(null))return next({status: 400, message:"missing values"})

    if(body.name){
        let client = await Client.findOne({ where: { name: body.name}})
        .catch(err => next({status:400, message:"no se encontro el cliente validando"}));
        if(client === null) return next({status: 400, message:"client dont exist"});
    } else {
        let client = await Client.findOne({ where: { id: body.cId}})
        .catch(err => next({status:400, message:"no se encontro el cliente validando"}));
        if(client === null) return next({status: 400, message:"client dont exist"});
    }

    let dateReg = new RegExp("^(19[0-9]{2}|2[0-9]{3})-(0[1-9]|1[012])-([123]0|[012][1-9]|31)$");
    if(!dateReg.test(body.date)) return next({status: 400, message:"invalid date"});
    
    if(typeof body.persons !== "object") return next({status: 400, message:"persons should be an array"});
    if(body.persons.length < 1) return next({status: 400, message:"cannot post without persons"});

    let service = await Service.findByPk(parseInt(body.sId))
        .catch(err => next({status:400, message:"no se encontro el servicio validando"}));
    if(service === null) return next({status: 400, message:"service dont exist"});
};

const validateGet = async(id, model, next) => {
    if(parseInt(id) !== Number(id))return next({status: 400, message:"ingrese un id valido"})
    let {count} = await model.findAndCountAll();
    if(count < parseInt(id))return next({status: 400, message:"Actividad inexistente"});
};

module.exports = {
    validatePost,
    validateGet
};



