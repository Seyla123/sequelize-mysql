const {DataTypes} = require('sequelize');
const sequelize = require('../config/database');

const User = sequelize.define('User', {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
    validate:{
      notEmpty:{
        msg:"Please provide a name"
      }
    }
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    validate: {
      isEmail: true,
      notEmpty:{
        msg: 'Please provide an email address'
      }
    },
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
    select: false,
    validate: {
      notEmpty: {
        msg: 'Please provide a password'
      },
      len: {
        args: [8],
        msg: 'Password must be at least 8 characters long'
      }
    }
  },
  passwordConfirm: {
    type: DataTypes.VIRTUAL, // This field won't be stored in the database
    allowNull: false,
    validate: {
      notEmpty: {
        msg: 'Please confirm your password'
      },
      isMatch(value){
        if(value!==this.password){
          throw new Error('Passwords do not match')
        }
      }
    },
  },
  
}, {
  timestamps: true,   // Adds `createdAt` and `updatedAt` fields automatically
  underscored: true,  // Use snake_case for the automatically added fields
  defaultScope: {
    attributes: { exclude: ['password', 'passwordConfirm'] }
  },
  scopes: {
    withSensitiveData: { attributes: {} }
  }
});

// remove password and passwordConfirm fields from user object before sending it to the client
User.prototype.toSafeObject = function() {
  const { password, passwordConfirm, ...safeData } = this.get();
  return safeData;
};

module.exports = User;
