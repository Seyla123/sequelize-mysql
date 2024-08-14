'use strict';
module.exports = (sequelize, DataTypes) => {
  const Role = sequelize.define('Role', {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,  // Optional: ensure role names are unique
    },
    description: {
      type: DataTypes.STRING,
      allowNull: true,  // Optional: description can be null
    },
  }, {
    // Model options here
    timestamps: true, // Adds createdAt and updatedAt fields
    underscored: true, // Use snake_case for automatically added fields
  });
  
  // Optional: Define associations if needed
  // Role.associate = function(models) {
  //   // Define associations here
  // };
  
  return Role;
};
