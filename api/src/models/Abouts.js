const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    sequelize.define('about', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        info:{
            type: DataTypes.TEXT,
            allowNull: false 
        },
        contact: {
            type: DataTypes.ARRAY(DataTypes.TEXT),
        },
        changed: {
            type: DataTypes.BOOLEAN,
            defaultValue: false
        },
    },{
        timestamps: false,
     });
};