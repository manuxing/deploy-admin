const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    sequelize.define('request', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        stat: {
            type: DataTypes.BOOLEAN,
            defaultValue: false
        },
        dateR:{
            type: DataTypes.DATE,
            allowNull: false 
        },
        dateP:{
            type: DataTypes.DATE,
            allowNull: false 
        },
        thg:{
            type: DataTypes.TEXT,
            allowNull: false 
        },
        contact: {
            type: DataTypes.ARRAY(DataTypes.TEXT),
          },
        ant: {
            type: DataTypes.BOOLEAN,
            defaultValue: false,
        },
    },{
        timestamps: false,
     });
};