const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    sequelize.define('person', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        sex: {
            type: DataTypes.TEXT,
            allowNull: false 
        },
        ageR:{
            type: DataTypes.TEXT,
            allowNull: false 
        }
    },{
        timestamps: false,
     });
};