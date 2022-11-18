const pre = require("../Tools");
const getData = async( res, next, model, type) => {
    try {
        let peticionDB = await model.findAll({
            order:[['name', 'ASC']]
        }).catch(err => next({status: 500, message: 'could not find model values or related models'}));
        let stat;
        if (type === "client"){
            stat = pre.setStat('Clientes', 'clients', peticionDB.length);
        } else {
            stat = pre.setStat('Servicios', 'services', peticionDB.length);
        }
        return res.json({actual:{data:peticionDB}, stat});
    }catch(e){
        return next({status: 500, message: 'Error en router Data get'});
    }
}


module.exports = {
    getData,
};