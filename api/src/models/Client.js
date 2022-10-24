const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  sequelize.define('client', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    contact: {
      type: DataTypes.ARRAY(DataTypes.TEXT),
      allowNull: false,
    },
  },{
    timestamps: false,
  });
};
