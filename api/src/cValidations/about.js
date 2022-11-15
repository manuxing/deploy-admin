const validatePost = async(body, model) => {
    if(Object.values(body).includes(null))return{status: 400, message:"Hay Campos incompletos, todos los campos son obliigatorios"}
    
    let about = await model.findAll()
        .catch(err => {return{status:400, message:"Error al validar About"}});
    if(about.length !== 0) return {status:400, message:"no puede postearse otro about"};

    if (typeof body.info !== "string")return {status: 400, message:"info invalida"}

    if(typeof body.contact !== "object") return {status: 400, message:"los valores ingresados en el campo Contacto son invalidos, modifiquelos"};

    return {status: 200}
};

const validatePut = async(body, model) => {
    if(Object.values(body).includes(null))return{status: 400, message:"Hay Campos incompletos, todos los campos son obliigatorios"}

    
    if(parseInt(body.id) !== Number(body.id))return {status: 400, message:"el id es invalido"};
    let about = await model.findOne({ where:{ id:parseInt(body.id)}})
        .catch(err => {return{status:400, message:"no se encontro About validando"}});
    if(about === null) return {status: 400, message:"El id ingresado es invalido"};

    if (typeof body.info !== "string")return {status: 400, message:"info invalida"}

    if(typeof body.contact !== "object") return {status: 400, message:"los valores ingresados en el campo Contacto son invalidos, modifiquelos"};

    return {status: 200}
};

module.exports = {
    validatePost,
    validatePut
};