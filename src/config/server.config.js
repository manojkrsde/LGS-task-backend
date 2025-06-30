import dotenv from "dotenv";
dotenv.config();

const config = {
  PORT: process.env.PORT || 3000,
  NODE_ENV: process.env.NODE_ENV || "development",
  APP_NAME: process.env.APP_NAME || "MyApp",

  //database related
  DB_USERNAME: process.env.DB_USERNAME || "manoj",
  DB_PASSWORD: process.env.DB_PASSWORD || "123456",
  DB_NAME: process.env.DB_NAME || "",
  DB_HOSTNAME: process.env.DB_HOSTNAME || "127.0.0.1",
  DB_PORT: process.env.DB_PORT || 5432,
  DB_DIALECT: process.env.DB_DIALECT || "postgres",
};

export default config;
