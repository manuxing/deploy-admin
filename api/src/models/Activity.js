const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    sequelize.define('activity', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        date:{
            type: DataTypes.DATEONLY,
            allowNull: false 
        },
    },{
        timestamps: false,
     });
};