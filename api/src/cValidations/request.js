const validatePost = async(body, next, Service) => {
    if(Object.values(body).includes(undefined)||Object.values(body).includes(null))return next({status: 400, message:"missing values"})

    let dateReg = new RegExp("^(19[0-9]{2}|2[0-9]{3})-(0[1-9]|1[012])-([123]0|[012][1-9]|31)$");
    if(!dateReg.test(body.dateP)) return next({status: 400, message:"invalid dateP"});
    if(!dateReg.test(body.dateR)) return next({status: 400, message:"invalid dateR"});

    let service = await Service.findByPk(parseInt(body.sId))
        .catch(err => next({status:400, message:"no se encontro el servicio validando"}));

    if(service === null) return next({status: 400, message:"service dont exist"});

    if(typeof body.contact !== "object") return next({status: 400, message:"contact should be an array"});
    if(body.contact.length < 1) return next({status: 400, message:"cannot post without contact"});
    if(body.thg !== body.contact[0].type) return next({status: 400, message:"thg shoul be equal to contact"});
};

const validatePut = async(body, next, model) => {
    if(Object.values(body).includes(undefined)||Object.values(body).includes(null))return next({status: 400, message:"missing values"})

    let request = await model.findByPk(parseInt(body.id))
        .catch(err => next({status:400, message:"no se encontro la Request a actualizar"}));
    if(request === null) return next({status: 400, message:"request dont exist"});

    if(typeof body.stat !== "boolean") return next({status: 400, message:"stat should be boolean type"});
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

