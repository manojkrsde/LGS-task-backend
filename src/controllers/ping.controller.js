import { StatusCodes } from "http-status-codes";

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
