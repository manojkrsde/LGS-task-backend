import { Model } from "sequelize";

import bcrypt from "bcrypt";
import config from "../config/server.config.js";

export default (sequelize, DataTypes) => {
  class User extends Model {
    static associate(models) {
      //one to many relationship
      User.hasMany(models.Book, {
        foreignKey: "user_id",
        as: "books",
      });
    }
  }

  User.init(
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
          isEmail: true,
        },
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          len: [6, 50],
        },
      },
    },
    {
      sequelize,
      modelName: "User",
      tableName: "users",
      underscored: true,
      timestamps: true,
    }
  );

  //Hooks to encrypt password
  User.beforeCreate(function encrypt(user) {
    const encryptedPassword = bcrypt.hashSync(
      user.password,
      +config.SALT_ROUNDS
    ); //type casting through +
    user.password = encryptedPassword;
  });

  return User;
};
