"use strict";

import bcrypt from "bcrypt";
import config from "../config/server.config.js";

/** @type {import('sequelize-cli').Seeder} */
export default {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert("users", [
      {
        name: "Demo Account",
        email: "demo@gmail.com",
        password: bcrypt.hashSync("123456", +config.SALT_ROUNDS),
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        name: "User Account",
        email: "user@gmail.com",
        password: bcrypt.hashSync("123456", +config.SALT_ROUNDS),
        created_at: new Date(),
        updated_at: new Date(),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("users", {
      email: ["demo@gmail.com", "user@gmail.com"],
    });
  },
};
