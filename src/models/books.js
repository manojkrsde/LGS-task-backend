import { Model } from "sequelize";

export default (sequelize, DataTypes) => {
  class Book extends Model {
    static associate(models) {
      Book.belongsTo(models.User, {
        foreignKey: "user_id",
        as: "user",
      });
    }
  }

  Book.init(
    {
      user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      title: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      description: {
        type: DataTypes.TEXT,
      },
    },
    {
      sequelize,
      modelName: "Book",
      tableName: "books",
      underscored: true,
      timestamps: true,
    }
  );

  return Book;
};
