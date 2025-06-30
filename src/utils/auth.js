import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

import config from "../config/server.config.js";

function checkPassword(plainPassword, encryptedPassword) {
  return bcrypt.compareSync(plainPassword, encryptedPassword);
}

function generateToken(data) {
  return jwt.sign(data, config.JWT_SECRET, { expiresIn: config.JWT_EXPIRY });
}

function verifyToken(token) {
  return jwt.verify(token, config.JWT_SECRET);
}

export { checkPassword, generateToken, verifyToken };
