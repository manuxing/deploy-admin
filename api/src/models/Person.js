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
        //     type: DataTypes.TEXT,
        //     allowNull: false
        // },
        ageR:{
            type: DataTypes.TEXT,
            allowNull: false 
        }
        //     type: DataTypes.ENUM(["Niño","Adolescente","Adulto","Adulto Mayor"]),
        //     allowNull: false 
    },{
        timestamps: false,
     });
};