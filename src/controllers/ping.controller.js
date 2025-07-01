import { StatusCodes } from "http-status-codes";

/**
 * Returns a simple health check response.
 * 
 * @param {string} message - The message to return in the response.
 * @returns {Function} - An Express route handler that sends a 200 OK response.
 *
 * Example usage in route:
 * router.get('/ping', pingCheck("Server is running"));
 */
function pingCheck(message) {
  return (_, res) => {
    return res.status(StatusCodes.OK).json({
      success: true,
      message: message,
      error: [],
      data: [],
    });
  };
}

export default pingCheck;
