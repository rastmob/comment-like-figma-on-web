'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class sites extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  sites.init({
    domain: DataTypes.STRING,
    title: DataTypes.STRING,
    active: DataTypes.INTEGER,
    deleted: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'sites',
  });
  return sites;
};