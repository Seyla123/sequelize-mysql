const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");
const bcrypt = require("bcrypt");
const crypto= require("crypto");
const User = sequelize.define(
  "User",
  {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: "Please provide a name",
        },
      },
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true,
        notEmpty: {
          msg: "Please provide an email address",
        },
      },
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      select: false,
      validate: {
        notEmpty: {
          msg: "Please provide a password",
        },
        len: {
          args: [8],
          msg: "Password must be at least 8 characters long",
        },
      },
    },
    passwordConfirm: {
      type: DataTypes.VIRTUAL, // This field won't be stored in the database
      allowNull: false,
      validate: {
        notEmpty: {
          msg: "Please confirm your password",
        },
        isMatch(value) {
          if (value !== this.password) {
            throw new Error("Passwords do not match");
          }
        },
      },
    },
    role : {
      type: DataTypes.ENUM("user", "admin"),
      defaultValue: "user",
    },
    passwordChangedAt:DataTypes.DATE,
    passwordResetToken:DataTypes.STRING,
    passwordResetExpires: DataTypes.DATE,
  },
  {
    timestamps: true, // Adds `createdAt` and `updatedAt` fields automatically
    underscored: true, // Use snake_case for the automatically added fields
    defaultScope: {
      attributes: { exclude: ["password", "passwordConfirm"] },
    },
    scopes: {
      withSensitiveData: { attributes: {} },
    },
    hooks: {
      beforeSave: async (user, options) => {
        if (user.password) {
          user.password = await bcrypt.hash(user.password, 12);
        }
      },
    },
  }
);

// remove password and passwordConfirm fields from user object before sending it to the client
User.prototype.toSafeObject = function () {
  const { password, passwordConfirm, ...safeData } = this.get();
  return safeData;
};
// check if password is correct
User.prototype.correctPassword = async function (
  candidatePassword,
  userPassword
) {
  return await bcrypt.compare(candidatePassword, userPassword);
};
// check if password was changed after the given timestamp
User.prototype.changedPasswordAfter = function (JWTTimestamp) {
  if (this.passwordChangedAt) {
    const changedTimestamp = parseInt(this.passwordChangedAt.getTime() / 1000, 10 );
    return JWTTimestamp < changedTimestamp;
  }
  return false;
}
// create reset password token
User.prototype.createPasswordResetToken = function(){
    const resetToken = crypto.randomBytes(32).toString('hex');
    this.passwordResetToken = crypto.createHash('sha256').update(resetToken).digest('hex');
    this.passwordResetExpires = Date.now() + 10 * 60 * 1000;
    return resetToken
}

module.exports = User;
