'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class pages extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  pages.init({
    site_id: DataTypes.INTEGER,
    url: DataTypes.STRING,
    title: DataTypes.STRING,
    active: DataTypes.INTEGER,
    deleted: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'pages',
  });
  return pages;
};