"use strict";

module.exports = function(sequelize, DataTypes) {
  var Person = sequelize.define("People", {
	id: { type: DataTypes.INTEGER, autoIncrement: true,  primaryKey: true },
    firstName: DataTypes.STRING,
	lastName: DataTypes.STRING,
	sex: DataTypes.ENUM("M", "F")
	
  }, {
    /*classMethods: {
    }*/	
     timestamps: false
  });

  return Person;
};