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
        servicios: {
            type: DataTypes.TEXT, 
        set: function(val) {
            return this.setDataValue('servicios', JSON.stringify(val));
        }
        },
        contact:  {type: DataTypes.TEXT, 
        set: function(val) {
            return this.setDataValue('contact', JSON.stringify(val));
        }
        },
        changed: {
            type: DataTypes.BOOLEAN,
            defaultValue: false
        },
    },{
        timestamps: false,
     });
};