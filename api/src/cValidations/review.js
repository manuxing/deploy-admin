const validatePost = async(body, next, Service, Client) => {
    let medios = [
        "telefono",
        "email",
        "presencial",
        "pagina",
        "booking",
        "otro",
    ];
    if(Object.values(body).includes(undefined)||Object.values(body).includes(null))return next({status: 400, message:"missing values"})

    let dateReg = new RegExp("^(19[0-9]{2}|2[0-9]{3})-(0[1-9]|1[012])-([123]0|[012][1-9]|31)$");
    if(!dateReg.test(body.dateP)) return next({status: 400, message:"invalid dateP"});
    if(!dateReg.test(body.dateR)) return next({status: 400, message:"invalid dateR"});

    let service = await Service.findByPk(parseInt(body.sId))
        .catch(err => next({status:400, message:"no se encontro el servicio validando"}));

    if(service === null) return next({status: 400, message:"service dont exist"});

    let client = await Client.findOne({where:{name:body.cName}})
        .catch(err => next({status:400, message:"no se encontro el cliente validando"}));

    if(client === null) return next({status: 400, message:"client dont exist"});

    if(!medios.includes(body.thg)) return next({status: 400, message:"medio invalido"});
};

const validatePut = async(body, next, model) => {
    if(Object.values(body).includes(undefined)||Object.values(body).includes(null))return next({status: 400, message:"missing values"})

    let request = await model.findByPk(parseInt(body.id))
        .catch(err => next({status:400, message:"no se encontro la Request a actualizar"}));
    if(request === null) return next({status: 400, message:"request dont exist"});

    if(typeof body.stat !== "boolean") return next({status: 400, message:"stat should be boolean type"});
};

module.exports = {
    validatePost,
    validatePut,
};
