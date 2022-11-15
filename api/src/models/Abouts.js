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
            type: DataTypes.STRING, 
        set: function(val) {
            return this.setDataValue('servicios', JSON.stringify(val));
        }
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