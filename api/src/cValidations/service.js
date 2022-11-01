const validatePost = async(body, next) => {
    if(Object.values(body).includes(undefined)||Object.values(body).includes(null))return next({status: 400, message:"missing values"})
    //chekea que ma
};

module.exports = {
    validatePost,
};