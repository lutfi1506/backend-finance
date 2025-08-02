import { Response } from "express";

export const responseSuccess = (
  res: Response,
  statusCode: number,
  message: string,
  data: any
) => {
  res.status(statusCode).json({
    status: "success",
    statusCode,
    message,
    data,
  });
};

export const responseError = (
  res: Response,
  statusCode: number,
  message: string,
  errors: any
) => {
  res.status(statusCode).json({
    status: "error",
    statusCode,
    message,
    errors: errors,
  });
};
