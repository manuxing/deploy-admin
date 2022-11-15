require('dotenv').config();
const { KEY } = process.env;
const { stat } = require('fs');
const { Genre } = require('./db.js');
const axios = require('axios').default;

let pre = {};

pre.setDisplayModels = (p) => {
    let res = p === "About" ? {
                url:`/${p.toLowerCase()}/`,
                src:`../icons/${p}.png`,
                to:p
            } :
            {
                url:`/${p.toLowerCase()}s/`,
                src:`../icons/${p}.png`,
                to:p
            }
    return res;
}

pre.getPagination = (page, size) => {
    const limit = size ? +size : 5;
    const offset = page ? page * limit : 0;
    return { limit, offset };
  };

pre.getPagingData = (values, page, limit) => {
    const { count: total, rows: items } = values;
    const currentPage = page ? +page : 0;
    const totalPages = Math.ceil(total / limit);
    let dataRes = items.length < 1 ? [0] : items
  return { total, data:dataRes, totalPages, currentPage };
};

pre.getDateXDaysAgo =(numOfDays, date = new Date()) =>{
    const daysAgo = new Date(date.getTime());
    daysAgo.setDate(date.getDate() - numOfDays);
    return daysAgo;
}

pre.setStat = (name, url, size) =>{
    console.log("aca", name, url, size)
    let stat = {
        name,
        url,
        vals:[{key:"size", value: size}]
    };
    return stat;
}


module.exports = pre;