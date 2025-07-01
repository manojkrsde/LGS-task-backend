import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import config from "../config/server.config.js";

/**
 * Compares a plain text password with an encrypted (hashed) password.
 *
 * @param {string} plainPassword - The plain text password input by the user.
 * @param {string} encryptedPassword - The hashed password stored in the database.
 * @returns {boolean} - Returns true if passwords match, otherwise false.
 */
function checkPassword(plainPassword, encryptedPassword) {
  return bcrypt.compareSync(plainPassword, encryptedPassword);
}

/**
 * Generates a JWT token from user data.
 *
 * @param {Object} data - The payload to encode in the token (e.g., user id, email).
 * @returns {string} - The generated JWT token.
 */
function generateToken(data) {
  return jwt.sign(data, config.JWT_SECRET, { expiresIn: config.JWT_EXPIRY });
}

/**
 * Verifies a JWT token and returns the decoded data.
 *
 * @param {string} token - The JWT token to verify.
 * @returns {Object} - The decoded token data if valid.
 * @throws {Error} - Throws error if token is invalid or expired.
 */
function verifyToken(token) {
  return jwt.verify(token, config.JWT_SECRET);
}

export { checkPassword, generateToken, verifyToken };
