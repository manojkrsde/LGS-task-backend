import config from "./server.config.js";

const baseConfig = {
  username: config.DB_USERNAME,
  password: config.DB_PASSWORD,
  database: config.DB_NAME,
  host: config.DB_HOSTNAME,
  port: config.DB_PORT,
  dialect: config.DB_DIALECT,
  logging: false,
};

if (config.NODE_ENV === "production") {
  baseConfig.dialectOptions = {
    ssl: {
      require: true,
      rejectUnauthorized: false,
    },
  };
}

export default {
  [config.NODE_ENV]: baseConfig,
};
