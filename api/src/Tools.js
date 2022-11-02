require('dotenv').config();
const { KEY } = process.env;
const { stat } = require('fs');
const { Genre } = require('./db.js');
const axios = require('axios').default;

let pre = {};

pre.setDisplayModels = (p) => {
    let res = {
                url:`/${p.toLowerCase()}s/`,
                src:`../icons/${p}.png`,
                to:p
            }
    return res;
}

pre.getDateXDaysAgo =(numOfDays, date = new Date()) =>{
    const daysAgo = new Date(date.getTime());
    daysAgo.setDate(date.getDate() - numOfDays);
    console.log(daysAgo)
    return daysAgo;
}

pre.setStat = (name, url, size, data) =>{
    let stat = {
        name,
        url,
        vals:[{key:"size", value: size}]
    };
    return {data, stat};
}


module.exports = pre;