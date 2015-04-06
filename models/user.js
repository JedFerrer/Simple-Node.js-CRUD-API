"use strict";

module.exports = function(sequelize, DataTypes) {
  var Model = sequelize.define("User", {
    email: DataTypes.STRING,
    password: DataTypes.STRING
  });

  return Model;
};
