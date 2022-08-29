require('dotenv').config();
const { Op, Sequelize } = require('sequelize');
const fs = require('fs');
const path = require('path');
const {DB_USER, DB_PASSWORD, DB_HOST} = process.env;

const sequelize = new Sequelize(`postgres://postgres:f3nrir2o,,@localhost:5432/bodega`, {
  logging: false, 
  native: false, 
});
const basename = path.basename(__filename);

const modelDefiners = [];

fs.readdirSync(path.join(__dirname, '/models'))
  .filter((file) => (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js'))
  .forEach((file) => {
    modelDefiners.push(require(path.join(__dirname, '/models', file)));
  });
  
  modelDefiners.forEach(model => model(sequelize));
  let entries = Object.entries(sequelize.models);
  console.log(entries)
let capsEntries = entries.map((entry) => [entry[0][0].toUpperCase() + entry[0].slice(1), entry[1]]);
sequelize.models = Object.fromEntries(capsEntries);
console.log('coso',sequelize.models)

const { Activity, Client, Person, Request, Review, Service } = sequelize.models;

Client.belongsToMany(Review, {through:'client_review'});
Review.belongsToMany(Client, {through:'client_review'});

Activity.hasOne(Client);
Client.hasMany(Activity);

Review.belongsToMany(Service, {through:'service_review'});
Service.belongsToMany(Review, {through:'service_review'});

Service.belongsToMany(Request, {through:'Service_request'});
Request.belongsToMany(Service, {through:'Service_request'});

Service.belongsToMany(Activity, {through:'service_activity'});
Activity.belongsToMany(Service, {through:'service_activity'});

Person.hasOne(Activity);
Activity.hasMany(Person);

module.exports = {
  ...sequelize.models,
  conn: sequelize,     
};
