require('dotenv').config();
const { Op, Sequelize } = require('sequelize');
const fs = require('fs');
const path = require('path');
const {DB_USER, DB_PASSWORD, DB_HOST} = process.env;

const sequelize = new Sequelize(`postgres://postgres:f3nrir2o,,@localhost:5434/bodega`, {
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
let capsEntries = entries.map((entry) => [entry[0][0].toUpperCase() + entry[0].slice(1), entry[1]]);
sequelize.models = Object.fromEntries(capsEntries);
console.log('coso',sequelize.models)

const { Activity, Client, Request, Review, Service } = sequelize.models;

Review.belongsTo(Client);
Client.hasMany(Review);

//belongsTo
Activity.belongsTo(Client);
Client.hasMany(Activity);

Review.belongsTo(Service);
Service.hasMany(Review);

Request.belongsTo(Service);
Service.hasMany(Request);

Activity.belongsTo(Service);
Service.hasMany(Activity);

module.exports = {
  ...sequelize.models,
  conn: sequelize,     
};
