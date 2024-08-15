const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/database");
class MyUser extends Model {}
MyUser.init(
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
    passwordChangedAt: DataTypes.DATE,
    passwordResetToken: DataTypes.STRING,
    passwordResetExpires: DataTypes.DATE,
  },
  {
    sequelize,
    modelName: "MyUser",
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
MyUser.correctPassword = async (candidatePassword, userPassword) => {
  return await bcrypt.compare(candidatePassword, userPassword);
}
module.exports = MyUser;
