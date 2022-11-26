'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class comments extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  comments.init({
    site_id: DataTypes.INTEGER,
    page_id: DataTypes.INTEGER,
    selector: DataTypes.STRING,
    comment: DataTypes.STRING,
    parent_id: DataTypes.INTEGER,
    index: DataTypes.INTEGER,
    title: DataTypes.STRING,
    active: DataTypes.INTEGER,
    deleted: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'comments',
  });
  return comments;
};