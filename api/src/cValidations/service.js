const validatePost = async(body, next) => {
    let timeR = new RegExp("([01]?[0-9]|2[0-3]):[0-5][0-9]?");
    let nameR = new RegExp(/[a-zA-Z ]$/);

    if(Object.values(body).includes(undefined)||Object.values(body).includes(null))return next({status: 400, message:"missing values"})
    if (body.name.length < 5 || nameR.test(body.name) === false)return next({status: 400, message:"invalid name"})
    if (typeof body.description !== "string"|| body.description.length < 15)return next({status: 400, message:"invalid description"})
    if (!timeR.test(body.tR))return next({status: 400, message:"invalid time range tR"})
    if (!timeR.test(body.tR_))return next({status: 400, message:"invalid time range tR_"})
};

module.exports = {
    validatePost,
};