"use strict";

/** @type {import('sequelize-cli').Migration} */
export default {
  async up(queryInterface, Sequelize) {
    await queryInterface.addConstraint("books", {
      fields: ["user_id", "title"],
      type: "unique",
      name: "unique_user_book_title", // constraint name
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeConstraint("books", "unique_user_book_title");
  },
};
