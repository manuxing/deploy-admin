const validatePost = async(body, next, Service) => {
    console.log(typeof body.contact);
    if(Object.values(body).includes(undefined)||Object.values(body).includes(null))return next({status: 400, message:"missing values"})

    let nameReg = new RegExp("^(?=.{4,50}$)(?=.+[a-zA-Z])[a-zA-Z]+$");
    if(!nameReg.test(body.name.split(' ').join('') ))return next({status: 400, message:"invalid client name"});

    if(typeof body.contact !== "object") return next({status: 400, message:"contact should be an array"});
    if(body.contact.length < 1) return next({status: 400, message:"cannot post without contact"});
    await validatePostAct(body.act, next, Service);

};

const validatePostAct = async(act, next, Service) => {
    if(Object.values(act).includes(undefined)||Object.values(act).includes(null))return next({status: 400, message:"missing values"})
    
    let dateReg = new RegExp("^(19[0-9]{2}|2[0-9]{3})-(0[1-9]|1[012])-([123]0|[012][1-9]|31)$");
    if(!dateReg.test(act.date)) return next({status: 400, message:"invalid date"});

    if(typeof act.persons !== "object") return next({status: 400, message:"persons should be an array"});
    if(act.persons.length < 1) return next({status: 400, message:"cannot post without persons"});

    let service = await Service.findByPk(parseInt(act.sId))
        .catch(err => next({status:400, message:"no se encontro el servicio validando"}));
    if(service === null) return next({status: 400, message:"service dont exist"});
};

module.exports = {
    validatePost,
};



