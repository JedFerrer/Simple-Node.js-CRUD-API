"use strict";

module.exports = function(sequelize, DataTypes) {
  var Model = sequelize.define("Book", {
    title: DataTypes.STRING,
    description: DataTypes.STRING
  });

  return Model;
};
