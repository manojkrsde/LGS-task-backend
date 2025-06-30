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
      createdAt:"created_at",
      updatedAt:"updated_at",
      indexes: [
        {
          unique: true,
          fields: ["user_id", "title"],
          name: "unique_user_book_title",
        },
      ],
    }
  );

  return Book;
};
