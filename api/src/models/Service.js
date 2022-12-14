const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    sequelize.define('service', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        name: {
            type: DataTypes.TEXT,
            allowNull: false
        },
        description:{
            type: DataTypes.TEXT,
            allowNull: false
        },
        tR:{
            type: DataTypes.TIME,
            allowNull: false 
        },
        tR_:{
            type: DataTypes.TIME,
            allowNull: false 
        },
    },{
        timestamps: false,
     });
};