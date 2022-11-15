const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    sequelize.define('review', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        stat: {
            type: DataTypes.BOOLEAN,
            defaultValue: false
        },
        description:{
            type: DataTypes.TEXT,
            allowNull: false
        },
        thg:{
            type: DataTypes.TEXT,
            allowNull: false 
        },
        dateR:{
            type: DataTypes.DATEONLY,
            allowNull: false 
        },
        dateP:{
            type: DataTypes.DATEONLY,
            allowNull: false 
        },
        // de:{
        //     type: DataTypes.TEXT,
        //     allowNull: true 
        // }
    },{
        timestamps: false,
     });
};